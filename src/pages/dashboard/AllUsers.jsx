import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { AttentionSeeker } from "react-awesome-reveal";
import UsersTable from "../../components/admin/UsersTable";


const AllUsers = () => {

    const axiosSecoure = useAxiosSecure()

    const { data: allUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecoure('/users')
            return data
        }
    })

    // console.table(allUsers);

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
                                    // handleDelete={handleDelete} 
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