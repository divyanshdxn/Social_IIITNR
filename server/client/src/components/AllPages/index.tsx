// Create a component AllPages that renders the PagesList component.
import React from 'react';
import ListAllPages from './ListAllPages';

interface Props {}
const AllPages: React.FC<Props> = () => {
  return (
    <div
      className="flex relative flex-col flex-1 top-12 translate-y-6 h-fit"
      style={{ minHeight: 'calc(100% - 5rem)' }}
    >
      {/* <PagesListPrev /> */}
      <ListAllPages />
    </div>
  );
};

export default AllPages;
