import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      submitted: false,
    };
  }

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
    const { submitted } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
