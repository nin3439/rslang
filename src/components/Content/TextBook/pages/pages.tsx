import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import {
  getAuthWords,
  getWords,
  updateWord,
} from 'redux/actions/actionTextbook';
import {
  IPropsLoadWordsAuth,
  IStatePage,
  IWord,
  IPropsLoadWords,
  IPropsUpdate,
  IOptions,
} from 'types';
import { Page } from 'components/Content/TextBook/pages/page/page';
import { GAMES } from 'constants/games';

const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

const StyledNavLinkLeft = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const StyledNavLinkRight = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledCard = styled(Card)`
  &.MuiCard-root {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transform: scale(1);
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

interface IPagesProps {
  currentWords: IWord[];
  getWords: (value: IPropsLoadWords) => void;
  updateWord: (
    body: IPropsUpdate,
    idWord: string,
    method: 'post' | 'put',
    numberGroup: IPropsLoadWords
  ) => void;
  getAuthWords: (value: IPropsLoadWordsAuth) => void;
  isAuth: boolean;
  options: IOptions;
}
const Pages = ({
  currentWords,
  getWords,
  updateWord,
  isAuth,
  getAuthWords,
  options,
}: IPagesProps) => {
  const numberGroup: IPropsLoadWords = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (isAuth) {
      const userId = localStorage.getItem('userId') || '';
      getAuthWords({ userId, ...numberGroup });
    } else {
      getWords(numberGroup);
    }
  }, [currentPage, getWords, numberGroup, isAuth, getAuthWords]);

  const changeGroupBG = () => {
    switch (numberGroup.groupNumber) {
      case '0':
        return '#ff00002b';
      case '1':
        return '#0080001f';
      case '2':
        return '#ffff0026';
      case '3':
        return '#0000ff30';
      case '4':
        return '#a52a2a40';
      case '5':
        return '#ee82ee52';
      default:
        return 'white';
    }
  };
  return (
    <>
      {currentWords.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <NavLink
            to={`./${currentPage - 1}`}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
              }
            }}
          >
            <StyledNavLinkLeft style={{ background: `${changeGroupBG()}` }}>
              <StyledIconButton size="medium">
                <ArrowBackIcon />
              </StyledIconButton>
            </StyledNavLinkLeft>
          </NavLink>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Page
              words={currentWords}
              options={options}
              updateWord={updateWord}
              numberGroup={numberGroup}
            />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {GAMES.map(({ name, path, background }) => (
                <Grid item key={name} style={{ margin: '10px' }}>
                  <StyledLink
                    to={`${path}/textbook/${numberGroup.groupNumber}/${numberGroup.pageNumber}`}
                  >
                    <StyledCard
                      style={{
                        background: `url(${background})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          style={{
                            color: '#FFF',
                            textAlign: 'center',
                          }}
                        >
                          {name}
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </StyledLink>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="h3"
              style={{
                color: '#ccc',
                textAlign: 'center',
              }}
            >
              {currentPage}
            </Typography>
          </div>

          <NavLink
            to={`./${currentPage === 30 ? 29 : currentPage}`}
            onClick={() => {
              if (currentPage < 30) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
          >
            <StyledNavLinkRight style={{ background: `${changeGroupBG()}` }}>
              <StyledIconButton size="medium">
                <ArrowForwardIcon />
              </StyledIconButton>
            </StyledNavLinkRight>
          </NavLink>
        </div>
      ) : (
        '?????????????? ?????????? ?????? ??????????'
      )}
    </>
  );
};

const MapStateToProps = (
  state: IStatePage,
  ownProps: { options: IOptions }
) => {
  return {
    currentWords: state.textbook.currentWords,
    isAuth: state.userReducer.isAuth,
    options: ownProps.options,
  };
};

export default connect(MapStateToProps, { getWords, updateWord, getAuthWords })(
  Pages
);
