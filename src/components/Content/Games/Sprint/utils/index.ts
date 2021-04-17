import { PAGE_NUMBER } from 'constants/pageNumber';
const inRange = require('lodash.inrange');

export const showFirstCheckIcon = (numberConsecutiveRightAnswers: number) => {
  return [1, 2, 3, 5, 6, 7, 9, 10, 11].includes(numberConsecutiveRightAnswers);
};

export const showSecondCheckIcon = (numberConsecutiveRightAnswers: number) => {
  return [2, 3, 6, 7, 10, 11].includes(numberConsecutiveRightAnswers);
};

export const showThirdCheckIcon = (numberConsecutiveRightAnswers: number) => {
  return [3, 7, 11].includes(numberConsecutiveRightAnswers);
};

export const getRandomPageNumber = () =>
  Math.floor(Math.random() * PAGE_NUMBER);

export const getHeaderColor = (number: string) => {
  const yellow = inRange(+number, 4, 8);
  const orange = inRange(+number, 8, 12);
  const pink = +number > 11;
  if (yellow) {
    return '#fccc00';
  }
  if (orange) {
    return 'orange';
  }
  if (pink) {
    return '#ff8da2';
  }
  return 'transparent';
};
