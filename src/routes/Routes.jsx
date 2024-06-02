import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";


import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Root from './../layouts/Root';
import Home from './../pages/Home';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
                // loader: () => fetch(`${import.meta.env.VITE_SERVER}/allBlogs`),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/registration",
                element: <Register />,
            },
        ],
    },
]);