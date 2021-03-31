import React from 'react';
import { parametrGroupsWords } from '../../../../constants/goupsWords';
import { IGroupParametr } from '../../../../types';
import { Group } from './group';
import styled from 'styled-components';

const StyledGroups = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
export const Groups = () => {
  const arrGroups = parametrGroupsWords.map((element: IGroupParametr) => (
    <Group {...element} />
  ));
  return <StyledGroups>{arrGroups}</StyledGroups>;
};