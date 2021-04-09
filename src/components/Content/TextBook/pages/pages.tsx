import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
  getAuthWords,
  getWords,
  updateWord,
} from 'redux/actions/actionTextbook';
import {
  IPropsLoadWordsAuth,
  IStatePage,
  IUpdateWord,
  IWord,
  IPropsLoadWords,
} from 'types';
import { Page } from 'components/Content/TextBook/pages/page/page';

interface IPagesProps {
  currentWords: IWord[];
  getWords: (value: IPropsLoadWords) => void;
  updateWord: (body: IUpdateWord, idWord: string) => void;
  getAuthWords: (value: IPropsLoadWordsAuth) => void;
  isAuth: boolean;
}
const Pages = ({
  currentWords,
  getWords,
  updateWord,
  isAuth,
  getAuthWords,
}: IPagesProps) => {
  const numberGroup: IPropsLoadWords = useParams();
  const [currentPage, setCurrentPage] = useState(0);
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
      {currentWords.length > 1 ? (
        <div>
          <NavLink to={`./${currentPage - 1}`}>
            <div
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
              }}
            >
              prev
            </div>
          </NavLink>
          This is Page <Page words={currentWords} updateWord={updateWord} />
          <NavLink to={`./${currentPage + 1}`}>
            <div
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
            >
              next
            </div>
          </NavLink>
        </div>
      ) : null}
    </>
  );
};

const MapStateToProps = (state: IStatePage) => {
  return {
    currentWords: state.textbook.currentWords,
    isAuth: state.userReducer.isAuth,
  };
};

export default connect(MapStateToProps, { getWords, updateWord, getAuthWords })(
  Pages
);
