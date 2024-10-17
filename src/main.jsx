import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Project styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css';

import About from './About';
import App from './App';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Logout from './Logout';
import Home from './Home';
import Messages from './Messages';

function Layout() {
  return (
    <>
      <Header />
      <div id='page-content'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />, // Redirect or show main content here
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
    ],
  },
]);

// Create a root instance and render the RouterProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
