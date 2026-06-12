import type { Request, Response } from 'express';
import { getGeminiAnalysis } from '../services/aiService.js'; // 根據你的實際路徑調整

export async function analyzeImages(req: Request, res: Response): Promise<void> {
  try {
    // 從前端的 Body 拿到使用者輸入的用途與場景
    const { usage, scenario } = req.body;

    if (!usage || !scenario) {
       res.status(400).json({ error: "缺少必要參數：usage 或 scenario" });
       return;
    }

    // 呼叫你的 Gemini 服務
    const analysisResult = await getGeminiAnalysis(usage, scenario);

    // 將結果回傳給前端
    res.json(analysisResult);
  } catch (error: any) {
    console.error("Controller 發生錯誤:", error);
    res.status(500).json({ error: error.message || "伺服器內部錯誤" });
  }
}