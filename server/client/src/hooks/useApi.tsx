import axios, {
  AxiosRequestConfig,
  AxiosResponse, Method
} from 'axios';
import { useEffect, useState } from 'react';
import { checkToken, getHeaders } from '../helpers/apiRequest';

interface State<T> {
  isError: boolean | null;
  isLoading: boolean;
  isSuccess: boolean | null;
  status: number | null | undefined;
  data: T | null;
  timer: NodeJS.Timer | null;
}

const useApi = <T, Y = any>(
  url: string,
  method: Method,
  interval?: number,
  payload?: T,
): State<Y> => {
  const [state, setState] = useState<State<Y>>({
    isLoading: true,
    isSuccess: null,
    isError: null,
    status: null,
    data: null,
    timer: null,
  });

  const handleRequest = async () => {
    setState({ ...state });
    if (!checkToken()) {
      setState({ ...state, isLoading: false, isSuccess: false });
      return;
    }
    const config: AxiosRequestConfig<T> = {
      method,
      data: payload,
      headers: getHeaders(),
    };
    const res: AxiosResponse<Y, T> = await axios(url, config);
    setState({
      ...state,
      isLoading: false,
      isSuccess: res.status >= 200 && res.status < 300,
      isError: false,
      status: res.status,
      data: res.data,
    });
  };
  useEffect(() => {
    if (interval) {
      const intervalTimer: NodeJS.Timer = setInterval(() => {
        handleRequest();
      }, interval);
      setState({
        ...state,
        timer: intervalTimer,
      });
    } else {
      handleRequest();
    }
  }, []);
  return state;
};

export default useApi;
