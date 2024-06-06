import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";


import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Root from './../layouts/Root';
import Home from './../pages/Home';
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";

import Statistics from './../pages/dashboard/Statistics';
import AllBanners from './../pages/dashboard/AllBanners';
import AddBanner from './../pages/dashboard/AddBanner';
import AllTests from './../pages/dashboard/AllTests';
import AddTest from './../pages/dashboard/AddTest';
import AllUsers from "../pages/dashboard/AllUsers";
import TestResult from './../pages/dashboard/TestResult';
import UpcomingAppointment from './../pages/dashboard/UpcomingAppointment';
import Profile from './../pages/dashboard/Profile';


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
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: "/profile",
                element: <Profile/>,
            },
            {
                index: "/appointments",
                element: <UpcomingAppointment/>,
            },
            {
                index: "/testResults",
                element: <TestResult/>,
            },
            {
                index: "/allUsers",
                element: <AllUsers />,
            },
            {
                index: "/addTest",
                element: <AddTest/>,
            },
            {
                index: "/allTests",
                element: <AllTests />,
            },
            {
                index: "/addBanner",
                element: <AddBanner/>,
            },
            {
                index: "/allBanners",
                element: <AllBanners/>,
            },
            {
                index: "/statistics",
                element: <Statistics />,
            },
        ],
    },
]);