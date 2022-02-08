import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Feed from '../../components/Feed';
import PagesAndEvents from '../../components/PagesAndEvents';
import ProfileSection from '../../components/ProfileSection';

export default function Home() {
  return (
    // <div
    //   className="flex h-full justify-between items-stretch overflow-auto px-8  sm:pl-0 lg:pr-0"
    //   style={{ maxWidth: '1920px' }}
    // >
    <>
      {/* <ProfileSection hide={true} /> */}
      <Routes>
        <Route index element={<Feed />} />
        <Route path="profile" />
      </Routes>
      <PagesAndEvents />
      <Outlet />
    </>
    // </div>
  );
}
