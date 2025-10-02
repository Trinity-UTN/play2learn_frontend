export interface Word {
  word: string;
  wordOrder: number;
  isMissing: boolean;
}

export interface Sentence {
  words: Word[];
}

export interface CompletarOracionConfig {
  sentences: Sentence[];
}

export interface CompletarOracionInterface {
  sentences: Sentence[];
}
