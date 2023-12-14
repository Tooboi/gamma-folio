import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import SolutionForm from './SolutionForm'
const SinglePrompt = ({ prompt, header, id }) => {
  console.log(prompt);


  return (
    <div className="container col-8 flex-column m-5">
      <div className="row card flex-column justify-content-center">
        <h2 className="row justify-content-center pt-3 px-3">{prompt.prompt}</h2>
        <div className="row flex-column">
          <SolutionForm id={prompt._id}/>
        </div>
        <div className="blog-post"></div>
        <div className="row flex-column comment-section">
          
          <h2 className="text-align-center">{header}</h2>

          <div className="row comment flex-column mt-2 mx-3">
            {prompt.solutions.map((solutions) => (
              <Comment key={solutions._id} solutions={solutions} id/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrompt;
