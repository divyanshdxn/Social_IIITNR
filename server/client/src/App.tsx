import { useEffect, useReducer, useState } from 'react';
import ReactModal from 'react-modal';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Error } from './components/Error';
import useDarkMode from './hooks/useDarkMode';
import Login from './pages/login';
import AppContextProvider from './providers/AppContextProvider';
import MyProfileProvider from './providers/MyProfileProvider';
import MyProfileReducer from './reducers/MyPostsReducer';
import ProtectedRoutes, { protectedRoutes } from './routes/ProtectedRoutes';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/tailwind.css';
import Modal from './components/Modal/Modal';
import { apiGetOrDelete } from './helpers/apiRequest';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [myProfileState, dispatch] = useReducer(MyProfileReducer, {
    myPosts: [],
    profile: {},
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(<div />);
  const callApi = async ()=>{
    const [res,code] =await apiGetOrDelete('/api/pages');
    console.log(res);
  }
  return (
    <div className={`${darkMode && 'dark'} h-screen w-screen`}>
      <AppContextProvider
        value={{
          darkMode,
          setDarkMode,
          isModalOpen,
          setIsModalOpen,
          modalChildren,
          setModalChildren,
        }}
      >
        <MyProfileProvider value={{ state: myProfileState, dispatch }}>
          <BrowserRouter>
            <Routes>
              {/* Login Route */}
              <Route path="login" element={<Login />} />
              <Route
                index
                element={<Navigate to="/app/home" replace={true} />}
              />
              {/* Protected Routes */}
              <Route path="app/" element={<ProtectedRoutes />}>
                <Route index element={<Error code={404} retry to="/" />} />
                {protectedRoutes.map((route, index): JSX.Element => {
                  return (
                    <Route
                      path={route.path}
                      element={route.component}
                      key={index}
                    />
                  );
                })}
              </Route>
              {/* Ummatched Routes */}
              <Route path="*" element={<Error code={404} retry={true} />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="top-right"
            theme={darkMode ? 'dark' : 'light'}
            autoClose={5000}
            closeOnClick
            draggable
            pauseOnHover
            style={{ zIndex: 70 }}
          />
          <Modal isOpen={isModalOpen} />
        </MyProfileProvider>
      </AppContextProvider>
    </div>
  );
};
export default App;
