import "./styles/tailwind.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { useEffect } from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </RequireAuth>
          }
        ></Route>
        <Route path="login" element={<div> Hello </div>} />
      </Routes>
    </BrowserRouter>
  );
}
