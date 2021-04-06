import { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/user';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const MenuBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ElementBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  margin-top: 30px;
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
  align-self: center;

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

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Login = ({ login }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <MenuBlock>
      <InputBlock>
        <ElementBlock>
          <InputLabel>Адрес электронной почты</InputLabel>
          <OutlinedInput
            color="secondary"
            placeholder="Введите адрес почты"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </ElementBlock>
        <ElementBlock>
          <InputLabel>Пароль</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            color="secondary"
            placeholder="Введите пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </ElementBlock>
        <Button
          onClick={() => {
            login({ email, password });
          }}
        >
          Войти
        </Button>
      </InputBlock>
    </MenuBlock>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};
export default connect(mapStateToProps, { login })(Login);
