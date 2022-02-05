import { profile } from 'console';
import React, {
  LegacyRef,
  RefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import useApi from '../../hooks/useApi';
import useAppContext from '../../hooks/useAppContext';
import useDarkMode from '../../hooks/useDarkMode';
import { useMyProfileContext } from '../../hooks/useMyProfileContext';
import MyProfileProvider from '../../providers/MyProfileProvider';
import MyProfileReducer, {
  MyProfileReducerState,
  MyProfileReducerType,
} from '../../reducers/MyPostsReducer';
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
  const { state, dispatch } = useMyProfileContext();
  const [profile, setProfile] = useState<Partial<SingleProfileResponse>>({});
  useEffect(() => {
    if (isSuccess && data && dispatch && !userId)
      dispatch({ type: 'set-profile', payload: data });
  }, [isSuccess]);
  useEffect(() => {
    setProfile(state.profile);
  });
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
