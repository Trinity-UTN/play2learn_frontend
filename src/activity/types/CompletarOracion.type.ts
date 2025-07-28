export interface Word {
  word: string;
  wordOrder: number;
  isMissing: boolean;
}

export interface Sentence {
  words: Word[];
}

export interface CompletarOracionInterface {
  attempts: number;
  sentences: Sentence[];
}
