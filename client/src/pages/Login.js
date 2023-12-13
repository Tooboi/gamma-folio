import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { userCred: {username: formState.username, password: formState.password} },
      });
      const token = mutationResponse.data.login.token;
      console.log(token);
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className='full-dvh'>
      <div className="container max-376 card justify-content-center force-v-center flex-column p-3">
        <div className="row justify-content-center">
          <h1>Log In</h1>
        </div>
        <form className="container flex-column" onSubmit={handleFormSubmit}>
          <div className="row justify-content-center mb-1">
            <input
              placeholder="username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="row justify-content-center mb-1">
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
          <div className="row justify-content-center">
            <button className="btn btn-primary mt-2" type="submit">Submit</button>
          </div>
        </form>
        <div className="row justify-content-center mt-3">
        <Link to="/signup">Not signed up?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;