import React from 'react';
import { Route, Routes, Outlet } from 'react-router';
import { Error } from '../components/Error';
import Navigation from '../components/Navigation';
import { RequireAuth } from '../components/RequireAuth';
import Events from '../pages/events';
import Home from '../pages/home';
import Pages from '../pages/pages';
import { RoutePath } from '../types/Route';

export const protectedRoutes: RoutePath[] = [
  {
    path: 'home/*',
    component: <Home />,
  },
  {
    path: 'pages',
    component: <Pages />,
  },
  {
    path: 'events',
    component: <Events />,
  },
];

const ProtectedRoutes: React.FC = () => {
  return (
    <main className="">
      <Navigation />
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    </main>
  );
};

export default ProtectedRoutes;
