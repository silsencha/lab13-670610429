import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import TodolistPage from "./pages/TodolistPage";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // localhost:xxxx/
      { index: true, element: <HomePage /> },
    ],
  },
  {
    path: "/my",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // localhost:xxxx/my/todolistpage
      { path: "todolistpage", element: <TodolistPage /> },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage /> }],
  },

  {
    path: "/my",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      /* ... */
    ],
  },
]);
