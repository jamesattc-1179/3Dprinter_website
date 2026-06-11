import React from 'react';
import { Box } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Box size={20} />
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">MakerAI Helper</span>
        </div>
        
        <div className="flex gap-1">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 'home' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            AI 結構分析
          </button>
          <button 
            onClick={() => setCurrentPage('material')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 'material' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            材料指南
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
