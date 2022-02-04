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
