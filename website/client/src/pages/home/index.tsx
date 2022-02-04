import React from 'react';
import Feed from '../../components/Feed';
import ProfileSection from '../../components/ProfileSection';

export default function Home() {
  return (
    <div className="flex h-full justify-between items-stretch">
      <ProfileSection />
      <Feed />
      <div className="w-1/4 "></div>
    </div>
  );
}
