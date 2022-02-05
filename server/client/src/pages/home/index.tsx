import React from 'react';
import Feed from '../../components/Feed';
import PagesAndEvents from '../../components/PagesAndEvents';
import ProfileSection from '../../components/ProfileSection';

export default function Home() {
  return (
    <div className="flex h-full justify-between items-stretch overflow-auto">
      <ProfileSection />
      <Feed />
      <PagesAndEvents />
    </div>
  );
}
