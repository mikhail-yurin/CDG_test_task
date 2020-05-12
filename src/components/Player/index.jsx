/* eslint-disable object-curly-newline */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// UI
import Bar from '../Bar';
import Button, { buttonType } from '../Button';
import VolumeControl from '../VolumeControl';
import Tracklist from '../Tracklist';
// Actions
import getTrack from '../../actions/track';
import getTracklist from '../../actions/tracklist';
// Styles
import * as Styled from './style';

const mapStateToProps = (state) => ({
  track: state.track,
  trackList: state.trackList,
});
const mapDispatchToProps = (dispatch) => ({
  getTrackAction: (fileName) => dispatch(getTrack(fileName)),
  getTracklistAction: () => dispatch(getTracklist()),
});

const audioContext = (new (window.AudioContext || window.webkitAudioContext)());
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);
let source = null;
let trackBuffer = null;
let playbackInterval = null;
let playbackOffset;

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackTime: 0,
      volume: 0.7,
      isPlaying: false,
    };
  }

  componentDidMount() {
    const { getTracklistAction } = this.props;
    getTracklistAction();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { track } = this.props;
    const { volume, playbackTime, isPlaying } = this.state;

    // When track has been loaded
    if (!nextProps.track.isLoading && !_.isEqual(track.data, nextProps.track.data)) {
      this.stopPlaying();
      playbackOffset = 0;
      this.handlePlaybackTime(0);
      audioContext.decodeAudioData(nextProps.track.data.slice(0), (buffer) => {
        trackBuffer = buffer;
        playbackOffset = 0;
        this.handlePlaybackTime(0);
        this.startPlaying(0, playbackOffset);
      });
    }

    // When volume level is changed
    if (volume !== nextState.volume) {
      // audioParam.value = nextState.volume;
      gainNode.gain.value = 2 * nextState.volume - 1;
    }

    // Do nothing when track is loading or volume set to the same level
    if (nextProps.track.isLoading
      || (
        volume === nextState.volume
        && isPlaying === nextState.isPlaying
        && playbackTime === nextState.playbackTime
      )
    ) {
      return false;
    }

    return true;
  }

  // TODO: rewrite it to use redux state instead of component state (it will be faster)
  handlePlaybackTime = (sec) => {
    this.setState({ playbackTime: sec });
  }

  stopPlaying = () => {
    clearInterval(playbackInterval);
    // ? how to know if source is already playing???
    try {
      source.stop();
      // eslint-disable-next-line no-empty
    } catch (error) { }
    source = null;
    this.setState({ isPlaying: false });
  };

  startPlaying = (delay, timeOffset) => {
    this.stopPlaying();
    this.handlePlaybackTime(timeOffset);

    source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.connect(gainNode);
    source.buffer = trackBuffer;

    source.start(0, timeOffset);

    // Draw progress and playback time
    let start = null;
    const element = document.getElementById('progress');
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      playbackOffset = Math.round(progress / 1000);
      if (timeOffset) {
        playbackOffset += timeOffset;
      }
      const duration = Math.round(source.buffer.duration);
      element.style.width = `${100 / (duration / playbackOffset)}%`;
      if (playbackOffset >= duration) {
        clearInterval(playbackInterval);
      }

      // playback time to playlist
      if (playbackOffset) {
        this.handlePlaybackTime(playbackOffset);
      }
    };

    playbackInterval = setInterval(() => {
      window.requestAnimationFrame(step);
    }, 100);

    this.setState({ isPlaying: true });
  };

  playNext = () => {
    const { track, getTrackAction, trackList } = this.props;

    this.stopPlaying();
    playbackOffset = 0;
    this.handlePlaybackTime(0);
    let index = trackList.findIndex(
      (trackFromList) => track.fileName === trackFromList.path,
    );
    if (index + 1 >= trackList.length) {
      index = 0;
    } else {
      index += 1;
    }
    getTrackAction(trackList[index].path);
  };

  playPrev = () => {
    const { track, getTrackAction, trackList } = this.props;

    this.stopPlaying();
    playbackOffset = 0;
    this.handlePlaybackTime(0);
    let index = trackList.findIndex(
      (trackFromList) => track.fileName === trackFromList.path,
    );
    if (index <= 0) {
      index = trackList.length - 1;
    } else {
      index -= 1;
    }
    getTrackAction(trackList[index].path);
  };

  // HANDLERS
  // Handle clicking on the progressbar
  handleSeekPosition = (currentPixel, total) => {
    if (source) {
      playbackOffset = Math.round((trackBuffer.duration / total) * currentPixel);
      this.startPlaying(0, playbackOffset);
    }
  };

  // Handle clicking on the volume
  handleVolLevel = (currentPixel, total) => {
    this.setState({ volume: (1 / total) * currentPixel });
  };

  handlePlayPause = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      this.stopPlaying();
    } else {
      this.startPlaying(0, playbackOffset);
    }
  };

  render() {
    const { volume, playbackTime, isPlaying } = this.state;

    return (
      <Styled.App>
        <Bar onClick={this.handleSeekPosition} id="progress" />
        <Styled.ControlsBar>
          <Styled.Controls>
            <Button
              type={buttonType.backward}
              onClick={this.playPrev}
            />
            <Button
              type={isPlaying ? buttonType.pause : buttonType.play}
              onClick={this.handlePlayPause}
            />
            <Button
              type={buttonType.forward}
              onClick={this.playNext}
            />
          </Styled.Controls>
          <VolumeControl onClick={this.handleVolLevel} id="vol" volume={volume} />
        </Styled.ControlsBar>
        <Tracklist playbackTime={playbackTime} onClick={this.handlePlayPause} />
      </Styled.App>
    );
  }
}

Player.propTypes = {
  track: PropTypes.instanceOf(Object),
  trackList: PropTypes.instanceOf(Object),
  getTrackAction: PropTypes.func.isRequired,
  getTracklistAction: PropTypes.func.isRequired,
};

Player.defaultProps = {
  track: {
    data: null,
    isLoading: false,
    isPlaying: false,
  },
  trackList: [],
};

const MusicPlayer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);

export default MusicPlayer;
