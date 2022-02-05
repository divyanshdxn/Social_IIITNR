import useApi from './useApi';

export const useAuth = (interval?: number) => {
  const auth = useApi('/api/auth/protected', 'get', interval);
  return auth;
};
