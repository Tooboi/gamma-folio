import React from 'react';
import { Navigate } from 'react-router-dom';
import AllPosts from '../components/Blog/AllPosts';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_PROMPTS } from '../utils/queries';

const Blog = () => {
  const { loading, error, data } = useQuery(QUERY_PROMPTS);
  const prompts = data?.getPrompts || [];

  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }
  if (Auth.loggedIn()) {
    return <div className="container justify-content-center mt-5">
    {loading ? (<div className='mt-5'>One sec...</div>) : error ? (<div className='mt-5'>{error.message}</div>)
    : 
    <AllPosts prompts={prompts} title="Popular Prompts" />}
    </div>;
  }
};
export default Blog;
