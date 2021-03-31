import axios from 'axios';
import { API_URL } from '../../config';
import { IPropsLoadWords, IWord } from '../../types';
import { LOAD_WORDS } from '../constants';
const LoadWords = (words: IWord[]) => ({ type: LOAD_WORDS, words });

const getWords = ({ groupNumber, pageNumber }: IPropsLoadWords) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${API_URL}/words`, {
        params: { group: groupNumber, page: pageNumber },
      });

      dispatch(LoadWords(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export default getWords;
