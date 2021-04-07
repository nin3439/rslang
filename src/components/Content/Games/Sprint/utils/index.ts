import { PAGE_NUMBER } from 'constants/pageNumber';

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
