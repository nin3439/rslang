import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { Tabs, Tab } from '@material-ui/core';
import { TabPanel, a11yProps } from './components/Bookmarks';
import Registration from './components/Registration';
import Login from './components/Login';
import { auth } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { changeModalAuth } from '../../redux/actions/controllerActions';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  PopUpMenu,
  PopUpMenuInner,
  TabsBlock,
  StyledAppBar,
  Button,
} from './style';

const Menu: React.FC<any> = ({
  isModalActive,
  changeModalAuth,
  auth,
  isAuth,
}) => {
  const [value, setValue] = React.useState(0);
  const [avatar, setAvatar] = React.useState<string | unknown>('');
  const [showLoader, setShowLoader] = React.useState(false);

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
                  showLoader={showLoader}
                  setShowLoader={setShowLoader}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Login showLoader={showLoader} setShowLoader={setShowLoader} />
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
      const action = changeModalAuth();
      dispatch(action);
    },
    auth,
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(Menu);
