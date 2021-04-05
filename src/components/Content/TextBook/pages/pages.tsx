import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import getWords from '../../../../redux/actions/actionTextbook';
import { IPropsLoadWords, IStatePage, IWord } from '../../../../types';
import { Page } from './page/page';
interface IPagesProps {
  currentWords: IWord[];
  getWords: (value: IPropsLoadWords) => void;
}
const Pages = ({ currentWords, getWords }: IPagesProps) => {
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
            <div
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
              }}
            >
              prev
            </div>
          </NavLink>
          This is Page <Page words={currentWords} />
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
  };
};

export default connect(MapStateToProps, { getWords })(Pages);
