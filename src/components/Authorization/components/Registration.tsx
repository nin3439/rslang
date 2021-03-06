import { useState } from 'react';
import { registration } from 'redux/actions/user';
import styled from 'styled-components';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { BigLoader } from './BigLoader';
import { IRegistrationProps } from 'types';

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

const Registration: React.FC<IRegistrationProps> = ({
  registration,
  uploadUserAvatar,
  avatar,
  showLoader,
  setShowLoader,
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
      <InputBlock
        onSubmit={() => {
          setShowLoader(!showLoader);
          registration({ name, email, password, avatar });
        }}
      >
        <ElementBlock>
          <StyledInputLabel>?????? ????????????????????????</StyledInputLabel>
          <StyledOutlinedInput
            color="secondary"
            placeholder="?????????????? ??????"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required={true}
            inputProps={{ minLength: 2 }}
          />
        </ElementBlock>
        <ElementBlock>
          <StyledInputLabel>?????????? ?????????????????????? ??????????</StyledInputLabel>
          <StyledOutlinedInput
            color="secondary"
            placeholder="?????????????? ?????????? ??????????"
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
          <StyledInputLabel>????????????</StyledInputLabel>
          <StyledOutlinedInput
            type={showPassword ? 'text' : 'password'}
            placeholder="?????????????? ????????????"
            color="secondary"
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
        <ElementBlock>
          <StyledInputLabel>?????????????????? ????????????</StyledInputLabel>
          <InputFile
            placeholder="Upload avatar"
            type="file"
            onChange={(e: any) => {
              uploadUserAvatar(e);
            }}
          />
        </ElementBlock>
        <Button type="submit">????????????????????????????????????</Button>
      </InputBlock>
      {showLoader ? <BigLoader /> : null}
    </MenuBlock>
  );
};
const mapStateToProps = (state: any) => {
  return {};
};
export default connect(mapStateToProps, { registration })(Registration);
