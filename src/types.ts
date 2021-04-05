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
  groupNumber: string;
  pageNumber: string;
}

export interface IGroupParametr {
  numberGroup: number;
  color: string;
  id: string;
}

export interface IStatePage {
  textbook: {
    currentWords: IWord[];
  };
}

export interface IMainProps {
  isModalActive: string;
}
