import { useState } from 'react';
import Input from '../../../utils/Input';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/user';
import styled from 'styled-components';

const MenuBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #f3727b;
  color: #fff;
  border: 0;
  border-radius: 10px;
  width: 150px;
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
    width: 149px;
    heigth: 49px;
  }
`;

const Login = ({ login }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <MenuBlock>
      <div>Авторизация</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль..."
      />
      <Button
        onClick={() => {
          login({ email, password });
        }}
      >
        Войти
      </Button>
    </MenuBlock>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};
export default connect(mapStateToProps, { login })(Login);
