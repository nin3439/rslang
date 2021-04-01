import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  IconButton,
  Select,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 50px 0 40px;
`;

const StyledLink = styled(Link)`
  transform: scale(1);
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.3);
    transition: transform 0.5s;
  }
`;

const StyledButton = styled(Button)`
  transform: scale(1);
  transition: all 0.5s;
  &:hover {
    transform: scale(1.2);
    transition: transform 0.5s;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  width: 40vw;
  height: 40vh;
  &.MuiPaper-root {
    background-color: #ffd6cfb0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

interface IPageProps {
  setIsGameStart: (isGameStart: boolean) => void;
  level: number;
  setLevel: (level: number) => void;
}

export const InitialPage: React.FC<IPageProps> = ({
  setIsGameStart,
  level,
  setLevel,
}) => {
  const changeLevel = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel(event.target.value as number);
  };

  return (
    <Grid>
      <StyledGrid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <StyledLink to="/games">
          <IconButton style={{ color: '#fff' }}>
            <Close />
          </IconButton>
        </StyledLink>

        <FormControl style={{ color: '#fff' }}>
          <Select
            value={level}
            onChange={changeLevel}
            style={{ color: '#fff', width: '120px' }}
          >
            <MenuItem value={0} selected>
              Уровень 1
            </MenuItem>
            <MenuItem value={1}>Уровень 2</MenuItem>
            <MenuItem value={2}>Уровень 3</MenuItem>
            <MenuItem value={3}>Уровень 4</MenuItem>
            <MenuItem value={4}>Уровень 5</MenuItem>
            <MenuItem value={5}>Уровень 6</MenuItem>
          </Select>
        </FormControl>
      </StyledGrid>
      <StyledPaper>
        <Typography variant="h3">Спринт</Typography>
        <Typography variant="h5" align="center">
          Выберите соответсвует ли перевод предложенному слову
        </Typography>
        <StyledButton variant="outlined" onClick={() => setIsGameStart(true)}>
          Начать
        </StyledButton>
      </StyledPaper>
    </Grid>
  );
};
