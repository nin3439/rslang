export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IActionWords {
  type: string;
  words: IWord[];
}

export interface IPropsLoadWords {
  groupNumber: number;
  pageNumber: number;
}

export interface IGroupParametr {
  numberGroup: number;
  color: string;
}
