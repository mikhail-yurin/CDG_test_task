import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const SearchForm = (props) => {
  const { onSearch } = props;

  const handleInput = (e) => {
    const input = e.target.value;
    if (onSearch) {
      onSearch(input);
    }
  };

  return (
    <Styled.Search>
      <Styled.Input
        type="text"
        placeholder="Enter at least 3 symbols to search..."
        onChange={handleInput}
      />
    </Styled.Search>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func,
};

SearchForm.defaultProps = {
  onSearch: () => { },
};

export default SearchForm;
