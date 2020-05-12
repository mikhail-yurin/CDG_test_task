import { GET_TRACKLIST_SUCCESS } from '../actions/tracklist';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_TRACKLIST_SUCCESS:
      return [...state, ...action.data.tracks];

    default:
      return state;
  }
};
