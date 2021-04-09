import { CHANGE_NAME_MINIGAME } from './../constants';
import { CHANGE_MODAL_AUTH } from 'redux/constants';

const initialState = {
  isModalActive: false,
  nameMiniGame: 'sprint',
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
    default:
      return state;
  }
};
