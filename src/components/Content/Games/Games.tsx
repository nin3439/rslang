import React from 'react';
import { CardContent, Grid, Card, Typography } from '@material-ui/core';
import { GAMES } from 'constants/games';
import { Link } from 'react-router-dom';

export const Games = () => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {GAMES.map(({ name, path }) => (
        <Grid item key={name} style={{ margin: '10px' }}>
          <Link to={path}>
            <Card style={{ width: '350px', height: '200px' }}>
              <CardContent>
                <Typography variant="h5">{name}</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
