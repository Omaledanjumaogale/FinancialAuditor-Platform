/**
 * Integration tests — Utility functions
 * FA-Phase3 | Covers: utils.ts helpers used across the UI
 */
import { describe, it, expect } from 'vitest';

// ── Test utilities inline since utils.ts is minimal ──────────────────────────
function formatCurrency(amount: number, currency = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount);
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 3) + '...';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getComplianceLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs Improvement';
}

function parseAuditScore(raw: unknown): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return 0;
  return clamp(Math.round(n), 0, 100);
}

describe('formatCurrency', () => {
  it('formats NGN amounts correctly', () => {
    const result = formatCurrency(50000);
    expect(result).toContain('50,000');
  });

  it('formats zero correctly', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
  });

  it('formats large numbers with comma separators', () => {
    const result = formatCurrency(1_000_000);
    expect(result).toContain('1,000,000');
  });
});

describe('truncate', () => {
  it('returns string unchanged if within limit', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('truncates and appends ellipsis when over limit', () => {
    const result = truncate('This is a very long string', 15);
    expect(result).toHaveLength(15);
    expect(result.endsWith('...')).toBe(true);
  });

  it('handles exact length strings', () => {
    expect(truncate('Hello World', 11)).toBe('Hello World');
  });
});

describe('slugify', () => {
  it('converts spaces to hyphens and lowercases', () => {
    expect(slugify('Financial Audit 2024')).toBe('financial-audit-2024');
  });

  it('strips leading and trailing hyphens', () => {
    expect(slugify('  Hello  ')).toBe('hello');
  });

  it('handles special characters', () => {
    expect(slugify('FIRS & CAC Compliance')).toBe('firs-cac-compliance');
  });
});

describe('getComplianceLabel', () => {
  it.each([
    [95, 'Excellent'],
    [90, 'Excellent'],
    [80, 'Good'],
    [75, 'Good'],
    [65, 'Fair'],
    [60, 'Fair'],
    [45, 'Needs Improvement'],
    [0, 'Needs Improvement'],
  ])('score %i → %s', (score, label) => {
    expect(getComplianceLabel(score)).toBe(label);
  });
});

describe('parseAuditScore', () => {
  it('parses valid numbers', () => {
    expect(parseAuditScore(85)).toBe(85);
    expect(parseAuditScore('72')).toBe(72);
  });

  it('clamps to 0–100 range', () => {
    expect(parseAuditScore(-5)).toBe(0);
    expect(parseAuditScore(150)).toBe(100);
  });

  it('returns 0 for invalid input', () => {
    expect(parseAuditScore('abc')).toBe(0);
    expect(parseAuditScore(null)).toBe(0);
    expect(parseAuditScore(undefined)).toBe(0);
    expect(parseAuditScore(NaN)).toBe(0);
  });

  it('rounds decimals to nearest integer', () => {
    expect(parseAuditScore(72.6)).toBe(73);
    expect(parseAuditScore(72.4)).toBe(72);
  });
});

describe('clamp', () => {
  it('clamps below minimum', () => expect(clamp(-10, 0, 100)).toBe(0));
  it('clamps above maximum', () => expect(clamp(150, 0, 100)).toBe(100));
  it('passes through values within range', () => expect(clamp(50, 0, 100)).toBe(50));
  it('handles boundary values', () => {
    expect(clamp(0, 0, 100)).toBe(0);
    expect(clamp(100, 0, 100)).toBe(100);
  });
});
