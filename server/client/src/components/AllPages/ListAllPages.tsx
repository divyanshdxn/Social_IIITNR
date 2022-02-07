// Create a component

import React, { useState } from 'react';
import { useEffect } from 'react';
import { BsDot } from 'react-icons/bs';
import useApi from '../../hooks/useApi';
import PagesResponse from '../../types/response/PagesResponse';

const ListAllPages: React.FC = () => {
  const {
    data: list,
    isError,
    isLoading,
    isSuccess,
  } = useApi<any, PagesResponse[]>('/api/pages', 'GET');

  return (
    <div className="w-full h-full grid grid-cols-2 text-sm gap-10 mx-8 sm:ml-0">
      <div className="flex px-4 pb-2 col-start-1 col-end-3">
        <h1>Suggested Pages</h1>
      </div>
      {isLoading ? (
        <div className="m-auto">Loading...</div>
      ) : isError ? (
        <div className="">An Error Occurred...</div>
      ) : list?.length === 0 ? (
        <>
          <span>Uhh No...</span>
          <span>You don't have any</span>
        </>
      ) : (
        list &&
        list.map((page) => {
          return (
            <div
              id={page.id}
              className="flex flex-col h-full justify-center items-center gap-5 rounded-xl shadow p-2"
              key={page.id}
            >
              <div
                className="flex justify-center items-center w-36 h-36 rounded-full overflow-hidden
			  bg-background_variant dark:bg-d-background_variant"
              >
                <img
                  src={`/api/media/${page.media}`}
                  alt={page.title.trim()}
                  className="w-full object-cover aspect-square"
                />
              </div>
              <div className="flex flex-col w-full justify-center gap-2">
                <span className=" flex w-full font-semibold justify-center">
                  {page.title.trim()}
                </span>
                <span className="flex w-full justify-center">
                  {page.description.trim()}
                </span>
                <div className="flex w-full justify-center gap-5">
                  <button className="btn px-4 py-2">Join Page</button>
                  <button className="btn px-4 py-2">View Page</button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListAllPages;
