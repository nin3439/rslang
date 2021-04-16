import styled from 'styled-components';
import { Button } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import { IconButton } from '@material-ui/core';

export const StyledImg = styled.img`
  width: 300px;
  object-fit: scale-down;
  border: ${({ theme }) => theme.borderWordImage};
  @media (max-width: 800px) {
    width: 95%;
  }
`;

export const StyleButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.text};
`;

export const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const TeamCard = styled(Card)`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.cardTextbook};
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 70%;
  }
`;

export const TeamCardActionArea = styled(CardActionArea)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;
