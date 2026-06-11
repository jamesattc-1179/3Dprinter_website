import dotenv from 'dotenv';

dotenv.config();

export async function getGeminiAnalysis(usage: string, scenario: string) {
  // 1. 取得你的 API Key（不管是 AIzaSy 還是 AQ 開頭都行）
  const apiKey = process.env.GEMINI_API_KEY || '';
  
  if (!apiKey) {
    throw new Error("⚠️ 找不到 GEMINI_API_KEY，請確認 .env 檔案配置。");
  }

  // 2. 直接呼叫 Google Gemini 2.0 Flash 官方 REST API 網址
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const prompt = `
    你是一位資深的 3D 列印專家。請根據使用者提供的物品用途與應用場景，推薦最適合的列印方案：
    
    物品用途：${usage}
    應用場景/需求：${scenario}

    請提供三種 3D 列印方案，並以 JSON 格式回傳。
    方案要求：
    1. strengthPriority (強度優先)：最堅固、耐用，考慮到長期的結構穩定性。
    2. costEffective (性價比)：平衡強度與成本，並針對使用場景指出結構上哪邊該加強（例如：應力集中點、壁厚建議）。
    3. temporary (過渡/最低價)：用於原型驗證，追求最低成本與最高列印速度。

    JSON 結構必須精確如下：
    {
      "strengthPriority": {
        "title": "強度優先方案",
        "material": "材料名稱",
        "description": "專業分析選擇理由...",
        "settings": { "infill": "50% Gyroid", "walls": "4 層", "layerHeight": "0.2mm" },
        "pros": ["優點1", "優點2"]
      },
      "costEffective": {
        "title": "性價比方案",
        "material": "材料名稱",
        "description": "如何平衡成本與強化結構...",
        "settings": { "infill": "20% Grid", "walls": "3 層", "layerHeight": "0.2mm" },
        "pros": ["優點1", "優點2"]
      },
      "temporary": {
        "title": "過渡/最低價方案",
        "material": "材料名稱",
        "description": "快速驗證選擇...",
        "settings": { "infill": "10% Lightning", "walls": "2 層", "layerHeight": "0.28mm" },
        "pros": ["優點1", "優點2"]
      }
    }
  `;

  try {
    // 3. 使用原生 fetch 發送 POST 請求
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json" // 強制 Google 吐出純 JSON
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google API 錯誤 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    // 4. 解析回傳的文字
    const textResult = data.candidates[0].content.parts[0].text;
    console.log('Gemini Fetch Response:', textResult);
    
    return JSON.parse(textResult.trim());

  } catch (error: any) {
    console.error("❌ Fetch 呼叫或解析失敗:", error);
    throw new Error(`Gemini 服務異常: ${error.message}`);
  }
}