import React, { useEffect, useRef, useState } from 'react';
import { MyProfileContextValue } from '../../contexts/MyProfileReducerContext';
import useDarkMode from '../../hooks/useDarkMode';
import { useMyProfileContext } from '../../hooks/useMyProfileContext';
import SingleProfileResponse from '../../types/response/SingleProfileResponse';
import EditIcon from '../Icons/EditIcon';

interface Props {
  edit?: boolean;
}

const Bio: React.FC<Props> = ({ edit }) => {
  const { state, dispatch } = useMyProfileContext();
  const bioValue = state?.profile?.bio;
  const [darkMode, setDarkMode] = useDarkMode();
  const [isEditing, setIsEditing] = useState(false);
  const bioRef = useRef<HTMLInputElement>(null);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
    bioRef.current?.focus();
  };
  const submit = () => {};
  const noBio = edit
    ? "You don't have a bio"
    : `${state?.profile?.firstName} doen't have a bio`;
  return (
    <form
      className={`flex relative w-full justify-between border-b-2
	   border-primary dark:border-d-primary mt-4
	   outline-primary rounded-sm outline-2 ${isEditing && 'outline'}`}
    >
      <input
        className=" flex flex-1 text-sm bg-background dark:bg-d-background"
        disabled={!isEditing}
        value={`Bio: ${bioValue === '' ? noBio : bioValue}`}
        ref={bioRef}
      />
      {edit && (
        <button className="" onClick={(e) => handleEdit(e)}>
          <EditIcon className={`${!darkMode && 'invert'} `} />
        </button>
      )}
    </form>
  );
};
export default Bio;
