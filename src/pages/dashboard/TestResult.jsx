import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TestResultTable from "../../components/dashboard/tests/TestResultTable";


const TestResult = () => {

    const { user, loading } = useAuth();
    const axiosSecoure = useAxiosSecure()

    // get user specific appointment data
    const { data: appointmentsResults = [], isLoading } = useQuery({
        queryKey: ['appointmentsResults'],
        queryFn: async () => {
            const { data } = await axiosSecoure(`/appointmentResult/${user?.email}`)
            return data
        }
    })

    // console.log(appointments)

    if (loading || isLoading) {
        <Loader />
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>Medi House 🩺 | All Test Results</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center">
                    All Test Results!
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
                            appointmentsResults?.map(appointmentsResult => {
                                return <TestResultTable key={appointmentsResult._id} appointmentsResult={appointmentsResult}
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

export default TestResult;