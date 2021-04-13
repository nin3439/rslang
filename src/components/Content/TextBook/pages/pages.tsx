import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { getWords } from 'redux/actions/actionTextbook';
import { IPropsLoadWords, IStatePage, IWord } from 'types';
import { Page } from './page/page';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

interface IPagesProps {
  currentWords: IWord[];
  getWords: (value: IPropsLoadWords) => void;
  options: any;
}
const Pages = ({ currentWords, getWords, options }: IPagesProps) => {
  const numberGroup: IPropsLoadWords = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getWords(numberGroup);
  }, [currentPage, getWords, numberGroup]);
  return (
    <>
      {currentWords.length > 1 ? (
        <div>
          <NavLink to={`./${currentPage - 1}`}>
            <StyledIconButton
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
              }}
            >
              <ArrowBackIosIcon />
            </StyledIconButton>
          </NavLink>
          <Page words={currentWords} options={options} />
          <NavLink to={`./${currentPage + 1}`}>
            <StyledIconButton
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
            >
              <ArrowForwardIosIcon />
            </StyledIconButton>
          </NavLink>
        </div>
      ) : null}
    </>
  );
};

const MapStateToProps = (state: IStatePage) => {
  return {
    currentWords: state.textbook.currentWords,
  };
};

export default connect(MapStateToProps, { getWords })(Pages);
