import React from 'react';
import Comment from '../SinglePrompt/Comment';

const SolutionsUser = ({ user, prompts }) => {
  const desiredUsername = user.username;
  prompts.filter((prompts) => {
    return prompts.solutions.some((solution) => solution.username === desiredUsername);
  });
if (user.solutions.length === 0) {
    return <div className='mt-5'><h3>answer some prompts</h3></div>
}
  return (
    <div className="container col-8 flex-column m-5">
      <div className="row card flex-column justify-content-center">
        <div className="row flex-column">
          <div className="row flex-column comment-section">
            <div className="row comment flex-column my-2 mx-3">
              {user.solutions.map((solutions) => (
                <Comment key={solutions.response} solutions={solutions} id />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsUser;
