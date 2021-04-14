import { changeWord, uploadAuthWords, uploadWords } from '../../api/words';
import {
  IPropsLoadWords,
  IWord,
  IPropsLoadWordsAuth,
  IPropsUpdate,
} from '../../types';
import { LOAD_WORDS } from '../constants';
const LoadWords = (words: IWord[]) => ({ type: LOAD_WORDS, words });

export const getWords = ({ groupNumber, pageNumber }: IPropsLoadWords) => {
  return async (dispatch: any) => {
    try {
      const res = await uploadWords(groupNumber, pageNumber);
      dispatch(LoadWords(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

// export const getWords = ({ groupNumber, pageNumber }: IPropsLoadWords) => {
//   return async (dispatch: any) => {
//     try {
//       const res = await uploadWords(groupNumber, pageNumber);
//       dispatch(LoadWords(res.data));
//       return res.data;
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };
export const getAuthWords = ({
  userId,
  groupNumber,
  pageNumber,
}: IPropsLoadWordsAuth) => {
  return async (dispatch: any) => {
    try {
      const res = await uploadAuthWords(userId, groupNumber, pageNumber);
      const data = res.data[0].paginatedResults;
      dispatch(LoadWords(data));
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateWord = (body: IPropsUpdate, wordId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await changeWord(body, wordId);
    } catch (e) {
      console.log(e);
    }
  };
};
