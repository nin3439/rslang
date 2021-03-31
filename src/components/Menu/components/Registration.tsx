import { useState } from 'react';
import Input from '../../../utils/Input';
import { registration } from '../../../redux/actions/user';
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
  width: 250px;
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
    width: 249px;
    heigth: 49px;
  }
`;

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <MenuBlock>
      <div>Регистрация</div>
      <Input
        value={name}
        setValue={setName}
        type="text"
        placeholder="Введите имя..."
      />
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
      <Button onClick={() => registration({ name, email, password })}>
        Зарегистрироваться
      </Button>
    </MenuBlock>
  );
};

export default Registration;
