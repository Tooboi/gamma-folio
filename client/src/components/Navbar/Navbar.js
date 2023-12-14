import React from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Logo from './Logo';
import { QUERY_ME } from '../../utils/queries';

function Navbar() {
  // Logout function
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { username: userParam } = useParams();

  const { loading, error, data } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || {};
  console.log(user);
  const blogApprove = () => {
    // * true or false if user has answered intro questions
  }
  // if logged in Nav
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (

        // - pre questions, but logged in user - //

        <div className="container justify-content-space-between">
          <div className="row ps-1">
            <Logo />
            <h1 className="mb-0 mx-3 logo-header">Bubble Up</h1>
          </div>
          <div className="row flex-row align-items-center">
            <Link to="/interviews">
              <h3 className="mb-0 px-2">Interviews</h3>
            </Link>
            <Link to="/blog">
              <h3 className="mb-0 px-2">Blog</h3>
            </Link>
            <Link to="/me">
              <h3 className="mb-0 px-2">{user.username}</h3>
            </Link>
            <button className="btn btn-secondary mx-2 py-1 px-2" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      );
    } if (Auth.loggedIn() && blogApprove()) {
      return (

        // - 5 questions answered so blog tab is available - //

        <div className="container justify-content-space-between">
          <div className="row ps-1">
            <Logo />
            <h1 className="mb-0 mx-3">Bubble Up</h1>
          </div>
          <div className="row flex-row">
          <Link to="/me">
              <h3 className="mb-0 px-2">Profile</h3>
            </Link>
            <Link to="/blog">
              <h3 className="mb-0 px-2">Blog</h3>
            </Link>
            <button className="btn btn-secondary mx-2" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      // Logged out Nav
      return (
        <div className="container justify-content-space-between">
          <div className="row ps-1 py-1">
            <Logo />
            <h1 className="mb-0 mx-3 select-none">Bubble Up</h1>
          </div>
          <div className="row flex-row pe-1">
            <Link to="/login">
              <h3 className="mb-0 px-2">Login</h3>
            </Link>
          </div>
        </div>
      );
    }
  }

  return <nav className="navbar p-0">{showNavigation()}</nav>;
}

export default Navbar;
