import { combineReducers } from 'redux';
import tracklistReducer from './tracklist';
import trackReducer from './track';

export default combineReducers({
  trackList: tracklistReducer,
  track: trackReducer,
});
