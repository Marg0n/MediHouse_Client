import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import { GiTestTubes } from "react-icons/gi";
import SalesLineChart from "../../components/dashboard/statistics/SalesLineChart";


const Statistics = () => {

    const axiosSecure = useAxiosSecure()

    // users
    // const { data: allUsers, isLoading } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure('/users')
    //         return data
    //     }
    // })

    // // tests
    // const { data: tests, isLoading: testsLoader } = useQuery({
    //     queryKey: ['tests'],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure('/tests')
    //         return data
    //     }
    // })

    // // bookings
    // const { data: appointments, isLoading: appointLoad } = useQuery({
    //     queryKey: ['appointments'],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure('/appointment')
    //         return data
    //     }
    // })

    // // banners
    // const { data: banners, isLoading: bannerLoader} = useQuery({
    //     queryKey: ['banners'],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure('/banners')
    //         return data
    //     }
    // })

    // // Get total price of all appointments
    // const { data: totalPriceData, isLoading: isLoadingTotalPrice } = useQuery({
    //     queryKey: ['totalPrice'],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure('/appointments/totalPrice');
    //         return data.totalPrice;
    //     }
    // });


    // Fetch all the data for statistics
    const { data: statData = {}, isLoading } = useQuery({
        queryKey: ['statData'],
        queryFn: async () => {
            const { data } = await axiosSecure('/appointmentAdminStat');
            return data;
        }
    });

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>Medi House 🩺 | Statistics</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center">
                    Statistics!
                </h3>
            </AttentionSeeker>

            <div>
                <div className='mt-12'>
                    {/* small cards */}
                    <div className='mb-12 grid gap-y-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

                        {/* Sales Card */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                            <div
                                className={`bg-clip-border -mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-10 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
                            >
                                <FaDollarSign className='w-6 h-6 text-white' />
                            </div>
                            <div className='p-6 text-right'>
                                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                    Total Sales
                                </p>
                                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                    ${statData.totalPrice}
                                </h4>
                            </div>
                        </div>
                        {/* Users Card */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                            <div
                                className={`bg-clip-border -mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-10 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
                            >
                                <FaUserAlt className='w-6 h-6 text-white' />
                            </div>
                            <div className='p-6 text-right'>
                                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                    Total User
                                </p>
                                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                    {statData.totalUsers}
                                </h4>
                            </div>
                        </div>
                        {/* Total Bookings */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                            <div
                                className={`bg-clip-border -mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-10 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
                            >
                                <BsFillCartPlusFill className='w-6 h-6 text-white' />
                            </div>
                            <div className='p-6 text-right'>
                                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                    Total Bookings
                                </p>
                                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                    {statData.totalBooking}
                                </h4>
                            </div>
                        </div>
                        {/* Total Banner */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                            <div
                                className={`bg-clip-border -mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-10 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
                            >
                                <BsFillHouseDoorFill className='w-6 h-6 text-white' />
                            </div>
                            <div className='p-6 text-right'>
                                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                    Total Banner
                                </p>
                                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                    {statData.totalBanners}
                                </h4>
                            </div>
                        </div>
                        {/* Total tests */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                            <div
                                className={`bg-clip-border -mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-10 grid h-16 w-16 place-items-center from-orange-600 to-yellow-400 text-white shadow-pink-500/40`}
                            >
                                <GiTestTubes className='w-6 h-6 text-white' />
                            </div>
                            <div className='p-6 text-right'>
                                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                                    Total Tests
                                </p>
                                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                                    {statData.totalTests}
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div
                    className='mb-4 grid grid-cols-1 gap-6 xl:grid-cols-2 '
                    >
                        {/* Total Sales Graph */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
                            {/* Render Chart Here */}
                            <SalesLineChart data={statData?.chartData} title={'Sales Over Time'} />
                        </div>
                        {/* Calender */}
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
                            <SalesLineChart data={statData?.chartData2} title={'pending vs canceled vs delivered'}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Statistics;