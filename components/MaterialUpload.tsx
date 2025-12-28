
import React, { useState } from 'react';
import { MaterialSource } from '../types';

interface MaterialUploadProps {
  materials: MaterialSource[];
  onAdd: (m: MaterialSource) => void;
  onRemove: (id: string) => void;
}

const MaterialUpload: React.FC<MaterialUploadProps> = ({ materials, onAdd, onRemove }) => {
  const [dragActive, setDragActive] = useState(false);
  const [driveLink, setDriveLink] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Fixed: Explicitly type the array from FileList as File[] to prevent 'unknown' property access errors
    const fileArray = Array.from(files) as File[];
    for (const file of fileArray) {
      const content = await file.text(); // Simplification: assuming text-extractable content
      onAdd({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        content: content,
        type: 'file',
        extractedAt: new Date()
      });
    }
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveLink.trim()) return;
    
    // Simulate link extraction
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      name: `Link: ${driveLink.substring(0, 30)}...`,
      content: `Extracted content from Google Drive folder/file at ${driveLink}`,
      type: 'link',
      extractedAt: new Date()
    });
    setDriveLink('');
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Content Sources</h2>
        <p className="text-slate-500 mt-2">Upload materials to train the AI on your specific curriculum topics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-slate-400'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <i className="fa-solid fa-cloud-arrow-up"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-800">Upload Documents</h4>
            <p className="text-sm text-slate-500 mt-1 mb-6">PDF, DOCX, TXT or PPTX files supported</p>
            
            <label className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg cursor-pointer font-semibold transition-colors">
              Browse Files
              <input type="file" multiple className="hidden" onChange={handleFileChange} accept=".pdf,.docx,.txt,.pptx" />
            </label>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fa-brands fa-google-drive text-blue-500"></i>
              Import from Google Drive
            </h4>
            <form onSubmit={handleLinkSubmit} className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Paste shared Google Drive link here..." 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                Extract Link Content
              </button>
            </form>
            <p className="text-[10px] text-slate-400 mt-3 text-center uppercase font-bold tracking-widest">Supports single files or entire folders</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 flex flex-col min-h-[400px]">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
            <h3 className="font-bold text-slate-800">Active Material Pool ({materials.length})</h3>
          </div>
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[500px]">
            {materials.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 text-center">
                <i className="fa-solid fa-inbox text-4xl mb-3"></i>
                <p>No materials uploaded yet</p>
              </div>
            ) : (
              materials.map((m) => (
                <div key={m.id} className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                    m.type === 'file' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <i className={`fa-solid ${m.type === 'file' ? 'fa-file' : 'fa-link'}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{m.name}</p>
                    <p className="text-xs text-slate-500">Added on {m.extractedAt.toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => onRemove(m.id)}
                    className="w-8 h-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialUpload;
