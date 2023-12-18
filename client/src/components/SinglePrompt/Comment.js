import React from 'react';

const Comment = ({ solutions }) => {

 const dateTime = solutions.createdAt
 var date = new Date(dateTime * 1);
 var year = (date.getFullYear())
 var month = date.toLocaleString('en-US', { month: 'short' });
 var day = date.getDate().toString().padStart(2, '0');
 var formattedDate = month + ' ' + day + ' ' + year;

  return (
    <div className="card-thin my-2">
      <div className="corner-border px-1 row justify-content-space-between">
      <div>
        {solutions.username}
      </div>
      <div>
        {formattedDate}
      </div>
      </div>
      <div className="p-2 row">
        <p className="mb-1 comment-body">{solutions.response}</p>
      </div>
    </div>
  );
};

export default Comment;
