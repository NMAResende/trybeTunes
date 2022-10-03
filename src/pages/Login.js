import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      submitted: false,
      loading: false,
    };
  }
  // createUser é assincrono.
  // Referência: https://v5.reactrouter.com/web/api/history

  handleButton = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false }, () => history.push('/search'));
  };

  validando = () => {
    const { name } = this.state;
    const numberMin = 3;
    this.setState({ submitted: (name.length >= numberMin) });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => this.validando());
  };

  render() {
    const { submitted, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : (
          <div>
            Login
            <label htmlFor="name">
              Nome
              <input
                type="text"
                name="name"
                id="name"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ !submitted }
              onClick={ this.handleButton }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
