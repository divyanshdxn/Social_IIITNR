import React from 'react';
import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';
import ProfileSection from '../components/ProfileSection';
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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    scrollRef.current?.scrollTo(0, 0);
  };
  return (
    <main className="overflow-auto " ref={scrollRef}>
      <Navigation />
      <div className="flex min-h-full h-max w-full justify-between items-stretch px-8 sm:pl-0 lg:pr-0 ">
        <RequireAuth>
          <>
            <ProfileSection hide={true} />
            <Outlet />
          </>
        </RequireAuth>
      </div>
    </main>
  );
};

export default ProtectedRoutes;
