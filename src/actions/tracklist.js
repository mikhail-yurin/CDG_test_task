// Action types
export const GET_TRACKLIST_PENDING = 'GET_TRACKLIST_PENDING';
export const GET_TRACKLIST_SUCCESS = 'GET_TRACKLIST_SUCCESS';
export const GET_TRACKLIST_FAILURE = 'GET_TRACKLIST_FAILURE';

// Action creators
export const getTracklistPending = () => ({ type: GET_TRACKLIST_PENDING });
export const getTracklistSuccess = (data) => ({ type: GET_TRACKLIST_SUCCESS, data });
export const getTracklistFailure = (error) => ({ type: GET_TRACKLIST_FAILURE, error });

// Get list of tracks
export default () => (dispatch) => {
  dispatch(getTracklistPending());

  fetch('/tracklist')
    .then(
      (response) => response.json(),
      (error) => dispatch(getTracklistFailure(error)),
    )
    .then((json) => dispatch(getTracklistSuccess(json)))
    .catch((error) => dispatch(getTracklistFailure(error)));
};
