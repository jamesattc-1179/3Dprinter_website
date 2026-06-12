import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeImages } from './controllers/aiController.js';

// 1. 載入環境變數
dotenv.config();

const app = express();

/**
 * 🚀 連接埠動態配置
 * 優先讀取 Render 分配的 process.env.PORT，本地測試則預設走 3001
 */
const port = Number(process.env.PORT) || 3001;

// 2. 中介軟體設定
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 3. 健康檢查路由 (Render 部署時會自動戳這個路徑來確認你的程式有沒有活著)
app.get('/health', (req, res) => {
  res.send('Server is healthy');
});

// 4. AI 分析主要路由
app.post('/api/analyze', analyzeImages);

/**
 * 5. 啟動伺服器
 * ⚡ 關鍵點：加上 '0.0.0.0'，允許 Render 的外部路由網關（Gateway）連線進來
 */
app.listen(port, '0.0.0.0', () => {
  console.log(`=============================================`);
  console.log(`🛰️ 安全系統：雲端後端節點已成功解鎖！`);
  console.log(`🌐 正在監聽所有網路介面的連接埠: ${port}`);
  console.log(`=============================================`);
});