import React from 'react';
import { Navigate } from 'react-router-dom';
import AllInterviews from '../components/Interviews/AllInterviews';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_INTERVIEWS } from '../utils/queries';

const Interviews = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_INTERVIEWS);
    const interviews = data?.getAllInterviewInfo || [];
    

    if (!Auth.loggedIn()) {
        return <Navigate to='/' />;
    }
    if (Auth.loggedIn()) {
        return (
        
        <div className='container justify-content-center mt-5'>
            { loading ? (<div className='mt-5'>Give us a second...</div>) 
            : error ? (<div className='mt-5'>{error.message}</div>)
            :
            <AllInterviews interviews={interviews} title='Interview Experiences' />}
        </div>
        );
    }


};

export default Interviews;