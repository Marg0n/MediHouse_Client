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
import ProfileEdit from "../components/dashboard/profile/ProfileEdit";
import ProfileInfoEdit from "../components/dashboard/profile/ProfileInfoEdit";
import ViewDetails from "../components/admin/ViewDetails";



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
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard",
                element: <Profile />,

            },
            {
                path: "profileEdit/:email",
                element: <ProfileEdit />,
            },
            {
                path: "profileEdit",
                element: <ProfileInfoEdit />,
            },
            {
                path: "appointments",
                element: <UpcomingAppointment />,
            },
            {
                path: "testResults",
                element: <TestResult />,
            },
            {
                path: "allUsers",
                element: <AdminRoutes><AllUsers /></AdminRoutes>,
            },
            {
                path: "allUsers/users/:email",
                element: <AdminRoutes><ViewDetails /></AdminRoutes>,
            },
            {
                path: "addTest",
                element: <AdminRoutes><AddTest /></AdminRoutes>,
            },
            {
                path: "allTests",
                element: <AdminRoutes><AllTests /></AdminRoutes>,
            },
            {
                path: "addBanner",
                element: <AdminRoutes><AddBanner /></AdminRoutes>,
            },
            {
                path: "allBanners",
                element: <AdminRoutes><AllBanners /></AdminRoutes>,
            },
            {
                path: "statistics",
                element: <AdminRoutes><Statistics /></AdminRoutes>,
            },
        ],
    },
]);