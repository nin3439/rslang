import {
  changeWord,
  filterAuthWords,
  uploadAuthWords,
  uploadWords,
} from '../../api/words';
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
export const getAuthWords = ({
  userId,
  groupNumber,
  pageNumber,
  category = '',
}: IPropsLoadWordsAuth) => {
  return async (dispatch: any) => {
    try {
      const res = category
        ? await filterAuthWords(userId, groupNumber, category)
        : await uploadAuthWords(userId, groupNumber, pageNumber);
      const data = res.data[0].paginatedResults;

      dispatch(LoadWords(data));
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateWord = (
  body: IPropsUpdate,
  wordId: string,
  method: 'post' | 'put',
  numberGroup: IPropsLoadWords,
  category = ''
) => {
  return async (dispatch: any) => {
    try {
      await changeWord(method, body, wordId);
      const id = localStorage.getItem('userId');
      const res = numberGroup.category
        ? await filterAuthWords(id, numberGroup.groupNumber, category)
        : await uploadAuthWords(
            id,
            numberGroup.groupNumber,
            numberGroup.pageNumber
          );
      const data = res.data[0].paginatedResults;
      dispatch(LoadWords(data));
    } catch (e) {
      console.log(e);
    }
  };
};
