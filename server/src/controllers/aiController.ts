import type { Request, Response } from 'express';
import { getGeminiAnalysis } from '../services/aiService.js';

export async function analyzeImages(req: Request, res: Response) {
  try {
    const { usage, scenario } = req.body;

    if (!usage || !scenario) {
      return res.status(400).json({ error: 'Usage and scenario are required' });
    }

    const analysis = await getGeminiAnalysis(usage, scenario);
    res.json(analysis);
  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    if (error.response) {
      console.error('Gemini API Error details:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to analyze requirements', details: error.message });
  }
}
