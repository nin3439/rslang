import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';
import { IWord, IPropsUpdate } from 'types';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { updateWord } from 'redux/actions/actionTextbook';

const StyledGrid = styled(Grid)`
  height: 300px;
  overflow: auto;
  padding-left: 15px;
  &::-webkit-scrollbar-thumb {
    background-color: #37516a;
    border-radius: 10px;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 10px;
  }
`;

const StyledVolumeUp = styled(VolumeUp)`
  width: 20px;
  margin-right: 10px;
  transform: scale(1);
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 0.5s;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  background: #f8f2ee;
  width: 400px;
`;

const StyledTypography = styled(Typography)`
  color: #37516a;
`;

const StyledSpan = styled.span`
  color: #fff;
  border-radius: 16px;
  padding: 2px 15px;
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    margin: 5px 20px;
    background: #37516a;
    color: #fff;
    transform: scale(1);
    transition: all 0.5s;
    &:hover {
      background: #37516a;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

interface IParams {
  link: string;
  groupNumber: string;
  pageNumber: string;
}

interface IResultsProps {
  isResultsShow: boolean;
  setIsResultsShow: (isResultsShow: boolean) => void;
  wrongAnswers: (IWord | null)[];
  rightAnswers: (IWord | null)[];
  setWrongAnswers: (wrongAnswers: (IWord | null)[]) => void;
  setRightAnswers: (rightAnswers: (IWord | null)[]) => void;
  score?: number;
  setScore?: (score: number) => void;
  nameMiniGame: string;
  isAuth: boolean;
  updateWord: (
    body: IPropsUpdate,
    idWord: string,
    method: 'post' | 'put',
    numberGroup: any
  ) => void;
}

const Results: React.FC<IResultsProps> = ({
  isResultsShow,
  setIsResultsShow,
  score,
  setScore,
  wrongAnswers,
  rightAnswers,
  setRightAnswers,
  setWrongAnswers,
  nameMiniGame,
  updateWord,
  isAuth,
}) => {
  const params: IParams = useParams();
  const playEnglishWord = (name: string | undefined) => {
    const audio = new Audio();
    audio.src = `https://dream-react-rslang-server.herokuapp.com/${name}`;
    audio.play();
  };

  useEffect(() => {
    if (isAuth && params.link) {
      const allLearnWords = [...rightAnswers, ...wrongAnswers];
      allLearnWords.forEach((learnWord: IWord | null) => {
        const body = {
          optional: {
            isLearn: true,
          },
        };
        const method = learnWord?.userWord ? 'put' : 'post';
        return (
          learnWord &&
          updateWord(body, learnWord?._id, method, learnWord?.group)
        );
      });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Dialog onClose={() => setIsResultsShow(false)} open={isResultsShow}>
      <StyledDialogContent dividers>
        <Grid container direction="column" alignItems="center" justify="center">
          <StyledTypography
            gutterBottom
            variant="h3"
            style={{ fontWeight: 'bold' }}
          >
            Результаты
          </StyledTypography>
          {nameMiniGame === 'sprint' && (
            <StyledTypography gutterBottom variant="h5">
              Вы набрали <span style={{ color: '#11a911' }}>{score}</span>{' '}
              очков.
            </StyledTypography>
          )}
        </Grid>
      </StyledDialogContent>
      <StyledDialogContent dividers>
        <StyledGrid>
          <StyledTypography gutterBottom variant="h5">
            Я знаю{' '}
            <StyledSpan style={{ background: '#11a911' }}>
              {rightAnswers.length}
            </StyledSpan>
          </StyledTypography>
          {rightAnswers.map((rightAnswer) => {
            return (
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
                key={rightAnswer?.word}
              >
                <StyledVolumeUp
                  onClick={() => playEnglishWord(rightAnswer?.audio)}
                  style={{
                    color: '#11a911',
                  }}
                />
                <StyledTypography
                  variant="subtitle1"
                  style={{ letterSpacing: 1 }}
                >
                  {rightAnswer?.word} -{' '}
                  {nameMiniGame === 'sprint'
                    ? rightAnswer?.wordTranslate[0]
                    : rightAnswer?.wordTranslate}{' '}
                </StyledTypography>
              </Grid>
            );
          })}
          <StyledTypography
            gutterBottom
            variant="h5"
            style={{ marginTop: '10px' }}
          >
            Я не знаю{' '}
            <StyledSpan style={{ background: '#f13434' }}>
              {wrongAnswers.length}
            </StyledSpan>
          </StyledTypography>
          {wrongAnswers.map((wrongAnswer) => {
            return (
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
                key={wrongAnswer?.word}
              >
                <StyledVolumeUp
                  onClick={() => playEnglishWord(wrongAnswer?.audio)}
                  style={{
                    color: '#f13434',
                  }}
                />
                <StyledTypography
                  variant="subtitle1"
                  style={{ letterSpacing: 1 }}
                >
                  {wrongAnswer?.word} -{' '}
                  {nameMiniGame === 'sprint'
                    ? wrongAnswer?.wordTranslate[0]
                    : wrongAnswer?.wordTranslate}{' '}
                </StyledTypography>
              </Grid>
            );
          })}
        </StyledGrid>
      </StyledDialogContent>
      <DialogActions style={{ background: '#f8f2ee' }}>
        <StyledButton
          autoFocus
          variant="contained"
          onClick={() => {
            setIsResultsShow(false);
            if (setScore) {
              setScore(0);
            }
            setRightAnswers([]);
            setWrongAnswers([]);
          }}
        >
          Закрыть
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: any) => ({
  nameMiniGame: state.controllers.nameMiniGame,
  isAuth: state.userReducer.isAuth,
});

export default connect(mapStateToProps, { updateWord })(Results);
