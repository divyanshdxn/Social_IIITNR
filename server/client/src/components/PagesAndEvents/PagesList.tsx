import PagesResponse from '../../types/response/PagesResponse';
import { BsDot } from 'react-icons/bs';
import useApi from '../../hooks/useApi';
import { useEffect, useState } from 'react';
interface Props {}

const PagesList: React.FC<Props> = () => {
  const {
    isError,
    isLoading,
    isSuccess,
    data: pages,
  } = useApi<any, PagesResponse[]>('/api/pages', 'GET');

  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    setIsEmpty(pages?.length === 0);
  }, [pages]);

  return (
    <div
      className={`w-full h-full flex flex-col items-start ${
        isEmpty ? 'justify-center' : 'justify-start'
      } text-sm gap-2 py-2`}
    >
      {isLoading ? (
        <div className="m-auto">Loading...</div>
      ) : isError ? (
        <div className="">An Error Occurred...</div>
      ) : pages?.length === 0 ? (
        <>
          <span>Uhh No...</span>
          <span>You don't have any</span>
        </>
      ) : (
        pages &&
        pages.map((page) => {
          return (
            <div
              id={page.id}
              className="flex w-full h-14 justify-start items-center gap-2
				rounded-xl"
              key={page.id}
            >
              <div
                className="flex justify-center items-center w-10 h-full
	   			rounded-full overflow-hidden"
              >
                <img
                  src={`/api/media/${page.media}`}
                  alt={page.title}
                  className="w-full object-cover aspect-square"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="w-full text-sm">{page.title}</span>
                <div
                  className="text-xs flex  text-text-secondary dark:text-d-text-secondary
				justify-center items-center gap-3"
                >
                  <div className="flex">
                    Followers{' '}
                    <BsDot className="text-primary dark:text-d-primary" /> 0{' '}
                  </div>
                  <div
                    className="text-xs text-text-secondary dark:text-d-text-secondary
				   flex justify-center items-center"
                  >
                    Events{' '}
                    <BsDot className="text-primary dark:text-d-primary" /> 0{' '}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PagesList;
