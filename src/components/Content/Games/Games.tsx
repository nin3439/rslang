import React from 'react';
import { CardContent, Grid, Card, Typography } from '@material-ui/core';
import { GAMES } from '../../../constants/games';
import { Link } from 'react-router-dom';

export const Games = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      {GAMES.map((game) => {
        return (
          <Grid item key={game.name}>
            <Link to={game.path}>
              <Card style={{ width: '450px', height: '250px' }}>
                <CardContent>
                  <Typography variant="h5">{game.name}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};
