import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { pages } from "../consts/pages";
import { getPossiblePathArray } from "../utils";

export const Routers: React.FC = () => {
  const defaultPath = getPossiblePathArray(
    (pages.find((page) => page.default) ?? pages[0]).path
  )[0];

  return (
    <Routes>
      {pages.map((page) => (
        <Route path={page.path} element={page.Component} />
      ))}

      <Route path="*" element={<Navigate to={defaultPath} />} />
    </Routes>
  );
};
