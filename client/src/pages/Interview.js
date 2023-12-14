import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_INTERVIEW_INFO } from '../utils/queries';
import InterviewDetail from '../components/Interviews/InterviewDetail';

const Interview = () => {
    const { interviewId } = useParams();
    console.log (interviewId)
  const { loading, error, data } = useQuery(QUERY_INTERVIEW_INFO, {
    variables: { getInterviewInfoId: interviewId },
  }); 
  const interview = data?.getInterviewInfo || {};
  console.log(interview)
  
  // Change header
    let header = 'Interview Experience'


  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }
  if (Auth.loggedIn()) {
    return <div className="container justify-content-center mt-5">
            {loading ? 
                <div className="mt-5">One sec...</div>
                 : error ? 
                    <div className="mt-5">{error.message}
                    </div> : 
                    
                <InterviewDetail interview={interview} header={header}/>
                }
            </div>;
  }
};

export default Interview;