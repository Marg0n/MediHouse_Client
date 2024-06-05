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
        <div className="font-lato flex">
            {/* navbar */}
            <div className=" ">
            <DashboardNav/>
            </div>

            <div className="container mx-2 md:mx-auto my-6">
                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;