
import React, { useState } from 'react';

interface TestGeneratorProps {
  hasMaterials: boolean;
  onGenerate: (prompt: string, versions: number) => void;
  onGoToMaterials: () => void;
}

const TestGenerator: React.FC<TestGeneratorProps> = ({ hasMaterials, onGenerate, onGoToMaterials }) => {
  const [prompt, setPrompt] = useState('');
  const [versions, setVersions] = useState(1);

  if (!hasMaterials) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Materials Required</h2>
        <p className="text-slate-500 mt-2 mb-8">
          You must upload teaching materials before generating tests. 
          The AI needs content to ensure pedagogical validity.
        </p>
        <button 
          onClick={onGoToMaterials}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
        >
          Go to Materials
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Generate Assessment</h2>
        <p className="text-slate-500 mt-2">Strictly follows MoET CV 7991 Matrix for English language testing.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-xl">
              <i className="fa-solid fa-microchip"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">MoET Smart Engine v3.0</h3>
              <p className="text-slate-400 text-sm">Active & ready with your custom materials</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Matrix Mode</p>
              <p className="font-semibold text-blue-400">CV 7991 Standard</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Grade Level</p>
              <p className="font-semibold">Secondary (Grade 6-9)</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">Number of Test Versions (Bulk Generation)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1" 
                max="10" 
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                value={versions}
                onChange={(e) => setVersions(parseInt(e.target.value))}
              />
              <span className="w-12 h-12 bg-blue-50 text-blue-700 font-bold rounded-xl flex items-center justify-center border border-blue-100">
                {versions}
              </span>
            </div>
            <p className="text-xs text-slate-400">Each version will have randomized questions with identical difficulty levels.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">Customization Prompt (Optional)</label>
            <textarea 
              placeholder="e.g., Focus more on Present Perfect tense, use topics from Unit 7: 'Television'..." 
              className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <p className="text-xs text-slate-400">Mention specific units or grammar points you want to prioritize.</p>
          </div>

          <button 
            onClick={() => onGenerate(prompt, versions)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-bolt"></i>
            Run Generation Pipeline
          </button>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
          <i className="fa-solid fa-circle-info"></i>
          Automated Outputs
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-blue-700">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-[10px]"></i>
            Full Test Papers
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-[10px]"></i>
            Listening Scripts
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-[10px]"></i>
            Answer Keys
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-[10px]"></i>
            Marking Schemes
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-[10px]"></i>
            Matrix Specification
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-[10px]"></i>
            Bulk Export
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestGenerator;
