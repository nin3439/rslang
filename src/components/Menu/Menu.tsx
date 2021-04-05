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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

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
  background: white;
  padding: 40px 20px 10px 60px;
  text-align: justify;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
`;

const OptionsHeader = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;

const Button = styled.button`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #f3727b;
  color: #fff;
  border: 0;
  border-radius: 5%;
  width: 50px;
  height: 50px;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.1), 0 1px 0px rgba(0, 0, 0, 0.1);
  }

  &:active {
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.1), 0 1px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    width: 49px;
    heigth: 49px;
  }
`;

const Menu: React.FC<any> = ({
  isModalActive,
  changeModalAuth,
  auth,
  isAuth,
}) => {
  const [value, setValue] = React.useState(0);
  const [avatar, setAvatar] = React.useState<string | unknown>('');
  const [options, setOptions] = React.useState({
    translate: true,
    buttons: true,
  });

  const optionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };

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
          {isAuth ? (
            <div>
              <OptionsHeader>
                Пользователь {localStorage.getItem('userName')} авторизован
              </OptionsHeader>
              <FormControl component="fieldset">
                <FormLabel component="legend">Настройки пользователя</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={options.translate}
                        onChange={optionsChange}
                        name="translate"
                      />
                    }
                    label="Показывать перевод слов"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={options.buttons}
                        onChange={optionsChange}
                        name="buttons"
                      />
                    }
                    label="Показывать кнопки словаря"
                  />
                </FormGroup>
              </FormControl>
            </div>
          ) : (
            <div>
              <AppBar position="static" color="default">
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Регистрация" {...a11yProps(0)} />
                  <Tab label="Вход" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Registration
                  avatar={avatar}
                  uploadUserAvatar={uploadUserAvatar}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Login />
              </TabPanel>
            </div>
          )}
          <Button onClick={() => changeModalAuth()}>
            <CancelIcon />
          </Button>
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
