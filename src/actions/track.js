// Action types
export const GET_TRACK_PENDING = 'GET_TRACK_PENDING';
export const GET_TRACK_SUCCESS = 'GET_TRACK_SUCCESS';
export const GET_TRACK_FAILURE = 'GET_TRACK_FAILURE';

// Action creators
export const getTrackPending = () => ({ type: GET_TRACK_PENDING });
export const getTrackSuccess = (data, fileName) => ({ type: GET_TRACK_SUCCESS, data, fileName });
export const getTrackFailure = (error) => ({ type: GET_TRACK_FAILURE, error });

// Get list of tracks
export default (fileName) => (dispatch) => {
  dispatch(getTrackPending());

  fetch(`/sounds/${fileName}`)
    .then(
      (response) => response.arrayBuffer(),
      (error) => dispatch(getTrackFailure(error)),
    )
    .then((buffer) => dispatch(getTrackSuccess(buffer, fileName)));
};
