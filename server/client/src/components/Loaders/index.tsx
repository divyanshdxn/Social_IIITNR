import React, { useEffect, useState } from 'react';
import Loader from 'react-loading';
import { useNavigate } from 'react-router-dom';

export function Loading() {
  const nav = useNavigate();
  const [isTooLong, setIsTooLong] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTooLong(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className=" fixed flex flex-col justify-center items-center
       w-full h-full bg-background dark:bg-d-background text-text-primary 
       dark:text-d-text-primary z-40 gap-4"
    >
      <Loader type="bars" color="#B8D9E3" />
      {isTooLong && (
        <>
          <div className="text-center text-d-primary_variant dark:text-primary_variant capitalize">
            Taking Too Long?
            <br /> You Might Want To try logging in again
          </div>
          <div className="flex gap-3">
            <button className="btn px-4 py-2" onClick={() => nav('/login')}>
              Log In Again
            </button>
          </div>
        </>
      )}
    </div>
  );
}
