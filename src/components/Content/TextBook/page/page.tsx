import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import getWords from '../../../../redux/actions/actionTextbook';
import { IStatePage } from '../../../../types';

const Page = ({ currentWords, getWords }: any) => {
  const path = useRouteMatch();
  const numberGroup = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getWords(numberGroup);
  }, [currentPage, numberGroup]);

  return (
    <div>
      <NavLink to={`${path}/page${currentPage - 1}`}>prev</NavLink>This is Page{' '}
      <NavLink to={`${path}/page${currentPage + 1}`}>next</NavLink>
    </div>
  );
};

const MapStateToProps = (state: IStatePage) => {
  return {
    currentWords: state.textbook.currentWords,
  };
};

export default connect(MapStateToProps, { getWords })(Page);
