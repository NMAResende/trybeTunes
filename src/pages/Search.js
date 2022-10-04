import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      submitted: false,
      loading: false,
      resultArtist: false,
      album: [],
    };
  }

  handleButtonArtist = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    const albumArtist = await searchAlbumsAPI(name);
    this.setState({
      album: albumArtist,
      loading: false,
      resultArtist: true,
    }, () => this.validandoArtista());
  };

  validandoArtista = () => {
    const { name } = this.state;
    const numberMin = 2;
    this.setState({ submitted: (name.length >= numberMin) });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => this.validandoArtista());
  };

  render() {
    const { name, submitted, loading, album, resultArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <label htmlFor="artist">
              Nome do artista ou banda
              <input
                data-testid="search-artist-input"
                type="text"
                name="name"
                id="artist"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ !submitted }
              onClick={ this.handleButtonArtist }
            >
              Pesquisar
            </button>
          </div>
        )}
        {resultArtist
          && (
            <div>
              <h2>{`Resultado de álbuns de: ${name}`}</h2>
              {album.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
                : album.map((alb, i) => (
                  <div key={ i }>
                    <img src={ alb.artworkUrl100 } alt={ alb.artistName } />
                    <h3>{alb.artistName}</h3>
                    <h4>
                      Album
                      {' '}
                      {alb.collectionName}
                    </h4>
                    <Link
                      to={ `/album/${alb.collectionId}` }
                      data-testid={ `link-to-album-${alb.collectionId}` }
                    >
                      Lista de Albuns
                    </Link>
                  </div>
                ))}
            </div>)}
      </div>
    );
  }
}

export default Search;
