import React from 'react';

const IntComment = ({ commFeedback }) => {
  return (
    <div className="card-thin my-2">
      <div className="corner-border px-1 row justify-content-space-between">
      <div>
        {commFeedback.username}
      </div>
      </div>
      <div className="p-2 row">
        <p className="mb-1 comment-body">{commFeedback.thoughts}</p>
      </div>
    </div>
  );
};

export default IntComment;