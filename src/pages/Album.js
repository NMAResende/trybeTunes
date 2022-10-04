import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      music: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.handlegetMusics();
  }

  handlegetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const idAlbum = await getMusics(id);
    this.setState({
      music: idAlbum,
      loading: false,
    });
  };

  render() {
    const { music, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{music[0].artistName}</h2>
          <h2 data-testid="album-name">{music[0].collectionName}</h2>
        </div>
        { music
          .filter((obj) => obj.trackName !== undefined)
          .map((track, i) => <MusicCard key={ i } { ...track } />)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default Album;
