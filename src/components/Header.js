import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  // getUser é assincrono
  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const nome = await getUser();
    this.setState({
      user: nome,
      loading: false,
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div className="header">
          {loading ? <Loading /> : (
            <div>
              <p
                className="namePage"
                data-testid="header-user-name"
                onChange={ this.handleGetUser }
              >
                {user.name}

              </p>
              <div className="link">
                <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
                <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
                <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
