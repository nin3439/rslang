const initialState = {
  isModalActive: false,
};
interface IAction {
  type: string;
}
export const CHANGE_MODAL_AUTH = 'CHANGE_MODAL_AUTH';
export const controllers = (state = initialState, action: IAction) => {
  switch (action.type) {
    case CHANGE_MODAL_AUTH:
      return { ...state, isModalActive: !state.isModalActive };
    default:
      return state;
  }
};
