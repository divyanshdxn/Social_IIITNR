export function handleLogin() {
  window.open(
    "/api/auth/signin",
    "Sign In Using Google",
    "location=yes,height=570,width=520,scrollbars=yes,status=yes"
  );
}
