
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'materials' | 'generate') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">MoET GenAI</h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Assessment System</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <TabButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon="fa-table-columns" 
            label="Dashboard" 
          />
          <TabButton 
            active={activeTab === 'materials'} 
            onClick={() => setActiveTab('materials')} 
            icon="fa-book" 
            label="Materials" 
          />
          <TabButton 
            active={activeTab === 'generate'} 
            onClick={() => setActiveTab('generate')} 
            icon="fa-wand-magic-sparkles" 
            label="Generator" 
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-700">Dr. Nguyen Teacher</p>
            <p className="text-xs text-slate-500">Premium School Account</p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      active ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
    <i className={`fa-solid ${icon}`}></i>
    <span>{label}</span>
  </button>
);

export default Navbar;
