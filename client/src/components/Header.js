import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderContent(){
    switch (this.props.auth) {
      case null:
        return
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      //if its not null or false, we can asume the user is logged in
      //because we have auth data
      default:
      return (
        <li>
          <a href="/api/logout">Logout</a>
        </li>
      );
    }
  }

  render() {
    console.log('Header props: ', this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="left brand-logo" to={this.props.auth ? '/surveys' : '/'}>
            Atacama
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
