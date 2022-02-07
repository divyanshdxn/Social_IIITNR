// import React from 'react';
// import { Loading } from '../../components/Loaders';
// import { useApi } from '../../hooks/useApi';
// import { useNavigate } from 'react-router-dom';

interface Props {}
const Pages: React.FC<Props> = () => {
  return <main>Pages</main>;
};

// // A componenet for rendering a list of pages from /api/pages
// const PagesList: React.FC<Props> = () => {
//   const { data, isError, isLoading, isSuccess } = useApi('/api/pages', 'GET');

//   return <div>{isLoading && <Loading />}</div>;
// };

// // A component for render a single page preview from page prop
// // The component should be list item
// // The component should show the title of the page next to the image in bold
// // The component should should open the page in a modal when clicked
// const singlePage = ({ page }) => {
//   const navigate = useNavigate();

// };

export default Pages;