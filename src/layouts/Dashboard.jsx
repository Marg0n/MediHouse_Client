import { Outlet } from "react-router-dom";
import DashboardNav from "../components/dashboard/DashboardNav";
import useAuth from "../hooks/useAuth";
import Loader from "../components/shared/Loader";



const Dashboard = () => {

    const { loading } = useAuth()

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="font-lato md:flex container min-h-screen">
            {/* navbar */}
            <div className=" ">
            <DashboardNav/>
            </div>

            <div className="flex-1 md:ml-64 my-6">
                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;