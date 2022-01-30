import React from "react";
import axios from "axios";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  console.log(axios.get("/api/auth/protected"));
  return children;
}
