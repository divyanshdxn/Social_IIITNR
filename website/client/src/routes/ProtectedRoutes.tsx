import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navigation from "../components/Navigation";
import { RequireAuth } from "../components/RequireAuth";
import Events from "../pages/events";
import Home from "../pages/home";
import Pages from "../pages/pages";
import { RoutePath } from "../types/Route";

const routes: RoutePath[] = [
  {
    path: "/",
    component: <Navigate to="/home" replace={true} />,
  },
  {
    path: "/home",
    component: <Home />,
  },
  {
    path: "/pages",
    component: <Pages />,
  },
  {
    path: "/events",
    component: <Events />,
  },
];

const ProtectedRoutes: React.FC = () => {
  return (
    <main>
      <Navigation />
      <Routes>
        {routes.map((route, index): JSX.Element => {
          return (
            <Route
              path={route.path}
              element={<RequireAuth>{route.component}</RequireAuth>}
              key={index}
            />
          );
        })}
      </Routes>
    </main>
  );
};

export default ProtectedRoutes;
