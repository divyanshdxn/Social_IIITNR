import React from "react";
import { handleLogin } from "../../helpers/login";

interface Props {}

const LoginPanel: React.FC<Props> = () => {
  return (
    <section
      className="dark flex w-full h-full sm:w-5/6 max-w-3xl min-h-fit"
      style={{ height: "480px" }}
    >
      <div className="hidden md:flex flex-col justify-center items-center md:w-1/2 h-full px-10 bg-primary dark:bg-d-primary bg-opacity-70 dark:bg-opacity-70 text-white">
        <div className="ml-10">
          <h1>Join the club</h1>
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, labore!
          </h4>
          <ul className="list-none flex flex-col gap-4 text-xl mt-5">
            <li className="flex gap-4 items-center">
              <img src="/assets/community.svg" alt="" /> Community
            </li>
            <li className="flex gap-4 items-center">
              <img src="/assets/community.svg" alt="" />
              Pages
            </li>
            <li className="flex gap-4 items-center">
              <img src="/assets/events.svg" alt="" />
              Events
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center w-full md:w-1/2 h-full bg-background dark:bg-d-background text-text-primary dark:text-d-text-primary">
        <div className="relative flex flex-col items-center w-full bottom-12">
          <img src="/assets/logo.svg" alt="app logo" className="w-12" />
          <h2>Welcome</h2>
          <h3 className="mb-10">Community for IIIT NR Family</h3>
          <button
            className="px-5 py-1.5 rounded-full bg-primary dark:bg-d-primary text-white text-lg"
            onClick={handleLogin}
          >
            Continue With College Email
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginPanel;
