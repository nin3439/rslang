import React from 'react';
import styled from 'styled-components';
import { IWord } from '../../../../../types';
import { Word } from '../word/word';

const StyledWords = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

interface IPageProps {
  words: IWord[];
}
export const Page = ({ words }: IPageProps) => {
  const allWords = words.map((word: IWord) => {
    return <Word key={word.id} word={word} />;
  });
  return <StyledWords>{allWords}</StyledWords>;
};
