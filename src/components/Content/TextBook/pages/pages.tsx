import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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
const StyledNavLink = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
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
  return (
    <>
      {currentWords.length > 0 ? (
        <div>
          <StyledNavLink>
            <NavLink
              to={`./${currentPage - 1}`}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
            >
              <StyledIconButton size="medium">
                <ArrowBackIosIcon />
              </StyledIconButton>
            </NavLink>
            <NavLink
              to={`./${currentPage === 30 ? 29 : currentPage}`}
              onClick={() => {
                if (currentPage < 30) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            >
              <StyledIconButton size="medium">
                <ArrowForwardIosIcon />
              </StyledIconButton>
            </NavLink>
          </StyledNavLink>

          <Page
            words={currentWords}
            options={options}
            updateWord={updateWord}
            numberGroup={numberGroup}
          />
          <Grid container direction="row" justify="center" alignItems="center">
            {GAMES.map(({ name, path, background }) => (
              <Grid item key={name} style={{ margin: '10px' }}>
                <Link
                  to={`${path}/textbook/${numberGroup.groupNumber}/${numberGroup.pageNumber}`}
                >
                  <Card
                    style={{
                      width: '200px',
                      height: '200px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%',
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
                  </Card>
                </Link>
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
      ) : (
        'Вернись назад тут пусто'
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
