import { useState } from 'react';
import { registration } from '../../../redux/actions/user';
import styled from 'styled-components';
import { connect } from 'react-redux';
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
  margin-top: 10px;
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

const InputFile = styled.input`
  margin-bottom: 10px;
`;

const ElementBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Registration: React.FC<any> = ({
  registration,
  uploadUserAvatar,
  avatar,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <MenuBlock>
      <InputBlock>
        <ElementBlock>
          <InputLabel>Имя пользователя</InputLabel>
          <OutlinedInput
            color="secondary"
            placeholder="Введите имя"
            style={{ height: '50px' }}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </ElementBlock>
        <ElementBlock>
          <InputLabel>Адрес электронной почты</InputLabel>
          <OutlinedInput
            color="secondary"
            placeholder="Введите адрес почты"
            style={{ height: '50px' }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </ElementBlock>
        <ElementBlock>
          <InputLabel>Пароль</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            style={{ height: '50px' }}
            color="secondary"
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
        <ElementBlock>
          <InputLabel>Загрузить аватар</InputLabel>
          <InputFile
            placeholder="Upload avatar"
            type="file"
            onChange={(e: any) => {
              uploadUserAvatar(e);
            }}
          />
        </ElementBlock>
      </InputBlock>
      <Button
        onClick={() => {
          registration({ name, email, password, avatar });
        }}
      >
        Зарегистрироваться
      </Button>
    </MenuBlock>
  );
};
const mapStateToProps = (state: any) => {
  return {};
};
export default connect(mapStateToProps, { registration })(Registration);
