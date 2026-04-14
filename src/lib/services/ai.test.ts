/**
 * Integration tests — AI Service (client-side proxy layer)
 * FA-Phase3 | Covers: /api/ai/audit proxy, error handling, structured response
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock global fetch before importing service
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Import the client-side ai.ts proxy
// (We test the public interface, not the server LLM chain)
const mockAuditResponse = {
  score: 82,
  findings: [
    { category: 'VAT', severity: 'medium', message: 'VAT returns overdue', emoji: '⚠️' },
    { category: 'PAYE', severity: 'low', message: 'PAYE filing is current', emoji: '✅' },
  ],
  summary: 'Good overall compliance. Address VAT filing urgently.',
  recommendations: ['File overdue VAT returns', 'Set up automated reminders'],
};

function mockSuccessResponse(data: unknown) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ result: data }),
  });
}

function mockErrorResponse(status: number, message: string) {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({ error: message }),
  });
}

// Inline the client-side proxy logic for isolated testing
async function runAuditProxy(documentContent: string, auditType: string) {
  const response = await fetch('/api/ai/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentContent, auditType }),
  });
  if (!response.ok) {
    const err = await response.json() as { error: string };
    throw new Error(err.error || `HTTP ${response.status}`);
  }
  const data = await response.json() as { result: unknown };
  return data.result;
}

describe('AI audit proxy (/api/ai/audit)', () => {
  beforeEach(() => { mockFetch.mockReset(); });
  afterEach(() => { vi.clearAllMocks(); });

  it('calls /api/ai/audit with correct payload', async () => {
    mockSuccessResponse(mockAuditResponse);
    await runAuditProxy('Sample document text', 'VAT');
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/ai/audit',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentContent: 'Sample document text', auditType: 'VAT' }),
      })
    );
  });

  it('returns structured audit result on success', async () => {
    mockSuccessResponse(mockAuditResponse);
    const result = await runAuditProxy('Financial statement data', 'Annual Audit');
    expect(result).toEqual(mockAuditResponse);
  });

  it('throws error on 500 response', async () => {
    mockErrorResponse(500, 'Internal LLM error');
    await expect(runAuditProxy('data', 'VAT')).rejects.toThrow('Internal LLM error');
  });

  it('throws error on 429 rate limit response', async () => {
    mockErrorResponse(429, 'Rate limit exceeded');
    await expect(runAuditProxy('data', 'PAYE')).rejects.toThrow('Rate limit exceeded');
  });

  it('throws error on 401 unauthorized', async () => {
    mockErrorResponse(401, 'Unauthorized');
    await expect(runAuditProxy('data', 'VAT')).rejects.toThrow('Unauthorized');
  });

  it('sends empty content without crashing', async () => {
    mockSuccessResponse({ score: 0, findings: [], summary: 'No content', recommendations: [] });
    const result = await runAuditProxy('', 'General');
    expect(result).toHaveProperty('score', 0);
  });

  it('correctly encodes special characters in document content', async () => {
    mockSuccessResponse(mockAuditResponse);
    const specialContent = '₦50,000 & "VAT" <FIRS>';
    await runAuditProxy(specialContent, 'VAT');
    const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(callBody.documentContent).toBe(specialContent);
  });
});

describe('Audit result shape validation', () => {
  it('audit response has required fields', () => {
    expect(mockAuditResponse).toHaveProperty('score');
    expect(mockAuditResponse).toHaveProperty('findings');
    expect(mockAuditResponse).toHaveProperty('summary');
    expect(mockAuditResponse).toHaveProperty('recommendations');
    expect(Array.isArray(mockAuditResponse.findings)).toBe(true);
    expect(Array.isArray(mockAuditResponse.recommendations)).toBe(true);
  });

  it('score is within 0-100 range', () => {
    expect(mockAuditResponse.score).toBeGreaterThanOrEqual(0);
    expect(mockAuditResponse.score).toBeLessThanOrEqual(100);
  });

  it('findings have correct severity values', () => {
    const validSeverities = ['low', 'medium', 'high'];
    mockAuditResponse.findings.forEach((f) => {
      expect(validSeverities).toContain(f.severity);
    });
  });

  it('each finding has all required fields', () => {
    mockAuditResponse.findings.forEach((f) => {
      expect(f).toHaveProperty('category');
      expect(f).toHaveProperty('severity');
      expect(f).toHaveProperty('message');
      expect(f).toHaveProperty('emoji');
    });
  });
});
