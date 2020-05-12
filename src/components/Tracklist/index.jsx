import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Track from './Track';
import Search from '../Search';
import * as Styled from './style';

const TrackList = (props) => {
  const { playbackTime, onClick } = props;
  const trackList = useSelector((state) => state.trackList);

  const [searchText, setSearchText] = useState(null);

  const handleSearch = (input) => {
    if (input && input.length >= 3) {
      setSearchText(input.toLowerCase());
    } else {
      setSearchText(null);
    }
  };

  const filteredList = !searchText ? trackList : trackList.filter(
    (track) => track.artist.toLowerCase().includes(searchText)
      || track.title.toLowerCase().includes(searchText),
  );

  return (
    <Styled.List>
      {filteredList
        ? (
          <>
            <Search onSearch={handleSearch} />
            <Styled.Head>
              <Styled.GridContainer>
                <Styled.GridItem>Artist</Styled.GridItem>
                <Styled.GridItem>Title</Styled.GridItem>
                <Styled.GridItem>Duration</Styled.GridItem>
              </Styled.GridContainer>
            </Styled.Head>
            {filteredList.map((currentTrack) => (
              <Track
                track={currentTrack}
                key={currentTrack.path}
                playbackTime={playbackTime}
                onClick={onClick}
              />
            ))}
          </>
        )
        : (<Styled.Alert>Playlist is loading, wait please...</Styled.Alert>)}
    </Styled.List>
  );
};

TrackList.propTypes = {
  playbackTime: PropTypes.number,
  onClick: PropTypes.func,
};

TrackList.defaultProps = {
  playbackTime: 0,
  onClick: () => { },
};

export default TrackList;
