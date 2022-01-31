import useApi from "./useApi";

export const useAuth = () => {
  const auth = useApi("/api/auth/protected", "get");
  return auth;
};
