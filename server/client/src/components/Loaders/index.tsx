import React from 'react';
import ContentLoader from 'react-content-loader';
import Loader from 'react-loading';

export function Loading() {
  return (
    <div
      className=" fixed flex justify-center items-center
       w-full h-full text-text-primary dark:text-d-text-primary z-0"
    >
      <Loader type="bars" color="#B8D9E3" />
    </div>
  );
}
