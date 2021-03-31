import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { MenuBlock } from './MenuBlock';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ChangeModalAuth } from '../../redux/actions/controllerActions';

const StyledGrid = styled(Grid)`
  padding: 0 28px;
`;

interface IHeaderProps {
  isModalActive: boolean;
  changeModalAuth: () => void;
}

const Header: React.FC<IHeaderProps> = ({ isModalActive, changeModalAuth }) => {
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
        <AccountCircle
          onClick={() => {
            changeModalAuth();
          }}
        />
      </IconButton>
    </StyledGrid>
  );
};
const mapStateToProps = (state: any) => {
  return {
    isModalActive: state.controllers.isModalActive,
  };
};
const mapStateToDispatch = (dispatch: any) => {
  return {
    changeModalAuth() {
      const action = ChangeModalAuth();
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(Header);
