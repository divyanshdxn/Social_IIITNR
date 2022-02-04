import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
export default async function apiGet<Y>(
  url: string,
  config: AxiosRequestConfig,
): Promise<Y> {
  const res: AxiosResponse<Y, null> = await axios.get(url, config);
  return res.data;
}
