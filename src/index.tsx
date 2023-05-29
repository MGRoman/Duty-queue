import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ConfigProvider } from "antd";
import ru_RU from "antd/lib/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";

import { ErrorBoundary } from "./HOC";
import { App } from "./app";

import "./index.css";

moment.locale("ru");

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ru_RU}>
        <ErrorBoundary>{(hasError) => <App hasError={hasError} />}</ErrorBoundary>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
