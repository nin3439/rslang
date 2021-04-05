import React from 'react';
import { Grid, IconButton, Typography, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { MenuBlock } from './MenuBlock';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ChangeModalAuth } from '../../redux/actions/controllerActions';
import { logout } from '../../redux/reducers/userReducer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

const StyledGrid = styled(Grid)`
  padding: 0 28px;
`;

const Header: React.FC<any> = ({
  isModalActive,
  changeModalAuth,
  isAuth,
  userAvatar,
  logout,
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
      {isAuth ? (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          wrap="nowrap"
          style={{ maxWidth: '200px' }}
        >
          <div>{localStorage.getItem('userName')}</div>
          <Avatar src={userAvatar} style={{ margin: '0 0 0 10px' }} />
          <IconButton onClick={() => changeModalAuth()}>
            <SettingsIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              logout();
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Grid>
      ) : (
        <IconButton
          onClick={() => {
            changeModalAuth();
          }}
        >
          <AccountCircle />
        </IconButton>
      )}
    </StyledGrid>
  );
};
const mapStateToProps = (state: any) => {
  return {
    isModalActive: state.controllers.isModalActive,
    isAuth: state.userReducer.isAuth,
    userAvatar: state.userReducer.currentUser.avatar,
  };
};
const mapStateToDispatch = (dispatch: any) => {
  return {
    changeModalAuth() {
      const action = ChangeModalAuth();
      dispatch(action);
    },
    logout: () => {
      const action = logout();
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(Header);
