import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: false,
  //   };
  // }

  // componentDidMount() {
  //   this.handleMusics();
  // }

  // handleMusics = () => {
  //   this.setState = {
  //     loading: true,
  //   };
  // };

  render() {
    // const { loading } = this.state;
    const { trackName, previewUrl } = this.props;
    // if (loading) {
    //   return <Loading />;
    // }
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
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
