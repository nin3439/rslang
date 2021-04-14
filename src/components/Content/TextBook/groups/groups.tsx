import React from 'react';
import { parametrGroupsWords } from 'constants/groupsWords';
import { IGroupParametr } from 'types';
import styled from 'styled-components';
import { Group } from 'components/Content/TextBook/groups/group';

const StyledGroups = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
export const Groups = () => {
  const arrGroups = parametrGroupsWords.map((element: IGroupParametr) => (
    <Group {...element} key={element.id} />
  ));
  return <StyledGroups>{arrGroups}</StyledGroups>;
};
