import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { MenuBlock } from './MenuBlock';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  padding: 0 28px;
`;

interface IHeaderProps {
  showUserMenu: boolean;
  setShowUserMenu: any;
}

export const Header: React.FC<IHeaderProps> = ({
  showUserMenu,
  setShowUserMenu,
}) => {
  return (
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <MenuBlock />
      <Typography>RS Lang</Typography>
      <IconButton>
        <AccountCircle onClick={() => setShowUserMenu(!showUserMenu)} />
      </IconButton>
    </StyledGrid>
  );
};
