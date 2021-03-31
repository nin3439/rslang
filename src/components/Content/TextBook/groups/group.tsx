import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IGroupParametr } from '../../../../types';
const StyledNavLink = styled.div`
  width: 200px;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: white;
  background-color: ${(props) => props.color || '#ccc'};
  text-decoration: none;
`;
// const StyledLink = styled(Link)`
//   transform: scale(1);
//   transition: all 0.5s;
//   &:hover {
//     text-decoration: none;
//     transition: all 0.5s;
//     transform: scale(1.1);
//     color: #ccc;
//   }
// `;
export const Group = ({ numberGroup, color }: IGroupParametr) => {
  return (
    <NavLink to={`textbook/group/${numberGroup}/page/0`}>
      <StyledNavLink color={color}>Group {numberGroup + 1}</StyledNavLink>
    </NavLink>
  );
};
