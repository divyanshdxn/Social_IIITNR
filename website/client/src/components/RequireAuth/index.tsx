import { Error } from "../Error";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../Loading";

interface Props {
  children: JSX.Element;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const { isSuccess, isLoading, isError, status } = useAuth();
  if (isLoading) return <Loading />;
  else if (isError) return <Error code={status as number} />;
  else if (isSuccess) return children;
  else return <Navigate to="/login" replace={true} />;
};
