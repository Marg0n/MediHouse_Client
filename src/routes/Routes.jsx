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
import AdminRoutes from './AdminRoutes';



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
                index: true,
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
                element: <AdminRoutes><AllUsers /></AdminRoutes>,
            },
            {
                index: "/addTest",
                element: <AdminRoutes><AddTest/></AdminRoutes>,
            },
            {
                index: "/allTests",
                element: <AdminRoutes><AllTests /></AdminRoutes>,
            },
            {
                index: "/addBanner",
                element: <AdminRoutes><AddBanner/></AdminRoutes>,
            },
            {
                index: "/allBanners",
                element: <AdminRoutes><AllBanners/></AdminRoutes>,
            },
            {
                index: "/statistics",
                element: <AdminRoutes><Statistics /></AdminRoutes>,
            },
        ],
    },
]);