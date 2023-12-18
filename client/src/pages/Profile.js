import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { QUERY_PROMPTS } from '../utils/queries';
import { QUERY_ALL_INTERVIEWS } from '../utils/queries';
import Auth from '../utils/auth';

import SolutionsUser from '../components/Profile/SolutionsUser';
import CompletedPrompts from '../components/Profile/CompletedPrompts';
import TodoPrompts from '../components/Profile/TodoPrompts';
import InterviewsUser from '../components/Profile/InterviewsUser';
import Stats from '../components/Profile/Stats';

function Profile() {
  const { username: userParam } = useParams();

  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });
  const { loading: loadingPrompts, error: errorPrompts, data: dataPrompts } = useQuery(QUERY_PROMPTS);

  const { loading: loadingIntr, error: errorIntr, data: dataIntr } = useQuery(QUERY_ALL_INTERVIEWS);

  const interviews = dataIntr?.getAllInterviewInfo || [];
  const user = dataMe?.me || {};
  const prompts = dataPrompts?.getPrompts || [];

  const profileURL = `https://source.boringavatars.com/beam/150/${user._id}?colors=7dcfff,7aa2f7,bb9af7,b4f9f8,73daca,9ece6a`;

  const [toggleState, setToggleState] = useState(5);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }
  if (loadingMe) {
    return <div>One sec...</div>;
  }
  if (errorMe) {
    return <div>{errorMe}</div>;
  } else {
    return (
      <div className="container mt-5 justify-content-center flex-column">
        <div className="row mt-5 justify-content-center">
          <img src={profileURL} alt="Profile Pic" className="mb-4 select-none profile-img"></img>
        </div>
        <div className="row align-items-center flex-column">
          <h1 className="mb-5 name-header select-none">
            {user.firstName} {user.lastName}
          </h1>
        </div>
        
        <div className='container justify-content-center'>
          <div onClick={() => toggleTab(1)} className={toggleState === 1 ? 'tabs row active-tabs px-4 mx-3 py-2' : 'row tabs px-4 mx-1 py-2'}>
          <b className='select-none'>My Interviews</b>
          </div>
          <div onClick={() => toggleTab(2)} className={toggleState === 2 ? 'tabs row active-tabs px-4 mx-3 py-2' : 'row tabs px-4 mx-1 py-2'}>
          <b className='select-none'>My Solutions</b>
          </div>
          <div onClick={() => toggleTab(3)} className={toggleState === 3 ? 'tabs row active-tabs px-4 mx-3 py-2' : 'row tabs px-4 mx-1 py-2'}>
          <b className='select-none'>Finished Prompts</b>
          </div>
          <div onClick={() => toggleTab(4)} className={toggleState === 4 ? 'tabs row active-tabs px-4 mx-3 py-2' : 'row tabs px-4 mx-1 py-2'}>
          <b className='select-none'>Todo Prompts</b>
          </div>
          <div onClick={() => toggleTab(5)} className={toggleState === 5 ? 'tabs row active-tabs px-4 mx-3 py-2' : 'row tabs px-4 mx-1 py-2'}>
          <b className='select-none'>Stats</b>
          </div>
        </div><hr className='m-0'></hr>
        <div className={toggleState === 1 ? 'content content-active justify-content-center' : 'content justify-content-center'}><InterviewsUser interviews={interviews} /></div>
        <div className={toggleState === 2 ? 'content content-active justify-content-center' : 'content justify-content-center'}><SolutionsUser user={user} prompts={prompts} /></div>
        <div className={toggleState === 3 ? 'content content-active justify-content-center' : 'content justify-content-center'}><CompletedPrompts user={user} prompts={prompts} /></div>
        <div className={toggleState === 4 ? 'content content-active justify-content-center' : 'content justify-content-center'}><TodoPrompts user={user} prompts={prompts} /></div>
        <div className={toggleState === 5 ? 'content content-active justify-content-center' : 'content justify-content-center'}><Stats user={user} prompts={prompts} interviews={interviews} /></div>
      </div>
    );
  }
}

export default Profile;
