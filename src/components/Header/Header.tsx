import React from 'react';
import { Grid, IconButton, Typography, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { MenuBlock } from './MenuBlock';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ChangeModalAuth } from '../../redux/actions/controllerActions';
import { logout } from '../../redux/reducers/userReducer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const StyledGrid = styled(Grid)`
  padding: 0 28px;
`;

const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

const StyledMenuBlock = styled(MenuBlock)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${({ theme }) => theme.backgroundImage};
  background-size: cover;
  height: 100vh;
  background-position: center center;
`;

const Header: React.FC<any> = ({
  isModalActive,
  changeModalAuth,
  isAuth,
  userAvatar,
  logout,
  showNight,
  updateMode,
}) => {
  return (
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <StyledMenuBlock />
      <Typography variant="h5">RS Lang</Typography>
      <StyledIconButton onClick={() => updateMode(showNight)}>
        {showNight ? <Brightness2Icon /> : <WbSunnyIcon />}
      </StyledIconButton>
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
          <StyledIconButton
            onClick={() => {
              logout();
            }}
          >
            <ExitToAppIcon />
          </StyledIconButton>
        </Grid>
      ) : (
        <StyledIconButton
          onClick={() => {
            changeModalAuth();
          }}
        >
          <AccountCircle />
        </StyledIconButton>
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
