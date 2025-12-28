
import React, { useState, useCallback, useEffect } from 'react';
import { MaterialSource, TestOutput } from './types';
import { geminiService } from './services/geminiService';
import Dashboard from './components/Dashboard';
import MaterialUpload from './components/MaterialUpload';
import TestGenerator from './components/TestGenerator';
import TestResultView from './components/TestResultView';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'materials' | 'generate'>('dashboard');
  const [materials, setMaterials] = useState<MaterialSource[]>([]);
  const [generatedTests, setGeneratedTests] = useState<TestOutput[]>([]);
  const [viewingTestId, setViewingTestId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMaterial = (newMaterial: MaterialSource) => {
    setMaterials(prev => [...prev, newMaterial]);
  };

  const handleRemoveMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const handleGenerate = async (prompt: string, versions: number) => {
    setIsLoading(true);
    try {
      const combinedContent = materials.map(m => m.content).join('\n\n');
      const newTests: TestOutput[] = [];

      for (let i = 0; i < versions; i++) {
        const result = await geminiService.generateTest(combinedContent, prompt);
        const testObj: TestOutput = {
          id: Math.random().toString(36).substr(2, 9),
          ...result
        };
        newTests.push(testObj);
      }

      setGeneratedTests(prev => [...newTests, ...prev]);
      setActiveTab('dashboard');
    } catch (error) {
      alert("Failed to generate test. Please check your API key and materials.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentTest = generatedTests.find(t => t.id === viewingTestId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab: any) => { setActiveTab(tab); setViewingTestId(null); }} 
      />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8">
        {isLoading && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 text-center max-w-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Generating Tests</h3>
                <p className="text-slate-500 mt-1">Applying MoET matrix constraints and extracting cognitive levels...</p>
              </div>
            </div>
          </div>
        )}

        {viewingTestId && currentTest ? (
          <TestResultView 
            test={currentTest} 
            onBack={() => setViewingTestId(null)} 
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard 
                tests={generatedTests} 
                onViewTest={(id) => setViewingTestId(id)}
                onDeleteTest={(id) => setGeneratedTests(prev => prev.filter(t => t.id !== id))}
                onStartGenerate={() => setActiveTab('generate')}
              />
            )}
            {activeTab === 'materials' && (
              <MaterialUpload 
                materials={materials} 
                onAdd={handleAddMaterial} 
                onRemove={handleRemoveMaterial} 
              />
            )}
            {activeTab === 'generate' && (
              <TestGenerator 
                hasMaterials={materials.length > 0} 
                onGenerate={handleGenerate} 
                onGoToMaterials={() => setActiveTab('materials')}
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
        <p>© 2024 Assessment AI System. MoET CV 7991 Compliant.</p>
      </footer>
    </div>
  );
};

export default App;
