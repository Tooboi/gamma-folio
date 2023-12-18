import React from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Logo from './Logo';
import { QUERY_ME } from '../../utils/queries';

function Navbar() {
  // Logout function
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { username: userParam } = useParams();

  const { loading, error, data } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || {};
  console.log(user);
  const blogApprove = () => {
    // * true or false if user has answered intro questions
  };
  // if logged in Nav
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        // - pre questions, but logged in user - //

        <nav class="bg-stone-800 border-stone-700 border-b-2">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="GAMMA2DOT2" /> */}
              <span class="self-center text-3xl font-bold whitespace-nowrap dark:text-stone-200">GAMMA2DOT2</span>
            </a>
            <button
              data-collapse-toggle="navbar-dropdown"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-stone-200 rounded-lg md:hidden hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-200"
              aria-controls="navbar-dropdown"
              aria-expanded="false"
            >
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
              <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-stone-700 rounded-lg bg-stone-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-stone-800">
                {/* <li>
                  <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                    Home
                  </a>
                </li> */}
                <li>
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    class="flex items-center justify-between w-full py-2 px-3 text-stone-200 rounded hover:bg-stone-700 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0 md:w-auto"
                  >
                    Portfolios{' '}
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>

                  <div id="dropdownNavbar" class="z-10 hidden font-normal bg-stone-800 border-stone-700 border-2 divide-y divide-stone-100 rounded-lg shadow w-44">
                    <ul class="py-2 text-sm text-stone-200" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a href="/development" class="block px-4 py-2 hover:bg-stone-700">
                          Development
                        </a>
                      </li>
                      <li>
                        <a href="/render" class="block px-4 py-2 hover:bg-stone-700">
                          Renders
                        </a>
                      </li>
                    </ul>
                    {/* <div class="py-1">
                      <a href="#" class="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 dark:text-stone-200 dark:hover:text-white">
                        Sign out
                      </a>
                    </div> */}
                  </div>
                </li>
                <li>
                  <a href="/about" class="block py-2 px-3 text-stone-200 rounded hover:bg-stone-800 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" class="block py-2 px-3 text-stone-200 rounded hover:bg-stone-800 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        // <div className="container justify-content-space-between">
        //   <div className="row ps-1">
        //     <Logo />
        //     <h1 className="mb-0 mx-3 logo-header">Bubble Up</h1>
        //   </div>
        //   <div className="row flex-row align-items-center">
        //     <Link to="/interviews">
        //       <h3 className="mb-0 px-2">Interviews</h3>
        //     </Link>
        //     <Link to="/blog">
        //       <h3 className="mb-0 px-2">Blog</h3>
        //     </Link>
        //     <Link to="/me">
        //       <h3 className="mb-0 px-2">{user.username}</h3>
        //     </Link>
        //     <button className="btn btn-secondary mx-2 py-1 px-2" onClick={logout}>
        //       Logout
        //     </button>
        //   </div>
        // </div>
      );
    }
    if (Auth.loggedIn() && blogApprove()) {
      return (
        // - 5 questions answered so blog tab is available - //

        <nav class="bg-stone-800 border-stone-700 border-b-2">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="GAMMA2DOT2" /> */}
              <span class="self-center text-3xl font-bold whitespace-nowrap dark:text-stone-200">GAMMA2DOT2</span>
            </a>
            <button
              data-collapse-toggle="navbar-dropdown"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-stone-200 rounded-lg md:hidden hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-200"
              aria-controls="navbar-dropdown"
              aria-expanded="false"
            >
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
              <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-stone-700 rounded-lg bg-stone-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-stone-800">
                {/* <li>
                  <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                    Home
                  </a>
                </li> */}
                <li>
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    class="flex items-center justify-between w-full py-2 px-3 text-stone-200 rounded hover:bg-stone-700 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0 md:w-auto"
                  >
                    Portfolios{' '}
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>

                  <div id="dropdownNavbar" class="z-10 hidden font-normal bg-stone-800 border-stone-700 border-2 divide-y divide-stone-100 rounded-lg shadow w-44">
                    <ul class="py-2 text-sm text-stone-200" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a href="/development" class="block px-4 py-2 hover:bg-stone-700">
                          Development
                        </a>
                      </li>
                      <li>
                        <a href="/render" class="block px-4 py-2 hover:bg-stone-700">
                          Renders
                        </a>
                      </li>
                    </ul>
                    {/* <div class="py-1">
                      <a href="#" class="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 dark:text-stone-200 dark:hover:text-white">
                        Sign out
                      </a>
                    </div> */}
                  </div>
                </li>
                <li>
                  <a href="/about" class="block py-2 px-3 text-stone-200 rounded hover:bg-stone-800 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" class="block py-2 px-3 text-stone-200 rounded hover:bg-stone-800 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        // <div className="container justify-content-space-between">
        //   <div className="row ps-1">
        //     <Logo />
        //     <h1 className="mb-0 mx-3">Bubble Up</h1>
        //   </div>
        //   <div className="row flex-row">
        //     <Link to="/me">
        //       <h3 className="mb-0 px-2">Profile</h3>
        //     </Link>
        //     <Link to="/blog">
        //       <h3 className="mb-0 px-2">Blog</h3>
        //     </Link>
        //     <button className="btn btn-secondary mx-2" onClick={logout}>
        //       Logout
        //     </button>
        //   </div>
        // </div>
      );
    } else {
      // Logged out Nav
      return (
        <nav class="bg-stone-800 border-stone-700 border-b-2">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="GAMMA2DOT2" /> */}
              <span class="self-center text-3xl font-bold whitespace-nowrap dark:text-stone-200">GAMMA2DOT2</span>
            </a>
            <button
              data-collapse-toggle="navbar-dropdown"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-stone-200 rounded-lg md:hidden hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-200"
              aria-controls="navbar-dropdown"
              aria-expanded="false"
            >
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
              <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-stone-700 rounded-lg bg-stone-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-stone-800">
                {/* <li>
                  <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                    Home
                  </a>
                </li> */}
                <li>
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    class="flex items-center justify-between w-full py-2 px-3 text-stone-200 rounded hover:bg-stone-700 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0 md:w-auto"
                  >
                    Portfolios{' '}
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>

                  <div id="dropdownNavbar" class="z-10 hidden font-normal bg-stone-800 border-stone-700 border-2 divide-y divide-stone-100 rounded-lg shadow w-44">
                    <ul class="py-2 text-sm text-stone-200" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a href="/development" class="block px-4 py-2 hover:bg-stone-700">
                          Development
                        </a>
                      </li>
                      <li>
                        <a href="/render" class="block px-4 py-2 hover:bg-stone-700">
                          Renders
                        </a>
                      </li>
                    </ul>
                    {/* <div class="py-1">
                      <a href="#" class="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 dark:text-stone-200 dark:hover:text-white">
                        Sign out
                      </a>
                    </div> */}
                  </div>
                </li>
                <li>
                  <a href="/about" class="block py-2 px-3 text-stone-200 rounded hover:bg-stone-800 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" class="block py-2 px-3 text-stone-200 rounded hover:bg-stone-800 md:hover:bg-transparent md:border-0 md:hover:text-stone-50 md:p-0">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        // <div className="container justify-content-space-between">
        //   <div className="row ps-1 py-1">
        //     <Logo />
        //     <h1 className="mb-0 mx-3 select-none">Bubble Up</h1>
        //   </div>
        //   <div className="row flex-row pe-1">
        //     <Link to="/login">
        //       <h3 className="mb-0 px-2">Login</h3>
        //     </Link>
        //   </div>
        // </div>
      );
    }
  }

  return <nav className="navbar p-0">{showNavigation()}</nav>;
}

export default Navbar;
