import React, { useEffect, useState } from 'react';
import Logo from '../../components/Icons/Logo';
import { googleLogin, handleLogin } from '../../helpers/login';
import features from '../../data/features';
import { useAuth } from '../../hooks/useAuth';
import {GoogleLogin} from 'react-google-login';


interface Props {}

const LoginPanel: React.FC<Props> = () => {
  const { isSuccess, timer } = useAuth(500000);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (isSuccess && clicked) {
      window.open('/', '_self');
    }
    return () => {
      clearInterval(timer as NodeJS.Timeout);
    };
  }, [isSuccess, clicked]);

  const onSuccess = (response: any) => {
    googleLogin(response.tokenId)
      .then((body) => console.log(body))
      .catch((error) => console.log(error));
  };
  const onFailure = (error: any) => {
    console.log(error);
  };

  return (
    <section
      className="flex w-5/6 h-5/6 sm:w-3/6 md:w-5/6 max-w-3xl max-h-full sm:max-h-full min-h-fit min-w-fit select-none"
      style={{ height: '480px' }}
    >
      <div className="hidden md:flex flex-col justify-center items-center md:w-1/2 h-full px-10 bg-primary dark:bg-d-primary bg-opacity-70 dark:bg-opacity-70 text-white">
        <div className="ml-10">
          <h1>Join the club</h1>
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, labore!
          </h4>
          <ul className="list-none flex flex-col gap-4 text-xl mt-5">
            {features.map((item, index) => {
              return (
                <li className="flex gap-4 items-center" key={index}>
                  {item.icon} {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className="flex items-center w-full md:w-1/2 h-full bg-background 
      dark:bg-d-background text-text-primary dark:text-d-text-primary"
      >
        <div className="relative flex flex-col items-center w-full bottom-12">
          <Logo className="w-12" />
          <h2>Welcome</h2>
          <h3 className="mb-10">Community for IIIT NR Family</h3>
          <button
            className={`${
              clicked && 'bg-primary_variant dark:bg-d-primary_variant'
            } 
            ${clicked && 'text-text-primary dark:text-d-text-primary'} px-5 
            py-1.5 rounded-full bg-primary dark:bg-d-primary text-white text-lg`}
            onClick={() => {
              handleLogin(clicked, setClicked);
              setClicked((prev) => !prev);
            }}
            disabled={clicked}
          >
            {clicked ? 'Logging You In ' : 'Continue With College Email'}
          </button>
          {clicked && (
            <button
              className="text-xs p-1 text-primary 
          dark:text-d-primary"
              onClick={() => setClicked(false)}
            >
              Cancel
            </button>
          )}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
            buttonText="Continue with college email"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPanel;
