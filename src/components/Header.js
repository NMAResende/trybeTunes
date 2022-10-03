import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      loading: true,
    };
  }

  // getUser é assincrono
  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const user = await getUser();
    this.setState({
      nome: user.user,
      loading: false });
  };

  render() {
    const { nome, loading } = this.state;
    return (
      <div data-testid="header-component" className="header">
        {loading ? <Loading /> : (
          <div>
            <p
              data-testid="header-user-name"
              onChange={ this.handleGetUser }
            >
              {nome}

            </p>
            <Link data-testid="link-to-search" to="/search" />
            <Link data-testid="link-to-favorites" to="/favorites" />
            <Link data-testid="link-to-profile" to="/profile" />
          </div>
        )}
      </div>
    );
  }
}

export default Header;
