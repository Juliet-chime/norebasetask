import HomePage from "./pages";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Page not found😔!!</div>,
  },
];
