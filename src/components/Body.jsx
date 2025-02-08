import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import GPTSearch from "./GptSearch";
import Watchlist from "./Watchlist";
import Layout from "./Layout"; // Import Layout component

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />, // Wrap all routes with Layout
    children: [
      { path: "browse", element: <Browse /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "gpt-search", element: <GPTSearch /> },
    ],
  },
]);

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;
