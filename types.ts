
export enum CognitiveLevel {
  RECOGNITION = 'Recognition',
  COMPREHENSION = 'Comprehension',
  APPLICATION = 'Application',
  HIGH_APPLICATION = 'High Application'
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  cognitiveLevel: CognitiveLevel;
  explanation?: string;
}

export interface TestMatrix {
  partA: {
    mcq: number;
    gapFill: number;
  };
  partB: {
    mcq: number; // 2 pron, 3 vocab, 3 gram, 1 comm
    errorId: number;
    verbForms: number;
  };
  partC: {
    sign: number;
    cloze: number;
    comprehension: number;
  };
  partD: {
    reordering: number;
    rewriting: number;
    paragraph: number;
  };
}

export interface TestOutput {
  id: string;
  title: string;
  grade: string;
  testPaper: string; // Markdown formatted
  listeningScript: string;
  answerKey: string;
  markingRubric: string;
  matrixReport: string;
}

export interface MaterialSource {
  id: string;
  name: string;
  content: string;
  type: 'file' | 'link';
  extractedAt: Date;
}
