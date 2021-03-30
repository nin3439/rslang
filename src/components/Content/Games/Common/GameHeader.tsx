import React from 'react';
import { Grid, IconButton, Button, Box } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
`;

export const GameHeader = () => {
  return (
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Link to="/games">
        <IconButton>
          <Close />
        </IconButton>
      </Link>

      <Box>
        <Button>Уровень</Button>
        <Button>Раунд</Button>
      </Box>
    </StyledGrid>
  );
};
