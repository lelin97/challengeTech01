import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../pages/Layout";
import FormPassword from "../pages/Password";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <FormPassword />,
        path: "/",
      },
    ],
  },
]);
