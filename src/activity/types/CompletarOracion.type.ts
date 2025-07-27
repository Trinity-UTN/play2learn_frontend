interface Word {
  word: string;
  wordOrder: number;
  isMissing: boolean;
}

interface Sentence {
  words: Word[];
}

export interface CompletarOracionInterface {
  attempts: number;
  sentences: Sentence[];
}
