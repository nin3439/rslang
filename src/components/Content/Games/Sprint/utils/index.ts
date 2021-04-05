export const showFirstCheckIcon = (numberConsecutiveRightAnswers: number) => {
  return (
    numberConsecutiveRightAnswers === 1 ||
    numberConsecutiveRightAnswers === 2 ||
    numberConsecutiveRightAnswers === 3 ||
    numberConsecutiveRightAnswers === 5 ||
    numberConsecutiveRightAnswers === 6 ||
    numberConsecutiveRightAnswers === 7 ||
    numberConsecutiveRightAnswers === 9 ||
    numberConsecutiveRightAnswers === 10 ||
    numberConsecutiveRightAnswers === 11
  );
};

export const showSecondCheckIcon = (numberConsecutiveRightAnswers: number) => {
  return (
    numberConsecutiveRightAnswers === 2 ||
    numberConsecutiveRightAnswers === 3 ||
    numberConsecutiveRightAnswers === 6 ||
    numberConsecutiveRightAnswers === 7 ||
    numberConsecutiveRightAnswers === 10 ||
    numberConsecutiveRightAnswers === 11
  );
};

export const showThirdCheckIcon = (numberConsecutiveRightAnswers: number) => {
  return (
    numberConsecutiveRightAnswers === 3 ||
    numberConsecutiveRightAnswers === 7 ||
    numberConsecutiveRightAnswers === 11
  );
};
