import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IGroupParametr } from '../../../../types';
const StyledGroup = styled.div`
  width: 200px;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: white;
  background-color: ${(props) => props.color || '#ccc'};
  text-decoration: none;
`;

export const Group = ({ numberGroup, color }: IGroupParametr) => {
  return (
    <NavLink to={`textbook/group/${numberGroup}/page/0`}>
      <StyledGroup color={color}>Group {numberGroup + 1}</StyledGroup>
    </NavLink>
  );
};
