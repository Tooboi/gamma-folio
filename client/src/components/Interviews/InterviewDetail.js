import React from 'react';
import { Link } from 'react-router-dom';
import IntComment from './IntComment';
// import SolutionForm from './SolutionForm'

const InterviewDetail = ({ interview, header, id }) => {
  console.log(interview);


  return (
    <div className="container col-8 flex-column m-5">
      <div className="row flex-column justify-content-center">
      <div className="row card interview-post-item flex-column mt-3 p-3">
            <div className="blog-post">
                <h3 className="row">interview experience</h3>
                <div>username: {interview.username}</div>
                <div>location of interview: {interview.location}</div>
                <div>subject: {interview.subject}</div>
                <div>prompt received: {interview.prompt}</div>
                <div>interviewee response: {interview.response}</div>
                <div>interviewer feedback: {interview.resFeedback}</div>
            </div>
        </div>
          <div className="row comment flex-column mt-2 mx-3">
            {interview.commFeedback && interview.commFeedback.map((commFeedback) => (
              <IntComment key={commFeedback._id} commFeedback={commFeedback} id/>
            ))}
          </div>
        </div>
      </div>

  );
};

export default InterviewDetail;