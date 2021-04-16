import React from 'react';
import styled from 'styled-components';
import { Word } from 'components/Content/TextBook/pages/word/word';
import { IOptions, IPropsLoadWords, IPropsUpdate, IWord } from 'types';

const StyledWords = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

interface IPageProps {
  words: IWord[];
  numberGroup: IPropsLoadWords;
  updateWord: (
    body: IPropsUpdate,
    idWord: string,
    method: 'post' | 'put',
    numberGroup: IPropsLoadWords
  ) => void;
  options: IOptions;
}
export const Page = ({
  words,
  updateWord,
  options,
  numberGroup,
}: IPageProps) => {
  const allWords = words.map((word: IWord) => {
    if (numberGroup.category !== 'delete') {
      if (word.userWord) {
        if (word.userWord.optional?.isDeleted) {
          return '';
        }
      }
    }
    if (numberGroup.category === 'delete') {
      if (!word?.userWord?.optional?.isDeleted) {
        return '';
      }
    }

    return (
      <Word
        numberGroup={numberGroup}
        updateWord={updateWord}
        key={word.id || word._id}
        word={word}
        options={options}
      />
    );
  });
  return (
    <StyledWords>{allWords.length > 0 ? allWords : 'ТУТ ПУСТО'}</StyledWords>
  );
};
