import styled from 'styled-components';
import { AppBar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

export const PopUpMenu = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

export const PopUpMenuInner = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 5%;
  bottom: 5%;
  margin: auto;
  background: ${({ theme }) => theme.menu};
  text-align: justify;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  @media (max-width: 800px) {
    left: 5%;
    right: 5%;
    top: 5%;
    bottom: 5%;
`;

export const TabsBlock = styled.div`
  width: 100%;
  height: 100%;
`;

export const Button = styled(IconButton)`
  position: absolute;
  right: 0;
  cursor: pointer;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #f3727b;
  color: #fff;
  border: 0;
  width: 48px;
  height: 48px;
  border-radius: 0px;

  &:hover {
    background-color: #f3727b;
  }
`;

export const StyledAppBar = styled(AppBar)`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.body};
`;
