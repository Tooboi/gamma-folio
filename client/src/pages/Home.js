import React from 'react';
// import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import bg from '../assets/bubbleFull2K.png';

const Home = () => {

    return (
      // Welcome Page - Not Logged In
      <div className="container card max-960 justify-content-center force-v-center flex-column p-3">
        <div className="row align-items-center flex-column">
          <h1>Absorb More Knowledge</h1>
          <h2 className="mb-2">chat with peers about your recent coding challenges and interview experiences</h2>
        </div>
      </div>
    );
  }

export default Home;
