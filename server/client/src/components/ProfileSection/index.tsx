import React, {
  LegacyRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import useApi from '../../hooks/useApi';
import useAppContext from '../../hooks/useAppContext';
import useDarkMode from '../../hooks/useDarkMode';
import SingleProfileResponse from '../../types/response/SingleProfileResponse';
import EditIcon from '../Icons/EditIcon';
import Bio from './BioComponent';
import PostList from './PostList';

interface Props {
  userId?: string;
}

const ProfileSection: React.FC<Props> = ({ userId }) => {
  const url = userId ? userId : 'current';
  const { isLoading, isSuccess, data } = useApi<any, SingleProfileResponse>(
    `/api/profile/${url}`,
    'get',
  );
  const { setUserData } = useAppContext();
  useEffect(() => {
    if (setUserData) setUserData(data);
  }, [isSuccess]);
  return (
    <div
      className="sticky translate-y-6 px-8 mx-8 left-10 top-12 
	  flex flex-col basis-1/5 border-2  border-hints dark:border-d-hints 
	  rounded-xl z-20 bg-background dark:bg-d-background overflow-hidden"
      style={{ height: 'calc(90% - 3rem)', minWidth: '18rem' }}
    >
      <div
        className=" w-44 aspect-square rounded-full overflow-hidden mt-5 mb-2 bg-background_variant 
      dark:bg-background_variant"
      >
        <img src={data?.photoUrl} alt="" className=" w-44 object-cover " />
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">{data?.firstName}</h2>
        <span className="text-xs text-text-secondary dark:text-d-text-secondary">
          Student | CSE
        </span>
        <span className="text-xs text-text-secondary dark:text-d-text-secondary">
          {data?.email}
        </span>
      </div>
      <Bio data={data} edit={userId ? false : true} />
      {isSuccess && <PostList userID={data?.userId} />}
    </div>
  );
};

export default ProfileSection;
