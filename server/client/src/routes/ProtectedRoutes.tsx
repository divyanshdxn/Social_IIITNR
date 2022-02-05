import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Error } from '../components/Error';
import Navigation from '../components/Navigation';
import { RequireAuth } from '../components/RequireAuth';
import Events from '../pages/events';
import Home from '../pages/home';
import Pages from '../pages/pages';
import { RoutePath } from '../types/Route';

const routes: RoutePath[] = [
  {
    path: '/home',
    component: <Home />,
  },
  {
    path: '/pages',
    component: <Pages />,
  },
  {
    path: '/events',
    component: <Events />,
  },
  {
    path: '*',
    component: <Error />,
  },
];

const ProtectedRoutes: React.FC = () => {
  return (
    <main className="">
      <Navigation />
      <Routes>
        {routes.map((route, index): JSX.Element => {
          return (
            <Route
              path={route.path}
              element={<RequireAuth>{route.component}</RequireAuth>}
              key={index}
            />
          );
        })}
      </Routes>
    </main>
  );
};

export default ProtectedRoutes;
