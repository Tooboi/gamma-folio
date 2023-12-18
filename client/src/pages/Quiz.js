// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';

import TextArea from '../components/TextArea/TextArea';
// import Algorithm from '../components/Algorithm/Algorithm'

const Quiz = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  } else

  return (
    <div className="full-dvh">
      <div className="container max-960 card justify-content-center force-v-center ">
        <div className="row justify-content-center flex-column">
          <TextArea />
          {/* <Algorithm /> */}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
