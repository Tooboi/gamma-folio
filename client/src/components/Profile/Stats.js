import React from 'react';

const Stats = ({ user, prompts, interviews }) => {
  const desiredUsername = user.username;
  const userPrompts = prompts.filter((prompts) => {
    return prompts.solutions.some((solution) => solution.username === desiredUsername);
  });
  const userUndonePrompts = prompts.filter((prompt) => !prompt.solutions.some((solution) => solution.username === desiredUsername));
  const userInterviews = interviews.filter((interview) => interview.username === desiredUsername);
  return (
    <table className="card mt-5">
      <tbody>
        <tr className="py-3">
          <th className="px-3">Interviews</th>
          <th className="px-3">Solutions</th>
          <th className="px-3">Prompts</th>
          <th className="px-3">Todo Prompts</th>
        </tr>
        <tr>
          <td className="px-3"><b>{userInterviews.length}</b></td>
          <td className="px-3"><b>{user.solutions.length}</b></td>
          <td className="px-3"><b>{userPrompts.length}</b></td>
          <td className="px-3"><b>{userUndonePrompts.length}</b></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Stats;
