import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage';

import JobApplications from './components/JobApplications';
import JobApplicationsTableCreate from './components/JobApplicationsTableCreate';

//https://reactrouter.com/en/main/start/tutorial

const apiUrl = "https://localhost:7176/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <JobApplications />,
    errorElement: <ErrorPage />,
    loader: async () => {
      return fetch(`${apiUrl}/jobapplication`)
        .then((response) => response.json())
    }
  }, {
    path: "create",
    element: <JobApplicationsTableCreate />,
    action: async ({ request, params }) => {
      console.log('action: async ({ request, params })');

      switch (request.method) {
        case "POST": {
          //const data = Object.fromEntries(await request.formData());
          const data = await request.formData();
          return await fetch(`${apiUrl}/jobapplication`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        }
        default: {
          throw new Response("", { status: 405 });
        }
      }
    },
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="text-foreground bg-background md:container md:mx-auto p-5 text-sm">
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
