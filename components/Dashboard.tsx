
import React from 'react';
import { TestOutput } from '../types';

interface DashboardProps {
  tests: TestOutput[];
  onViewTest: (id: string) => void;
  onDeleteTest: (id: string) => void;
  onStartGenerate: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tests, onViewTest, onDeleteTest, onStartGenerate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Assesment Dashboard</h2>
          <p className="text-slate-500 mt-2">Manage your MoET-compliant English test versions.</p>
        </div>
        <button 
          onClick={onStartGenerate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          New Test Version
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon="fa-file-lines" 
          label="Total Tests" 
          value={tests.length.toString()} 
          color="blue"
        />
        <StatCard 
          icon="fa-check-double" 
          label="Compliant Rate" 
          value="100%" 
          color="green"
        />
        <StatCard 
          icon="fa-clock" 
          label="Time Saved" 
          value={`${tests.length * 45} mins`} 
          color="amber"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Generated Tests</h3>
          <div className="text-sm text-slate-500">Sorted by Date</div>
        </div>
        
        {tests.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 text-3xl mb-4">
              <i className="fa-solid fa-folder-open"></i>
            </div>
            <h4 className="text-lg font-semibold text-slate-600">No tests generated yet</h4>
            <p className="text-slate-400 mt-1 max-w-xs mx-auto">Upload teaching materials and use the generator to create your first assessment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <tr>
                  <th className="px-6 py-4 font-semibold">Test Title</th>
                  <th className="px-6 py-4 font-semibold">Cognitive Balance</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tests.map((test) => (
                  <tr key={test.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">{test.title}</p>
                        <p className="text-xs text-slate-400">ID: {test.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase border border-green-100">CV 7991 OK</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-400" style={{ width: '40%' }}></div>
                          <div className="h-full bg-blue-500" style={{ width: '45%' }}></div>
                          <div className="h-full bg-blue-600" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onViewTest(test.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <i className="fa-solid fa-eye text-sm"></i>
                        </button>
                        <button 
                          onClick={() => onDeleteTest(test.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <i className="fa-solid fa-trash text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string; label: string; value: string; color: string }> = ({ icon, label, value, color }) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500 text-blue-50',
    green: 'bg-green-500 text-green-50',
    amber: 'bg-amber-500 text-amber-50'
  };
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${colors[color]}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
