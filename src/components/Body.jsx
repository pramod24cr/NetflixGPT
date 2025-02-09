import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import GPTSearch from "./GptSearch";
import Watchlist from "./Watchlist";
import Layout from "./Layout";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
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
