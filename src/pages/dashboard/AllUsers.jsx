import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import UsersTable from "../../components/admin/UsersTable";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [customLoading, setCustomLoading] = useState(false);

    // Navigation
    // const navigate = useNavigate();
    // const location = useLocation();
    // const whereTo = location?.state

    const { data: allUsers, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure('/users')
            return data
        }
    })

    // console.table(allUsers);

    const handleChangeRole = async (id, newStatus) => {

        console.table(id, newStatus)
        try {

            setCustomLoading(true);

            const { data } = await axiosSecure.patch(`/update_user/${id}`, { status: newStatus })
            // console.log(data)

            if (data?.modifiedCount > 0) {
                Swal.fire({
                    title: 'Status Successfully Updated!',
                    text: `Updated the Status Information to ${newStatus}! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    // loader
                    setCustomLoading(false)
                    // navigate(whereTo)
                    // Reload the page
                    // window.location.reload();
                    refetch()
                });
            } else {
                toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                // loader
                setCustomLoading(false)
                // navigate(whereTo)
                // Reload the page
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message, { autoClose: 2000, theme: "colored" });
            setCustomLoading(false)
            // navigate(whereTo)
            // Reload the page
            window.location.reload();

        }
    };

    // admin role change
    const handleChangeAdminRole = async (id, newStatus) => {
        try {
            // loading
            setCustomLoading(true);

            const { data } = await axiosSecure.patch(`/adminRole/${id}`, { status: newStatus })

            if (data?.modifiedCount > 0) {
                Swal.fire({
                    title: `Successfully Changed the Role!`,
                    text: `Role Changed! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
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


    if (customLoading || isLoading || timeLoading) {
        return <Loader />
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>Medi House 🩺 | All Users Info</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center">
                    All Users List!
                </h3>
            </AttentionSeeker>


            <div className="overflow-x-auto my-4 mx-auto rounded-lg">
                <table className="table  table-zebra border-2 border-base-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Blood Group</th>
                            <th>District</th>
                            <th>Upazila</th>
                            <th>Status</th>
                            <th>User Level</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {/* row  */}
                        {
                            allUsers?.map((user) => {
                                return <UsersTable key={user._id} user={user}
                                    handleChangeRole={handleChangeRole} handleChangeAdminRole={handleChangeAdminRole}
                                />
                            })
                        }

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Blood Group</th>
                            <th>District</th>
                            <th>Upazila</th>
                            <th>Status</th>
                            <th>User Level</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;