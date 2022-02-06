import React from 'react';
import Feed from '../../components/Feed';
import PagesAndEvents from '../../components/PagesAndEvents';
import ProfileSection from '../../components/ProfileSection';
import { Routes, Route, Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div
      className="flex h-full justify-between items-stretch overflow-auto px-10 md:pl-0 lg:pr-0"
      style={{ maxWidth: '1920px' }}
    >
      <ProfileSection />
      <Routes>
        <Route index element={<Feed />} />
        <Route path="profile" />
      </Routes>
      <PagesAndEvents />
      <Outlet />
    </div>
  );
}
