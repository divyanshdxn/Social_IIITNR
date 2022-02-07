import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import navLinks from '../../data/navLinks';
import useAppContext from '../../hooks/useAppContext';
import Logo from '../Icons/Logo';
import NightIcon from '../Icons/NightIcon';
import SunIcon from '../Icons/SunIcon';

interface SingleLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  active?: boolean;
}
export default function Navigation() {
  const location = useLocation();
  const [currActive, setActive] = useState(0);
  const [tempActive, setTempActive] = useState(currActive);
  useEffect(() => {
    navLinks.forEach((item, index) => {
      if (location.pathname === '/app/' + item) {
        setActive(index);
      }
    });
  }, [location.pathname]);
  useEffect(() => {
    setTempActive(currActive);
  }, [currActive]);
  return (
    <nav
      className="flex justify-between fixed top-0 w-full bg-background_variant 
    dark:bg-d-background_variant text-primary dark:text-d-primary text-sm h-11 px-2 py-2 z-50"
    >
      <NavLeft />
      <div
        id="nav_mid"
        className="flex "
        onMouseLeave={() => {
          setTempActive(currActive);
        }}
      >
        {navLinks.map((item, index) => {
          return (
            <SingleLink
              name={item}
              key={index}
              active={index === tempActive}
              onMouseEnter={() => {
                setTempActive(index);
              }}
            />
          );
        })}
      </div>
      <NavRight />
    </nav>
  );
}

const NavLeft: React.FC = () => {
  return (
    <div
      id="nav_left"
      className="flex items-center gap-2 h-full border-l-transparent border-y-transparent border-r-hints dark:border-r-d-hints 
      pr-3"
      style={{ borderWidth: '1px' }}
    >
      <Logo className="w-8" />
      <span className="hidden sm:inline text-lg font-semibold ">
        Social IIITNR
      </span>
    </div>
  );
};

const NavRight: React.FC = () => {
  const { darkMode, setDarkMode, setIsModalOpen, setModalChildren } =
    useAppContext();
  const nav = useNavigate();
  const handleClick = () => {
    if (setDarkMode) setDarkMode((curr) => !curr);
  };

  // Sign Out Confirmation Component for Modal Child
  // Clear Local Storage if yes
  const HangleSignOut: React.FC = () => {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-center text-primary font-medium text-sm">
          Are you sure you want to sign out?
        </h2>
        <div className="flex justify-center gap-2">
          <button
            className="btn flex justify-center items-center text-xs capitalize py-2 w-24 text-white"
            onClick={() => {
              setIsModalOpen(false);
              localStorage.clear();
              nav('/login');
            }}
          >
            Yes
          </button>
          <button
            className="btn flex justify-center items-center text-xs capitalize py-2 w-24 text-white"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  const signOut = () => {
    // Open Modal and set child to SignOutModal
    setIsModalOpen(true);
    setModalChildren(<HangleSignOut />);
  };

  return (
    <div id="nav_right" className="h-full flex  gap-4 ">
      <button
        className=" border-x-hints border-y-transparent"
        style={{ borderWidth: '1px' }}
        onClick={handleClick}
      >
        {darkMode ? (
          <SunIcon className="w-6 mx-3" />
        ) : (
          <NightIcon className="w-6 mx-3" />
        )}
      </button>
      <button
        className="flex justify-center items-center rounded-lg h-full p-1 outline-primary
         dark:outline-d-primary outline-2 outline focus:text-text-primary  focus:bg-primary_variant
          hover:text-text-primary hover:bg-primary_variant hover:border-0"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  );
};

const SingleLink: React.FC<SingleLinkProps> = ({
  name,
  active,
  onMouseEnter,
}) => {
  return (
    <div
      className="group flex flex-col capitalize overflow-hidden px-2"
      onMouseEnter={(e) => onMouseEnter?.call(this, e)}
    >
      <Link to={`/app/${name.toLowerCase()}`}>{name}</Link>
      <div
        className={`transform transition-transform h-0.5 w-full origin-left ${
          !active && 'scale-x-0'
        } group-hover:scale-x-100 mt-0.5 bg-primary dark:bg-d-primary rounded-full `}
      />
    </div>
  );
};
