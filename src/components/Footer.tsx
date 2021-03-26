import React from 'react';
import { Grid, Link } from '@material-ui/core';
import { AUTHORS } from '../constants/allAuthors';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  transform: scale(1);
  transition: all 0.5s;
  &:hover {
    text-decoration: none;
    transition: all 0.5s;
    transform: scale(1.1);
    color: #ccc;
  }
`;

const StyledGrid = styled(Grid)`
  padding: 0 40px;
`;

export const Footer: React.FC = () => {
  return (
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <StyledLink href="https://rs.school/">
          <img
            src="https://rs.school/images/rs_school.svg"
            alt="RSS Logo"
            style={{ width: '45px', height: '45px', marginRight: '15px' }}
          />
        </StyledLink>
        <span>2021</span>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-end"
        alignItems="center"
        wrap="nowrap"
      >
        {AUTHORS.map((author, index) => {
          return (
            <Grid item key={index}>
              <StyledLink href={author.url}> {author.name}</StyledLink>
            </Grid>
          );
        })}
      </Grid>
    </StyledGrid>
  );
};
