import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AppointmentTable from "../../components/dashboard/appointment/AppointmentTable";
import useUsersProfile from "../../hooks/useUsersProfile";

const Reservation = () => {

    const axiosSecoure = useAxiosSecure()
    const [customLoading, setCustomLoading] = useState(false);
    const [userData, , isLoading] = useUsersProfile()
    // console.log(userData[0].email, userData[0].isAdmin)

    const { data: appointments, isLoading: appointLoad, refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const { data } = await axiosSecoure('/appointment')
            return data
        }
    })


    // admin role change
    const handleChangeStatus = async (id, newStatus) => {

        // console.log(id, newStatus)

        try {
            // loading
            setCustomLoading(true);

            const { data } = await axiosSecoure.patch(`/appointmentStatus/${id}`, { status: newStatus })

            if (data?.modifiedCount > 0) {
                Swal.fire({
                    title: `Successfully changed to ${newStatus}!`,
                    text: `Booking status changed to ${newStatus}! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // loader
                    setCustomLoading(false)
                    refetch()
                });
            } else {
                toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                // loader
                setCustomLoading(false)
                refetch()
            }
        }
        catch (err) {
            // console.log(err);
            toast.error(err.response.data, { autoClose: 3000, theme: "colored" });
            setCustomLoading(false);
            refetch()
        }
    }

    // waiting time loader
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    if (customLoading || isLoading || timeLoading || appointLoad) {
        return <Loader />
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>Medi House 🩺 | Reservations</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center">
                    Reservation!
                </h3>
            </AttentionSeeker>

            <div className="overflow-x-auto my-4 mx-auto rounded-lg">
                <table className="table  table-zebra border-2 border-base-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Test Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th className={userData[0]?.isAdmin === true ? ``: 'hidden'}>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {/* row  */}
                        {
                            appointments?.map((appointment) => {
                                return <AppointmentTable key={appointment._id} appointment={appointment}
                                    handleChangeStatus={handleChangeStatus}
                                />
                            })
                        }

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Image</th>
                            <th>Test Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th className={userData[0]?.isAdmin === true ? ``: 'hidden'}>Email</th>
                            <th>Action</th>                            
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default Reservation;