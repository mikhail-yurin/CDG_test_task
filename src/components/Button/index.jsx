import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './style';

export const buttonType = {
  play: 'play',
  pause: 'pause',
  backward: 'backward',
  forward: 'forward',
};

const Button = ({ type, onClick }) => {
  let buttonClass;
  switch (type) {
    case buttonType.play:
      buttonClass = 'fa fa-play';
      break;

    case buttonType.pause:
      buttonClass = 'fa fa-pause';
      break;

    case buttonType.backward:
      buttonClass = 'fa fa-step-backward';
      break;

    case buttonType.forward:
      buttonClass = 'fa fa-step-forward';
      break;

    default:
      break;
  }

  return (
    <StyledButton type="button" onClick={onClick}>
      <i className={buttonClass} />
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
