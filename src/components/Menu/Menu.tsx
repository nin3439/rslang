import React, { useEffect } from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel, a11yProps, useStyles } from './components/Bookmarks';
import Registration from './components/Registration';
import Login from './components/Login';
import { auth } from '../../redux/actions/user';
import { connect, useDispatch } from 'react-redux';
import { ChangeModalAuth } from '../../redux/actions/controllerActions';

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
  top: 10%;
  bottom: 10%;
  margin: auto;
  background: white;
  padding: 10px 20px 10px;
  text-align: justify;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <PopUpMenu>
      <PopUpMenuInner>
        {isAuth ? (
          <div>Пользователь авторизирован</div>
        ) : (
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Регистрация" {...a11yProps(0)} />
                <Tab label="Логин" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Registration />
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
