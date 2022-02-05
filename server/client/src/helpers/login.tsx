export function handleLogin(
  isClicked: boolean,
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (isClicked) return;
  window.open(
    '/api/auth/signin',
    'Sign In Using Google',
    'location=yes,height=570,width=520,scrollbars=yes,status=yes',
  );
}

export const googleLogin = async (tokenId: string): Promise<any> => {
  const response = await fetch('/api/auth/signin', {
    headers: { Authorization: `Bearer ${tokenId}` },
  });
  const data = await response.json();
  return data;
};

export type LoginResponse = {
  idToken: string;
  profile: any;
};
