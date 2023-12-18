import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Development from './pages/Development';
import Render from './pages/Render';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile';
import Prompt from './pages/Prompt';
import Interviews from './pages/Interviews';
import Interview from './pages/Interview';
import WritePost from './pages/WritePost';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='bg-stone-900 text-stone-200 h-screen'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/development" element={<Development />} />
            <Route path="/render" element={<Render />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/writepost" element={<WritePost />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interview/:interviewId" element={<Interview />} />
            <Route path="/prompt/:promptId" element={<Prompt />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
