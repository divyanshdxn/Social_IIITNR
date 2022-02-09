import {
  GoogleLoginResponse
} from 'react-google-login';
import SingleProfileResponse from '../types/response/SingleProfileResponse';
import { apiGetOrDelete } from './apiRequest';

interface LoginResponse {
  idToken: string;
  profile: SingleProfileResponse;
}

export const onSuccess = async (response: GoogleLoginResponse) => {
  try {
    localStorage.setItem('token', response.tokenId);
    const res = await apiGetOrDelete('/api/auth/signin');
    if (res[1] >= 200 && res[1] < 300) window.open('/', '_self');
  } catch (error) {}
};
export const onFailure = (error: any) => {
  console.log(error);
};
export const googleLogin = async (tokenId: string): Promise<LoginResponse> => {
  const response = await fetch('/api/auth/signin', {
    headers: { Authorization: `Bearer ${tokenId}` },
  });
  const data = await response.json();
  return data;
};
