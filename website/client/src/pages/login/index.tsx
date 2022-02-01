import React from "react";
import LoginPanel from "./LoginPanel";

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <main className="h-full w-full flex justify-center items-center bg-cover bg-iiitnr overflow-auto text-text-primary dark:text-d-text-primary">
      <LoginPanel />
    </main>
  );
};

export default Login;
