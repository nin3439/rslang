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

const Button = styled(IconButton)`
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

  &:hover {
    background-color: #f3727b;
  }
`;

const InputFile = styled.input`
  margin-bottom: 10px;
`;

const ElementBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InputBlock = styled.div`
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
          <StyledInputLabel>Имя пользователя</StyledInputLabel>
          <StyledOutlinedInput
            color="secondary"
            placeholder="Введите имя"
            style={{ height: '50px' }}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </ElementBlock>
        <ElementBlock>
          <StyledInputLabel>Адрес электронной почты</StyledInputLabel>
          <StyledOutlinedInput
            color="secondary"
            placeholder="Введите адрес почты"
            style={{ height: '50px' }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </ElementBlock>
        <ElementBlock>
          <StyledInputLabel>Пароль</StyledInputLabel>
          <StyledOutlinedInput
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            style={{ height: '50px' }}
            color="secondary"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
        <ElementBlock>
          <StyledInputLabel>Загрузить аватар</StyledInputLabel>
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
