import axios from 'axios';
import { API_URL } from '../../config';
import {
  changeErrorLogin,
  changeErrorRegistration,
  setUser,
} from '../reducers/userReducer';
import { ChangeModalAuth } from './controllerActions';

interface IRegistration {
  email: string;
  password: string;
  name: string;
  avatar: string | unknown;
}
export const registration = ({
  email,
  password,
  name,
  avatar,
}: IRegistration) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`${API_URL}/users`, {
        email,
        password,
        name,
        avatar,
      });

      const responseLogin = await axios.post(`${API_URL}/signin`, {
        email,
        password,
      });
      localStorage.setItem('token', responseLogin.data.token);
      localStorage.setItem('userId', responseLogin.data.userId);
      dispatch(setUser(responseLogin.data));
      dispatch(ChangeModalAuth());
    } catch (e) {
      dispatch(changeErrorRegistration(e.response.data.message));
    }
  };
};

interface ILogin {
  email: string;
  password: string;
}
export const login = ({ email, password }: ILogin) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      dispatch(setUser(response.data));
      dispatch(ChangeModalAuth());
    } catch (e) {
      dispatch(changeErrorLogin(true));
    }
  };
};

export const auth = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.setItem('token', response.data.token);
      dispatch(setUser(response.data.user));
    } catch (e) {
      localStorage.removeItem('token');
    }
  };
};
