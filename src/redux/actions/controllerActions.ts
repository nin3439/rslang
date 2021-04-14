import {
  CHANGE_NAME_MINIGAME,
  CHANGE_MODAL_AUTH,
  PLAY_AUDIO_WORDS,
  END_AUDIO_WORDS,
} from 'redux/constants';
import { IPayloadAudio } from 'redux/types';

export const changeModalAuth = () => ({ type: CHANGE_MODAL_AUTH });

export const changeNameMiniGame = (name: string) => ({
  type: CHANGE_NAME_MINIGAME,
  payload: name,
});

export const playAudioWord = (payload: IPayloadAudio) => ({
  type: PLAY_AUDIO_WORDS,
  payload,
});
export const endAudioWord = () => ({ type: END_AUDIO_WORDS });
