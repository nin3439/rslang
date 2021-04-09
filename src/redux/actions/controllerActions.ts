import { CHANGE_NAME_MINIGAME, CHANGE_MODAL_AUTH } from 'redux/constants';

export const changeModalAuth = () => ({ type: CHANGE_MODAL_AUTH });

export const changeNameMiniGame = (name: string) => ({
  type: CHANGE_NAME_MINIGAME,
  payload: name,
});
