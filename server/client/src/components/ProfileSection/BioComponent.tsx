import React, { useEffect, useState } from 'react';
import { useMyProfileContext } from '../../hooks/useMyProfileContext';
import EditIcon from '../Icons/EditIcon';

interface Props {
  edit?: boolean;
}

const Bio: React.FC<Props> = ({ edit }) => {
  const { state } = useMyProfileContext();
  const [bio, setBio] = useState('');
  useEffect(() => {
    console.log(`bio: ${state?.profile?.bio}`);
    if (!state || !state.profile) setBio('Loading...');
    else if (!state.profile.bio || state.profile.bio === '') {
      if (edit) {
        setBio("You don't have a bio.");
      } else {
        setBio(`${state.profile.firstName} doesn't have a bio.`);
      }
    }
    console.log(state);
  }, [state]);
  return (
    <form
      className={`flex relative w-full justify-between border-b-2
	   border-primary dark:border-d-primary mt-4
	   outline-primary rounded-sm outline-2 `}
    >
      <div
        className=" flex flex-1 text-sm bg-background dark:bg-d-background "
        style={{ minHeight: '1.5rem' }}
        placeholder={`Bio: ${bio}`}
      />
      {edit && (
        <button className="">
          <EditIcon className="invert dark:invert-0" />
        </button>
      )}
    </form>
  );
};
export default Bio;
