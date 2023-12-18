import React from 'react';
import { Link } from 'react-router-dom';

const SinglePost = ({ prompts }) => {
  // console.log(prompts);
  return (
    // <div></div>
    <div className="row card post-item flex-column mt-3 p-3">
      <div className="blog-post">
        <h2 className="row">{prompts.prompt}</h2>
        <div className="row justify-content-end">
          <button className="btn btn-secondary" type='button'>
            <Link to={`/prompt/${prompts._id}`}>
              <b>Join the discussion</b>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
