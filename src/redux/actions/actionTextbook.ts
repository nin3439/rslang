import { AnyAaaaRecord } from 'node:dns';
import { Dispatch } from 'react';
import { changeWord, uploadWords } from '../../api/words';
import { IPropsLoadWords, IUpdateWord, IWord } from '../../types';
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
export const updateWord = (body: IUpdateWord, wordId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await changeWord(body, wordId);
    } catch (e) {
      console.log(e);
    }
  };
};
