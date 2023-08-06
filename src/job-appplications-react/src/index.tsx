import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import ErrorPage from './ErrorPage';

import JobApplications from './components/JobApplications';
import JobApplicationsCreate from './components/JobApplicationsCreate';
import JobApplicationsEdit from './components/JobApplicationsEdit';

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
    },
    action: async ({ request }) => {
      switch (request.method) {
        case "DELETE": {
          var id = await request.json();
          const res = await fetch(`${apiUrl}/jobapplication/${id}`, {
            method: 'delete',
          });

          await new Promise((res) => setTimeout(res, 500))

          return res;
        }
        default: {
          throw new Response("", { status: 405 });
        }
      }
    },
  }, {
    path: "/create",
    element: <JobApplicationsCreate />,
    action: async ({ request }) => {
      switch (request.method) {
        case "POST": {
          //Post good data
          const data = Object.fromEntries(await request.formData());
          //force a validation failure
          //const data = await request.formData();
          const res = await fetch(`${apiUrl}/jobapplication`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });

          if (res.ok) {
            return redirect("/");;
          }
          return res;
        }
        default: {
          throw new Response("", { status: 405 });
        }
      }
    },
  },
  {
    path: "/edit/:id",
    element: <JobApplicationsEdit />,
    loader: async ({ params }) => {
      return fetch(`${apiUrl}/jobapplication/${params.id}`)
        .then((response) => response.json())
    },
    action: async ({ request, params }) => {
      switch (request.method) {
        case "PATCH": {
          const formData = await request.formData();
          formData.set("id", params.id as string);
          const data = Object.fromEntries(formData);
          //force a validation failure
          //const data = await request.formData();
          const res = await fetch(`${apiUrl}/jobapplication/${params.id}`, {
            method: 'patch',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });

          if (res.ok) {
            return redirect("/");;
          }
          return res;
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
      <main className="text-foreground md:container md:mx-auto p-0 text-sm">
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
