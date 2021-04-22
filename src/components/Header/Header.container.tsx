import { IStatePage } from '../../types';
import { changeModalAuth, endAudioWord } from 'redux/actions/controllerActions';
import { logout } from 'redux/reducers/userReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state: IStatePage) => ({
  isModalActive: state.controllers.isModalActive,
  isAuth: state.userReducer.isAuth,
  userAvatar: state.userReducer.currentUser.avatar,
  isPlayAudio: state.controllers.isPlayAudio,
  audioWord: state.controllers.audioWord,
  audioMeaning: state.controllers.audioMeaning,
  audioExample: state.controllers.audioExample,
});

const mapDispatchToProps = {
  changeModalAuth: changeModalAuth,
  logout: logout,
  endAudioWord: endAudioWord,
};

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps);
