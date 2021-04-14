export interface IWord {
  _id: string;
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
  userWord: {
    difficulty: string;
    optional: {
      isDeleted: boolean;
    };
  };
}

export interface IActionWords {
  type: string;
  words: IWord[];
}

export interface IPropsLoadWords {
  groupNumber: string;
  pageNumber: string;
}
export interface IPropsLoadWordsAuth {
  userId: string;
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
  userReducer: {
    currentUser: ICurrentUser;
    isAuth: boolean;
  };
  controllers: {
    isModalActive: boolean;
  };
}

export interface ICurrentUser {
  message?: string;
  userId: string;
  email: string;
  name: string;
  avatar: string;
  token?: string;
  refreshToken?: string;
}
export interface IMainProps {
  isModalActive: string;
  auth: () => void;
}

export interface IAuthorizationProps {
  isModalActive: string;
  auth: () => void;
  isAuth: boolean;
  changeModalAuth: any;
}

export interface IRegistrationProps {
  registration: any;
  uploadUserAvatar: (e: any) => void;
  avatar: string | unknown;
  showLoader: boolean;
  setShowLoader: any;
}

export interface ILoginProps {
  login: any;
  isAuth: boolean;
  showLoader: boolean;
  setShowLoader: any;
}

export interface IPropsUpdate {
  difficulty?: string;
  optional?: {};
}

export interface IOptions {
  translate: boolean;
  buttons: boolean;
}
