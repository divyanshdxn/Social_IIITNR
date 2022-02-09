// Create a component

import React from 'react';
import getMedia from '../../helpers/getMedia';
import useApi from '../../hooks/useApi';
import PagesResponse from '../../types/response/PagesResponse';
import { Error } from '../Error';
import { Loading } from '../Loaders';

const ListAllPages: React.FC = () => {
  const {
    data: list,
    isError,
    isLoading,
    status,
  } = useApi<any, PagesResponse[]>('/api/pages', 'GET');

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 text-sm gap-10 mx-8 sm:ml-0">
      <div className="flex px-4 pb-2 col-start-1 col-end-2 sm:col-end-3">
        <h1>Suggested Pages</h1>
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error code={status} to="/app/pages" />
      ) : list?.length === 0 ? (
        <div className="flex flex-col">
          <span>Uhh No...</span>
          <span>You don't have any</span>
        </div>
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
                  src={getMedia(page.media)[0].url}
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
