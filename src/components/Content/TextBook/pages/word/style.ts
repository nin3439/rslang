import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const StyledPage = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-content: space-around;
  margin: 0 10px 10px 10px;
`;
export const StyledImg = styled.img`
  width: 300px;
  object-fit: scale-down;
  border: ${({ theme }) => theme.borderWordImage};
`;
export const StyledWords = styled.div`
  width: 70%;
  min-heih
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const StyleWord = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;
`;
export const StyleButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.text};
`;
