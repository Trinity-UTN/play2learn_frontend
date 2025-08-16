export interface Word {
  word: string;
  wordOrder: number;
  isMissing: boolean;
}

export interface Sentence {
  words: Word[];
}

export interface CompletarOracionConfig {
  totalSentences: number;
  minWordsPerSentence: number;
  maxWordsPerSentence: number;
}

export interface CompletarOracionInterface {
  sentences: Sentence[];
}
