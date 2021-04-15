import React from 'react';
import { CardContent, Grid, Card, Typography } from '@material-ui/core';
import { GAMES } from 'constants/games';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  &.MuiPaper-root {
    position: relative;
    width: 35vw;
    height: 35vh;
    transform: scale(1);
    transition: transform 0.5s;
    margin: 20px;
    &:hover {
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

const StyledTypography = styled(Typography)`
  &.MuiTypography-root {
    color: #fff;
    position: absolute;
    bottom: 20px;
    right: 10px;
    text-shadow: 1px 1px 3px black;
  }
`;

export const Games = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: '100%' }}
    >
      {GAMES.map(({ name, path, background }) => (
        <Grid item key={name} style={{ margin: '0px' }}>
          <Link to={path} style={{ textDecoration: 'none' }}>
            <StyledCard
              style={{
                background: `url(${background})`,
                backgroundSize: 'cover',
              }}
            >
              <CardContent>
                <StyledTypography variant="h5">{name}</StyledTypography>
              </CardContent>
            </StyledCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
