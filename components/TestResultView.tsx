
import React, { useState } from 'react';
import { TestOutput } from '../types';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

interface TestResultViewProps {
  test: TestOutput;
  onBack: () => void;
}

const TestResultView: React.FC<TestResultViewProps> = ({ test, onBack }) => {
  const [activeView, setActiveView] = useState<'paper' | 'script' | 'key' | 'matrix'>('paper');

  const handleExport = async (format: 'pdf' | 'docx') => {
    if (format === 'docx') {
      try {
        const lines = test.testPaper.split('\n');
        const children = lines.map(line => {
          const trimmed = line.trim();
          
          // Basic Markdown-like heading detection for DOCX structure
          if (trimmed.startsWith('# ')) {
            return new Paragraph({
              text: trimmed.replace('# ', ''),
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 200, after: 120 },
            });
          }
          if (trimmed.startsWith('## ')) {
            return new Paragraph({
              text: trimmed.replace('## ', ''),
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 180, after: 100 },
            });
          }
          if (trimmed.startsWith('### ')) {
            return new Paragraph({
              text: trimmed.replace('### ', ''),
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 150, after: 80 },
            });
          }

          // Very simple bold text detection for whole lines
          if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
             return new Paragraph({
              children: [new TextRun({ text: trimmed.replace(/\*\*/g, ''), bold: true })],
              spacing: { after: 100 },
            });
          }

          return new Paragraph({
            children: [new TextRun(line)],
            spacing: { after: 80 },
          });
        });

        const doc = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({
                text: "BỘ GIÁO DỤC VÀ ĐÀO TẠO",
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph({
                text: "ĐỀ THI TIẾNG ANH CHUẨN MOET",
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: test.title,
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),
              ...children
            ],
          }],
        });

        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${test.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("DOCX Export failed:", error);
        alert("Failed to generate DOCX file. Please try again.");
      }
    } else {
      alert(`Exporting as ${format.toUpperCase()}... In a production environment, this would integrate with a PDF generation library like jsPDF.`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{test.title}</h2>
            <p className="text-slate-500 text-sm">Review all MoET-mandated sections below.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleExport('docx')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            <i className="fa-solid fa-file-word"></i>
            Download DOCX
          </button>
          <button 
            onClick={() => handleExport('pdf')}
            className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            <i className="fa-solid fa-file-pdf text-red-600"></i>
            Export PDF
          </button>
          <button className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all active:scale-95">
            <i className="fa-brands fa-google-drive text-green-600"></i>
            Google Form
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        <TabBtn active={activeView === 'paper'} onClick={() => setActiveView('paper')} label="Test Paper" icon="fa-file-lines" />
        <TabBtn active={activeView === 'script'} onClick={() => setActiveView('script')} label="Listening Script" icon="fa-headphones" />
        <TabBtn active={activeView === 'key'} onClick={() => setActiveView('key')} label="Answer Key & Rubric" icon="fa-key" />
        <TabBtn active={activeView === 'matrix'} onClick={() => setActiveView('matrix')} label="MoET Matrix" icon="fa-table" />
      </div>

      <div className="test-paper-preview rounded-xl border border-slate-200 overflow-y-auto max-h-[1000px] prose prose-slate max-w-none">
        {activeView === 'paper' && (
          <div className="whitespace-pre-wrap font-serif leading-relaxed text-slate-800">
            {test.testPaper}
          </div>
        )}
        {activeView === 'script' && (
          <div className="whitespace-pre-wrap font-serif text-slate-800">
            {test.listeningScript}
          </div>
        )}
        {activeView === 'key' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-4 uppercase tracking-wider">Answer Key</h3>
              <div className="whitespace-pre-wrap font-serif text-slate-800">{test.answerKey}</div>
            </div>
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4 uppercase tracking-wider">Marking Scheme/Rubric</h3>
              <div className="whitespace-pre-wrap font-serif text-slate-800">{test.markingRubric}</div>
            </div>
          </div>
        )}
        {activeView === 'matrix' && (
          <div className="whitespace-pre-wrap font-mono text-xs text-slate-700">
            {test.matrixReport}
          </div>
        )}
      </div>
    </div>
  );
};

const TabBtn: React.FC<{ active: boolean; onClick: () => void; label: string; icon: string }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-semibold text-sm ${
      active ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
    }`}
  >
    <i className={`fa-solid ${icon}`}></i>
    {label}
  </button>
);

export default TestResultView;
