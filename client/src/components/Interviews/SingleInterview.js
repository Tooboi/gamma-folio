import React from 'react';
import { Link } from 'react-router-dom';

const SingleInterview = ({ interviews }) => {

  let company = ''
    if (interviews.location) {
        company += ` at ${interviews.location}`;
    };
    
    let topic = ''
    if (interviews.subject) {
      topic += interviews.subject;
    }

    let job = ''
    if (interviews.position) {
      job += `for ${interviews.position}`
    }
    return (

        <div className="row card interview-post-item flex-column mt-3 p-3">
            <div className="blog-post">
            <div>
              <h2 className="row">{interviews.username}'s {topic} interview {company} {job}</h2>
            </div>
                <div className='py-1'><b>Prompt received:</b> {interviews.prompt}</div>
                <div className='py-1'><b>Response:</b> {interviews.response}</div>
                <div className='py-1'><b>Interviewer feedback:</b> {interviews.resFeedback}</div>
                {/* <div className="btn btn-secondary">
            <Link to={`/interview/${interviews._id}`}>
              <b>Join the discussion</b>
            </Link>
    </div> */}
         
            </div>
        </div>

    );
};

export default SingleInterview;