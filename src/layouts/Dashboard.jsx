// import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";



const Dashboard = () => {
    return (
        <div className="font-lato">
            {/* navbar */}
            <Navbar/>

            <div className="container mx-2 md:mx-auto my-6 min-h-[calc(100vh-370px)] ">
                {/* <Outlet /> */}
                ok dashboard
            </div>

        </div>
    );
};

export default Dashboard;