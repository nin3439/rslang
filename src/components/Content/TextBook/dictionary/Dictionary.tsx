import {
  deleted,
  hard,
  learn,
} from 'components/Content/TextBook/dictionary/constants';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
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
const StyledGroups = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
export const Dictionary = () => {
  const { path } = useRouteMatch();
  return (
    <StyledGroups>
      <NavLink to={`${path}/learn`}>
        <StyledGroup color={learn}>Изучаемые</StyledGroup>
      </NavLink>
      <NavLink to={`${path}/delete`}>
        <StyledGroup color={deleted}>Удаленные</StyledGroup>
      </NavLink>
      <NavLink to={`${path}/hard`}>
        <StyledGroup color={hard}>Сложные</StyledGroup>
      </NavLink>
    </StyledGroups>
  );
};
