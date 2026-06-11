import React, { useState } from 'react';
import { Send, HelpCircle, Shield, Zap, Clock, Info } from 'lucide-react';
import type { AnalysisResult } from '../types';
import { analyzeScenario } from '../api/analysis';

const Home: React.FC = () => {
  const [usage, setUsage] = useState('');
  const [scenario, setScenario] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    // 預防萬一，如果輸入是空的就不執行
    if (!usage.trim() || !scenario.trim()) return;

    try {
      setIsAnalyzing(true);  // 1. 開啟旋轉轉圈圈的載入動畫
      setResult(null);       // 清除上一次的分析結果

      // 2. 呼叫前端 api 函式，等待後端 fetch 吐回資料
      const data = await analyzeScenario(usage, scenario);
      
      // 3. 成功拿到資料，塞入 React State，下方卡片會自動亮起來
      setResult(data);
      
    } catch (error: any) {
      console.error("Analysis failed:", error);
      
      // 💡 4. 精準提取後端傳過來的中文錯誤提示（Axios 結構通常在 error.response.data）
      const errorMessage = error.response?.data?.error || error.message || "未知的伺服器錯誤";
      
      // 5. 彈出明確的中文提示視窗，一秒抓出是 401 還是 429 或是沒設定 Key！
      alert(`❌ 分析失敗！\n\n原因：${errorMessage}`);
    } finally {
      setIsAnalyzing(false); // 6. 無論成功或失敗，都把載入中動畫關掉，恢復按鈕可用狀態
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">AI 3D 列印方案推薦</h1>
        <p className="text-slate-500 mb-8">輸入您的物品需求，讓 AI 為您推薦最適合的材料與列印設定。</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Info size={16} className="text-blue-500" />
                物品是什麼？ (用途)
              </label>
              <input 
                type="text"
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                placeholder="例如：腳踏車燈支架、手機殼、裝飾公仔..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <HelpCircle size={16} className="text-blue-500" />
                使用場景與特殊需求
              </label>
              <textarea 
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="例如：需要在戶外日照下使用，會頻繁震動，且需要耐熱 60 度以上..."
                className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !usage.trim() || !scenario.trim()}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                isAnalyzing || !usage.trim() || !scenario.trim()
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AI 分析中...
                </>
              ) : (
                <>
                  <Send size={18} />
                  獲取推薦方案
                </>
              )}
            </button>
          </div>

          {/* Right: Initial State / Illustration */}
          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            {!result && !isAnalyzing ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">簡單兩步獲得專業建議</h3>
                <ul className="text-slate-500 text-sm space-y-2 text-left inline-block">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">1</div>
                    描述您的物品名稱與基本用途
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">2</div>
                    告訴我們使用環境 (耐熱、受力等)
                  </li>
                </ul>
              </div>
            ) : isAnalyzing ? (
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
                <p className="text-slate-660 font-medium">正在根據您的需求分析最佳材質與結構...</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Shield size={32} />
                </div>
                <p className="text-slate-800 font-bold text-lg mb-2">分析完成！</p>
                <p className="text-slate-500 italic">請查看下方為您量身打造的三種列印策略</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SchemeCard scheme={result.strengthPriority} icon={<Shield className="text-amber-500" />} color="amber" />
          <SchemeCard scheme={result.costEffective} icon={<Zap className="text-blue-500" />} color="blue" />
          <SchemeCard scheme={result.temporary} icon={<Clock className="text-emerald-500" />} color="emerald" />
        </div>
      )}
    </div>
  );
};

const SchemeCard: React.FC<{ scheme: any; icon: React.ReactNode; color: string }> = ({ scheme, icon, color }) => {
  const colorMap: any = {
    amber: 'border-amber-100 bg-amber-50/30',
    blue: 'border-blue-100 bg-blue-50/30',
    emerald: 'border-emerald-100 bg-emerald-50/30'
  };

  return (
    <div className={`p-6 rounded-2xl border ${colorMap[color]} backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-bold text-slate-800">{scheme.title}</h3>
      </div>
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">推薦耗材</span>
        <p className="text-slate-900 font-semibold">{scheme.material}</p>
      </div>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed min-h-[4rem]">{scheme.description}</p>
      
      <div className="space-y-3 mb-6 bg-white/50 p-3 rounded-lg">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">填充率</span>
          <span className="text-slate-800 font-medium">{scheme.settings.infill}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">外殼壁數</span>
          <span className="text-slate-800 font-medium">{scheme.settings.walls}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">層高</span>
          <span className="text-slate-800 font-medium">{scheme.settings.layerHeight}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex flex-wrap gap-2">
          {scheme.pros.map((pro: string, idx: number) => (
            <span key={idx} className="px-2 py-1 bg-white text-[10px] font-bold text-slate-500 rounded-md border border-slate-100">
              {pro}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;