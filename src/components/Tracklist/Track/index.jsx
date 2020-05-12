import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Styles
import StyledTrack from './style';
import * as Styled from '../style';
// Actions
import getTrack from '../../../actions/track';
// Utils
import { sec2time } from '../../../utils';

const Track = (props) => {
  const { track, playbackTime, onClick } = props;
  const dispatch = useDispatch();
  const activeTrackFileName = useSelector((state) => state.track.fileName);

  const handleClick = () => {
    if (activeTrackFileName === track.path && onClick) {
      onClick();
    } else {
      dispatch(getTrack(track.path));
    }
  };

  return (
    <StyledTrack onClick={handleClick}>
      <Styled.GridContainer active={activeTrackFileName === track.path}>
        <Styled.GridItem>{track.artist}</Styled.GridItem>
        <Styled.GridItem>{track.title}</Styled.GridItem>
        <Styled.GridItem>
          {activeTrackFileName === track.path
            ? sec2time(playbackTime)
            : sec2time(track.duration)}
        </Styled.GridItem>
      </Styled.GridContainer>
    </StyledTrack>
  );
};

Track.propTypes = {
  track: PropTypes.instanceOf(Object).isRequired,
  playbackTime: PropTypes.number,
  onClick: PropTypes.func,
};

Track.defaultProps = {
  playbackTime: 0,
  onClick: () => {},
};

export default Track;
