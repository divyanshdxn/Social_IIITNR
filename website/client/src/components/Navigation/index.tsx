import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import navLinks from "../../data/navLinks";
import Logo from "../Icons/Logo";

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
      if (location.pathname === "/app/" + item) {
        setActive(index);
      }
    });
  }, [location.pathname]);
  useEffect(() => {
    setTempActive(currActive);
  }, [currActive]);
  return (
    <nav
      className="flex justify-between sticky top-0 w-full bg-background_variant 
    dark:bg-d-background_variant text-primary dark:text-d-primary text-sm h-11 px-2 py-2"
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
      className="flex items-center gap-2 h-full sm:border-r-2 border-r-hints dark:border-r-d-hints 
      pr-3"
    >
      <Logo className="w-8" />
      <span className="hidden sm:inline text-lg font-semibold ">
        Social IIITNR
      </span>
    </div>
  );
};

const NavRight: React.FC = () => {
  return (
    <div id="nav_right h-full flex">
      <button
        className="flex justify-center items-center rounded-lg h-full p-1 outline-primary
         dark:outline-d-primary outline-2 outline focus:text-text-primary  focus:bg-primary_variant
          hover:text-text-primary hover:bg-primary_variant hover:border-0"
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
        className={`transform transition-transform h-1 w-full origin-left ${
          !active && "scale-x-0"
        } group-hover:scale-x-100 bg-primary dark:bg-d-primary rounded-full `}
      />
    </div>
  );
};
