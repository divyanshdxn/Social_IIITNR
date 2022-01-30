import "./styles/tailwind.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

export default function App() {
  console.log(axios.get("/api/auth/protected"));
  return (
    <BrowserRouter>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </BrowserRouter>
  );
}

