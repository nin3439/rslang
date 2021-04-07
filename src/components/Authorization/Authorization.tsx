import React from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel, a11yProps } from './components/Bookmarks';
import Registration from './components/Registration';
import Login from './components/Login';
import { auth } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { ChangeModalAuth } from '../../redux/actions/controllerActions';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';

const PopUpMenu = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.6);
`;

const PopUpMenuInner = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 5%;
  bottom: 5%;
  margin: auto;
  background: ${({ theme }) => theme.menu};
  text-align: justify;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
`;

const TabsBlock = styled.div`
  width: 100%;
  height: 100%;
`;

const Button = styled(IconButton)`
  position: absolute;
  right: 0;
  cursor: pointer;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #f3727b;
  color: #fff;
  border: 0;
  width: 48px;
  height: 48px;
  border-radius: 0px;

  &:hover {
    background-color: #f3727b;
  }
`;

const StyledAppBar = styled(AppBar)`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.body};
`;

const Menu: React.FC<any> = ({
  isModalActive,
  changeModalAuth,
  auth,
  isAuth,
}) => {
  const [value, setValue] = React.useState(0);
  const [avatar, setAvatar] = React.useState<string | unknown>('');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const uploadUserAvatar = (e: any) => {
    const file = e.target.files[0];
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }).then((userAvatarUrl) => {
      setAvatar(userAvatarUrl);
    });
  };
  return (
    <PopUpMenu>
      <ClickAwayListener onClickAway={() => changeModalAuth()}>
        <PopUpMenuInner>
          {isAuth ? null : (
            <TabsBlock>
              <StyledAppBar position="static" color="inherit">
                <Tabs value={value} onChange={handleChange} centered>
                  <Tab label="Регистрация" {...a11yProps(0)} />
                  <Tab label="Вход" {...a11yProps(1)} />
                  <Button onClick={() => changeModalAuth()}>
                    <CancelIcon />
                  </Button>
                </Tabs>
              </StyledAppBar>
              <TabPanel value={value} index={0}>
                <Registration
                  avatar={avatar}
                  uploadUserAvatar={uploadUserAvatar}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Login />
              </TabPanel>
            </TabsBlock>
          )}
        </PopUpMenuInner>
      </ClickAwayListener>
    </PopUpMenu>
  );
};
const mapStateToProps = (state: any) => {
  return {
    isModalActive: state.controllers.isModalActive,
    isAuth: state.userReducer.isAuth,
  };
};
const mapStateToDispatch = (dispatch: any) => {
  return {
    changeModalAuth() {
      const action = ChangeModalAuth();
      dispatch(action);
    },
    auth,
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(Menu);
