import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_PROMPT } from '../utils/queries';
import SinglePrompt from '../components/SinglePrompt/SinglePrompt'

const Prompt = () => {
    const { promptId } = useParams();
  const { loading, error, data } = useQuery(QUERY_PROMPT, {
    variables: { promptId: promptId },
  }); 
  const prompt = data?.getPrompt || {};
  
  // Change header
    let header = 'Discussion'

  // if (prompt.solutions.length === 0) {
  //   header = "no comments yet :("
  // } else {
  //   header = "Discussion"
  // }

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
                    
                <SinglePrompt prompt={prompt} header={header}/>
                }
            </div>;
  }
};

export default Prompt;
