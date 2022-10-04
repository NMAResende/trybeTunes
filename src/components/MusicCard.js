import PropTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: false,
    };
  }

  handleMusics = async () => {
    this.setState({ loading: true });
    await addSong();
    this.setState({
      loading: false,
      favorite: true,
    });
  };

  render() {
    const { loading, favorite } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <li>
        {trackName}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteSong">
          Música Favorita
          <input
            type="checkbox"
            id="favoriteSong"
            name="favoriteSong"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleMusics }
            defaultChecked={ favorite }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
