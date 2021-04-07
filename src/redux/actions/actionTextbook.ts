import { uploadWords } from '../../api/words';
import { IPropsLoadWords, IWord } from '../../types';
import { LOAD_WORDS } from '../constants';
const LoadWords = (words: IWord[]) => ({ type: LOAD_WORDS, words });

export const getWords = ({ groupNumber, pageNumber }: IPropsLoadWords) => {
  return async (dispatch: any) => {
    try {
      const res = await uploadWords(groupNumber, pageNumber);
      dispatch(LoadWords(res.data));
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
};
