import React from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { IGroupParametr } from 'types';
const StyledGroup = styled.div`
  margin-top: 10px;
  width: 200px;
  height: 400px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: white;
  background: url(${(props) => props.color});
  background-size: cover;
  background-position: center center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
`;

export const Group = ({ numberGroup, color }: IGroupParametr) => {
  const { path } = useRouteMatch();
  const params: { category: string } = useParams();
  return (
    <NavLink
      to={`${
        params.category ? params.category : path
      }/group/${numberGroup}/page/0`}
    >
      <StyledGroup color={color}>Раздел {numberGroup + 1}</StyledGroup>
    </NavLink>
  );
};
