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
import { BigLoader } from './BigLoader';
import { ILoginProps } from '../../../types';

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

const Button = styled(IconButton)`
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
  margin-top: 10px;
  width: 150px;
  height: 50px;

  &:hover {
    background-color: #f3727b;
  }
`;

const InputBlock = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledInputLabel = styled(InputLabel)`
  color: ${({ theme }) => theme.text};
`;

const StyledOutlinedInput = styled(OutlinedInput)`
  height: '50px';
  color: ${({ theme }) => theme.text};
`;

const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

const Login: React.FC<ILoginProps> = ({
  login,
  isAuth,
  showLoader,
  setShowLoader,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <MenuBlock>
      <InputBlock
        onSubmit={() => {
          setShowLoader(!showLoader);
          login({ email, password });
        }}
      >
        <ElementBlock>
          <StyledInputLabel>Адрес электронной почты</StyledInputLabel>
          <StyledOutlinedInput
            color="secondary"
            placeholder="Введите адрес почты"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required={true}
            inputProps={{
              minLength: 2,
              pattern: '^\\w+@(\\w+.+\\w)$',
            }}
          />
        </ElementBlock>
        <ElementBlock>
          <StyledInputLabel>Пароль</StyledInputLabel>
          <StyledOutlinedInput
            type={showPassword ? 'text' : 'password'}
            color="secondary"
            placeholder="Введите пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required={true}
            inputProps={{
              minLength: 8,
              maxLength: 20,
            }}
            endAdornment={
              <InputAdornment position="end">
                <StyledIconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </StyledIconButton>
              </InputAdornment>
            }
          />
        </ElementBlock>
        <Button type="submit">Войти</Button>
      </InputBlock>
      {showLoader ? <BigLoader /> : null}
    </MenuBlock>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};
export default connect(mapStateToProps, { login })(Login);
