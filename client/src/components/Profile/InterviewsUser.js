import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import AllUserInterviews from '../Interviews/AllInterviews';

const InterviewsUser = ({ interviews }) => {
  const currentUsername = Auth.getProfile().data.username;
  const userInterviews = interviews.filter((interview) => interview.username === currentUsername);
  if (userInterviews.length === 0) {
    return (
      <div className="mt-5 container flex-row justify-content-center">
        <h3>Add an interview experience</h3>
        <Link to="/writepost">
          <svg className="plus-svg-2 mx-3" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </Link>
      </div>
    );
  }
  return (
    <div className="container justify-content-center">
      <AllUserInterviews interviews={userInterviews} title="Add Interview" />
    </div>
  );
};

export default InterviewsUser;
