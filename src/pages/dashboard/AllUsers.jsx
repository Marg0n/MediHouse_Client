import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { AttentionSeeker } from "react-awesome-reveal";
import UsersTable from "../../components/admin/UsersTable";
import { toast } from "react-toastify";
import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AllUsers = () => {

    const axiosSecoure = useAxiosSecure()
    const [customLoading, setCustomLoading] = useState(true);

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const whereTo = location?.state || '/AllUsers';

    const { data: allUsers, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecoure('/users')
            return data
        }
    })

    // console.table(allUsers);

    const handleChangeRole = (id, status) => {

        console.table(id, status)
        // try {

        //     axiosSecoure.patch(`/users/${id}`, status)

        //     if (status?.modifiedCount > 0) {
        //         Swal.fire({
        //             title: 'Successfully Updated!',
        //             text: 'Updated the Personal Information! 🎉',
        //             icon: 'success',
        //             confirmButtonText: 'Cool'
        //         }).then(() => {
        //             // loader
        //             setCustomLoading(false)
        //             navigate(whereTo)
        //         });
        //     } else {
        //         toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
        //         // loader
        //         setCustomLoading(false)
        //         navigate(whereTo)
        //     }
        // }catch (err) {
        //     console.log(err);
        //     toast.error(err.message);
        //     setCustomLoading(false)
        // }
    };

    // waiting time loader
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

// customLoading ||
    if ( isLoading || timeLoading) {
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
                                    handleChangeRole={handleChangeRole}
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