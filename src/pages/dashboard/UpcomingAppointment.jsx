import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AppointmentTable from "../../components/dashboard/appointment/AppointmentTable";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpcomingAppointment = () => {

    const  {user, loading, setLoading}  = useAuth();
    const axiosSecoure = useAxiosSecure()

    // get user specific appointment data
    const { data: appointments = [], isLoading,refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const { data } = await axiosSecoure(`/appointment/${user?.email}`)
            return data
        }
    })

    // console.log(appointments)

    const handleChangeStatus = async (id, newStatus) => {

        // console.log(id, newStatus)

        try {
            // loading
            setLoading(true);

            const { data } = await axiosSecoure.patch(`/appointmentStatus/${id}`,{ status: newStatus })

            if(data?.modifiedCount > 0) {
                Swal.fire({
                    title: `Successfully Canceled Your Booking!`,
                    text: `Booking Canceled! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // loader
                    setLoading(false)
                    refetch()
                });
            }else {
                toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" }) 
                // loader
                setLoading(false)
                refetch()
            }
        }
        catch (err) {
            // console.log(err);
            toast.error(err.response.data, { autoClose: 3000, theme: "colored" });            
            setLoading(false);
            refetch()
         }
    }

    if (loading || isLoading) {
        <Loader/>
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>Medi House 🩺 | Upcoming Appointment</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center">
                    Upcoming Appointment!
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
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {/* row  */}
                        {
                            appointments?.map(appointment => {
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
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    );
};

export default UpcomingAppointment;