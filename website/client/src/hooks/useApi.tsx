import axios, {
  AxiosError,
  Method,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import React, { useEffect, useState } from "react";

interface State<T> {
  isError: boolean | null;
  isLoading: boolean;
  isSuccess: boolean | null;
  status: number | null;
  data: T | null;
}

export default function useApi<T, Y = any>(
  url: string,
  method: Method,
  payload?: T
): State<Y> {
  const [state, setState] = useState<State<Y>>({
    isLoading: true,
    isSuccess: null,
    isError: null,
    status: null,
    data: null,
  });

  const handleRequest = async () => {
    try {
      const config: AxiosRequestConfig<T> = { method, data: payload };
      const res: AxiosResponse<Y, T> = await axios(url, config);
      setState({
        isLoading: false,
        isSuccess: res.status >= 200 && res.status < 300,
        isError: false,
        status: res.status,
        data: res.data,
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response && err.response.status === 401) {
        console.log(err.response);
        setState({
          isLoading: false,
          isSuccess: false,
          isError: false,
          status: err.response.status,
          data: err.response.data,
        });
      } else {
        setState({ ...state, isLoading: false, isError: true });
      }
    }
  };
  useEffect(() => {
    handleRequest();
  }, []);
  return state;
}
