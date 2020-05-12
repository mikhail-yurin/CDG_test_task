import {
  GET_TRACK_SUCCESS,
  GET_TRACK_PENDING,
  GET_TRACK_FAILURE,
} from '../actions/track';

const defaultState = {
  isPlaying: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_TRACK_PENDING:
      return { ...state, data: action.data, isLoading: true };
    case GET_TRACK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        fileName: action.fileName,
      };
    case GET_TRACK_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
