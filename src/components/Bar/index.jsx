import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Bar = (props) => {
  const { onClick, id, value } = props;

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const totalPixels = rect.width;
    const seekPosition = e.clientX - rect.left;
    onClick(seekPosition, totalPixels);
  };

  return (
    <Styled.BarControl>
      <Styled.BarActive id={id} value={value} />
      <Styled.BarFull onClick={handleSeek} />
    </Styled.BarControl>
  );
};

Bar.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  value: PropTypes.number,
};

Bar.defaultProps = {
  id: null,
  value: null,
};

export default Bar;
