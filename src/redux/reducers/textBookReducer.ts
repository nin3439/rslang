import { IActionWords } from '../../types';
import { LOAD_WORDS } from '../constants';

const initialState = {
  currentWords: [{}],
};

export const textbook = (state = initialState, action: IActionWords) => {
  switch (action.type) {
    case LOAD_WORDS: {
      const states = state;
      return { ...state, currentWords: [...action.words] };
    }
    default: {
      return state;
    }
  }
};
