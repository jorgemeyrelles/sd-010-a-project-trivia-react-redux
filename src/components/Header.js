import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as api from '../Services/fetchApi';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl: '',
    };
  }

  componentDidMount() {
    const { email, name } = this.props;
    const state = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } };
    if (!localStorage.getItem('state')) {
      localStorage.setItem('state', JSON.stringify(state));
    }
    api.fetchGravatar(email).then((imgUrl) => this.setState({ imgUrl }));
  }

  render() {
    const { imgUrl } = this.state;
    const { name } = this.props;
    return (
      <div>
        <header>
          <img src={ imgUrl } alt="foto-perfil" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">{ name }</span>
        </header>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});

export default connect(mapStateToProps, null)(Header);
