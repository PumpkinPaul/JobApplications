import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import ErrorPage from './ErrorPage';

import JobApplications from './components/JobApplications';
import JobApplicationsTableCreate from './components/JobApplicationsTableCreate';

const router = createBrowserRouter([
  {
    path: "/",
    element: <JobApplications />,
    errorElement: <ErrorPage />,
  }, {
    path: "create",
    element: <JobApplicationsTableCreate />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="text-foreground bg-background md:container md:mx-auto p-5">
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
