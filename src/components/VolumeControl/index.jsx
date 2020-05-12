import React from 'react';
import PropTypes from 'prop-types';
import Bar from '../Bar';
import * as Styled from './style';

const VolumeControl = (props) => {
  const { onClick, id, volume } = props;

  // TODO: set icon for mute
  return (
    <Styled.Volume>
      <Styled.Icon className={0 ? 'fa fa-volume-off' : 'fa fa-volume-up'} />
      <Bar onClick={onClick} id={id} value={volume} />
    </Styled.Volume>
  );
};

VolumeControl.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
};

export default VolumeControl;
