import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from "react-helmet-async";
import { AttentionSeeker } from "react-awesome-reveal";


const AllUsers = () => {

    // const axiosSecoure = useAxiosSecure()
    const axiosSecoure = useAxiosCommon()

    const { data: allUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecoure('/users')
            return data
        }
    })

    console.table(allUsers);

    return (
        <div>
            <Helmet>
                <title>Medi House 🩺 | All Users Info</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center mb-8">
                    All Users List!
                </h3>
            </AttentionSeeker>


            <div className="overflow-x-auto my-12">
                <table className="table  table-zebra border-2 border-base-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Blood Group</th>
                            <th>District</th>
                            <th>Upazila</th>
                            <th>Status</th>
                            <th>User Level</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {/* row  */}
                        {
                            // allUsers.map((blog, index) => {
                            //     return <WishlistCard key={index} blog={blog}
                            //         handleDelete={handleDelete} />
                            // })
                        }

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Blood Group</th>
                            <th>District</th>
                            <th>Upazila</th>
                            <th>Status</th>
                            <th>User Level</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;