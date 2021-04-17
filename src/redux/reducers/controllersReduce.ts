import {
  CHANGE_NAME_MINIGAME,
  END_AUDIO_WORDS,
  PLAY_AUDIO_WORDS,
} from './../constants';
import { CHANGE_MODAL_AUTH } from 'redux/constants';

const initialState = {
  isModalActive: false,
  nameMiniGame: 'sprint',
  isPlayAudio: false,
  audioWord: '',
  audioMeaning: '',
  audioExample: '',
};

interface IAction {
  type: string;
  payload?: any;
}

export const controllers = (state = initialState, action: IAction) => {
  switch (action.type) {
    case CHANGE_MODAL_AUTH:
      return { ...state, isModalActive: !state.isModalActive };
    case CHANGE_NAME_MINIGAME:
      return { ...state, nameMiniGame: action.payload };
    case PLAY_AUDIO_WORDS: {
      return {
        ...state,
        isPlayAudio: true,
        audioWord: action.payload.words,
        audioMeaning: action.payload.meaning,
        audioExample: action.payload.example,
      };
    }
    case END_AUDIO_WORDS: {
      return {
        ...state,
        isPlayAudio: false,
        audioWord: '',
        audioMeaning: '',
        audioExample: '',
      };
    }
    default:
      return state;
  }
};
