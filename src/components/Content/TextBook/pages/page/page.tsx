import React from 'react';
import styled from 'styled-components';
import { Word } from 'components/Content/TextBook/pages/word/word';
import { IUpdateWord, IWord } from 'types';

const StyledWords = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

interface IPageProps {
  words: IWord[];
  updateWord: (body: IUpdateWord, idWord: string) => void;
}
export const Page = ({ words, updateWord }: IPageProps) => {
  const allWords = words.map((word: IWord) => {
    return (
      <Word updateWord={updateWord} key={word.id || word._id} word={word} />
    );
  });
  return <StyledWords>{allWords}</StyledWords>;
};
