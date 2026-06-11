import React from 'react';
import { materials } from '../assets/materials';
import { Info, CheckCircle, AlertCircle, Box, Hammer } from 'lucide-react';

const MaterialGuide: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">3D 列印材料百科</h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          挑選正確的材料是成功列印的第一步。從基礎的 PLA 到工業級的尼龍，
          我們為您整理了最完整的特性指南。
        </p>
      </div>

      <div className="space-y-16">
        {/* Core Materials */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Box size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">一、三大核心基礎耗材</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.filter(m => m.category === '核心基礎耗材').map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </section>

        {/* Advanced Materials */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <Hammer size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">二、特殊與進階功能耗材</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.filter(m => m.category === '特殊與進階耗材').map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <Info className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-slate-800">💡 挑選與保存小建議</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">防潮保存</h3>
              <p className="text-slate-600 leading-relaxed">
                除了 PLA 之外，PETG、TPU、尼龍都極度容易吸收空氣中的水分。
                建議使用防潮箱、真空袋加乾燥劑保存，必要時列印前先使用線材烘乾機進行回溫烘乾。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">配備確認</h3>
              <p className="text-slate-600 leading-relaxed">
                嘗試 ABS、尼龍或 PC 等高溫工程塑料前，請務必確認您的 3D 列印機具有「密閉保溫箱體」，
                且噴嘴與熱床的加熱溫度能夠達到材料所需的上限。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const MaterialCard: React.FC<{ material: any }> = ({ material }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {material.features.map((f: string, idx: number) => (
            <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-md uppercase tracking-wider border border-slate-100">
              {f}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{material.name}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">{material.description}</p>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-2 uppercase tracking-wide">
              <CheckCircle size={14} />
              <span>優點 / 特性</span>
            </div>
            <ul className="grid grid-cols-1 gap-1">
              {material.pros.map((p: string, idx: number) => (
                <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 text-rose-500 text-xs font-bold mb-2 uppercase tracking-wide">
              <AlertCircle size={14} />
              <span>缺點 / 限制</span>
            </div>
            <ul className="grid grid-cols-1 gap-1">
              {material.cons.map((c: string, idx: number) => (
                <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">典型應用</span>
        <div className="flex flex-wrap gap-2">
          {material.applications.map((a: string, idx: number) => (
            <span key={idx} className="text-xs text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialGuide;
