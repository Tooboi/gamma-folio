import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SIGNUP } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', username: '', firstName: '', lastName: '' });
  const [addUser] = useMutation(SIGNUP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        newUser: {
          firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        username: formState.username,
        password: formState.password,
        }
        
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
          <h1>Sign Up!</h1>
        </div>
        <form className="container flex-column" onSubmit={handleFormSubmit}>
          <div className="row justify-content-center mb-1">
            <input
              placeholder="First Name"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="row justify-content-center mb-1">
            <input
              placeholder="Last Name"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="row justify-content-center mb-1">
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
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
              placeholder="password"
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-primary mt-2" type="submit">Submit</button>
          </div>
        </form>
        <div className="row justify-content-center mt-3">
        <Link to="/login">Already signed up?</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;