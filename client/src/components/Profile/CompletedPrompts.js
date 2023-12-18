import React from 'react';
import SinglePost from '../Blog/SinglePost';

const CompletedPrompts = ({ user, prompts }) => {
    
  const desiredUsername = user.username;
  const userPrompts = prompts.filter((prompts) => {
    return prompts.solutions.some((solution) => solution.username === desiredUsername);
  });
if (userPrompts.length === 0) {
    return <div className='mt-5'><h3>answer some prompts</h3></div>
}
  return (
    <div className="container col-8 flex-column m-4">
      <div className='mt-2'>
        {userPrompts.map((prompts) => (
          <SinglePost key={prompts._id} prompts={prompts} />
        ))}
      </div>
    </div>
  );
};

export default CompletedPrompts;
