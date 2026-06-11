import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MaterialGuide from './pages/MaterialGuide';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {currentPage === 'home' ? <Home /> : <MaterialGuide />}
      </main>
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">© 2026 MakerAI Helper - 您的 3D 列印智能助手</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
