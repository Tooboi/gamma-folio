import React from 'react';
import { Link } from 'react-router-dom';
import SingleInterview from './SingleInterview';

const AllInterviews = ({ interviews, title }) => {
  return (
    <div className="container col-8 flex-column m-5">
      <div className="row card flex-column justify-content-center">
        <h2 className="row justify-content-center mb-0 pt-3">{title}</h2>
        <div className="row flex-row justify-content-end">
          <Link to="/writepost">
            <svg className="plus-svg-2" viewBox="0 0 448 512">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </Link>
        </div>
      </div>
      <div>
        {interviews.map((interviews) => (
          <SingleInterview key={interviews._id} interviews={interviews} />
        ))}
      </div>
    </div>
  );
};

export default AllInterviews;
