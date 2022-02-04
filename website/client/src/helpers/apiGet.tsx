import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
export default async function apiGet<Y>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<[Y, number]> {
  try {
    const res: AxiosResponse<Y, null> = await axios.get(url, config);
    return [res.data, res.status];
  } catch (err) {
    const error = err as AxiosError;
    if (error.isAxiosError && error.response) {
      return [error.response.data, error.response.status];
    }
    throw err;
  }
}
