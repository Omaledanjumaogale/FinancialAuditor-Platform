import { env } from "$env/dynamic/public";

export interface ScanRequest {
  url: string;
  context: string;
}

export const executeAIAnalysis = async (request: ScanRequest) => {
  try {
    const response = await fetch(`${env.PUBLIC_AI_AGENT_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: request.url,
        context: request.context,
        engine: 'crawl4ai',
        mode: 'audit'
      })
    });

    if (!response.ok) {
      throw new Error(`AI Analysis failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};
