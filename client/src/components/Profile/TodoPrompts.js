import React from 'react';
import SinglePost from '../Blog/SinglePost';

const CompletedPrompts = ({ user, prompts }) => {
  const desiredUsername = user.username;
  const userPrompts = prompts.filter((prompt) => !prompt.solutions.some((solution) => solution.username === desiredUsername));

  userPrompts.reduce((acc, prompt) => {
    const promptSolutions = prompt.solutions.filter((solution) => solution.username === desiredUsername);
    return acc.concat(promptSolutions);
  }, []);

  return (
    <div className="container col-8 flex-column m-4">
      <div className="mt-2">
        {userPrompts.map((prompts) => (
          <SinglePost key={prompts._id} prompts={prompts} />
        ))}
      </div>
    </div>
  );
};

export default CompletedPrompts;
