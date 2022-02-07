import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { useMyProfileContext } from '../../hooks/useMyProfileContext';
import SingleProfileResponse from '../../types/response/SingleProfileResponse';
import Bio from './BioComponent';
import PostList from './PostList';

interface Props {
  userId?: string;
  hide?: boolean;
}

const ProfileSection: React.FC<Props> = ({ userId, hide }) => {
  const url = userId ? userId : 'current';
  const { isLoading, isSuccess, data } = useApi<any, SingleProfileResponse>(
    `/api/profile/${url}`,
    'get',
  );
  const { state, dispatch } = useMyProfileContext();
  const [profile, setProfile] = useState<Partial<SingleProfileResponse>>({});
  const loc = useLocation();
  useEffect(() => {
    if (isSuccess && data && dispatch && !userId)
      dispatch({ type: 'set-profile', payload: data });
  }, [isSuccess, data, dispatch, userId]);
  useEffect(() => {
    setProfile(state.profile);
  }, [state]);
  return (
    <div
      className={`sticky translate-y-6 px-8 mx-8 left-10 top-12 
	  flex-col basis-1/5 border-2  border-hints dark:border-d-hints 
	  rounded-xl z-20 bg-background dark:bg-d-background overflow-hidden
     ${hide && 'hidden sm:flex'}`}
      style={{ height: 'calc(90% - 3rem)', minWidth: '18rem' }}
    >
      <div
        className=" w-44 aspect-square rounded-full overflow-hidden mt-5 mb-2 bg-background_variant 
      dark:bg-background_variant"
        style={{ minHeight: '10rem' }}
      >
        <img src={profile.photoUrl} alt="" className=" w-44 object-cover " />
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">{profile.firstName}</h2>
        <span className="text-xs text-text-secondary dark:text-d-text-secondary">
          Student | CSE
        </span>
        <span className="text-xs text-text-secondary dark:text-d-text-secondary">
          {profile.email}
        </span>
      </div>
      <Bio edit={userId ? false : true} />
      {isSuccess && <PostList owner={!userId} userID={profile.userId} />}
    </div>
  );
};

export default ProfileSection;
