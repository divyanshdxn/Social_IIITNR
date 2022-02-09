import React, { HTMLAttributes, useState } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';
import Logo from '../../components/Icons/Logo';
import features from '../../data/features';
import { onFailure, onSuccess } from '../../helpers/login';

interface Props {}

const LoginPanel: React.FC<Props> = () => {
  const [clicked, setClicked] = useState(false);

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
          <GoogleLogin
            clientId={
              process.env.REACT_APP_GOOGLE_CLIENT_ID ||
              '557790709288-4la84pac5ktcasmjtdfa40312pgk5nnj.apps.googleusercontent.com'
            }
            onSuccess={(
              res: GoogleLoginResponse | GoogleLoginResponseOffline,
            ) => {
              setClicked(false);
              onSuccess(res as GoogleLoginResponse);
            }}
            onFailure={(e) => {
              setClicked(false);
              onFailure(e);
            }}
            icon={true}
            cookiePolicy={'single_host_origin'}
            render={({ disabled, onClick }) => (
              <CustomButton
                clicked={clicked}
                disabled={disabled}
                onClick={onClick}
                setClicked={setClicked}
              />
            )}
          />
          {clicked && (
            <button
              className="text-xs p-1 text-primary 
          dark:text-d-primary"
              onClick={() => setClicked(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

interface CustomButtonProps extends HTMLAttributes<HTMLButtonElement> {
  clicked: boolean;
  disabled: boolean | undefined;
  onClick: () => void;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  clicked,
  disabled,
  onClick,
  setClicked,
}) => {
  const msg = disabled
    ? 'Please Wait...'
    : clicked
    ? 'Logging You In...'
    : 'Continue With College Email';
  return (
    <button
      className="disabled:bg-primary_variant disabled:dark:bg-d-primary_variant
            px-5 w-72 py-1.5 rounded-full bg-primary dark:bg-d-primary text-white text-lg"
      onClick={() => {
        if (onClick) onClick();
        setClicked((prev) => !prev);
      }}
      disabled={clicked || disabled}
    >
      {msg}
    </button>
  );
};
export default LoginPanel;
