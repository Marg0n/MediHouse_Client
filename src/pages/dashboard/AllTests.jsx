import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AllTestsTable from "../../components/dashboard/tests/AllTestsTable";

const AllTests = () => {

    const axiosSecure = useAxiosSecure()
    const [customLoading, setCustomLoading] = useState(false);

    const { data: tests, isLoading, refetch } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const { data } = await axiosSecure('/tests')
            return data
        }
    })

    // delete
    const handleDelete = (id) => {
        setCustomLoading(true);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success ml-2",
                cancelButton: "btn btn-danger mr-2"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! 😱",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!😉",
            cancelButtonText: "No, cancel! 😨",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                //delete
                await axiosSecure.delete(`${import.meta.env.VITE_SERVER}/deleteTests/${id}`)
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Test has been deleted! 🥲",
                                icon: "success"
                            });
                            //reset the page 
                            setCustomLoading(false);
                            refetch()
                        }

                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Delete Cancelled!",
                    text: "Test is still there! ✌️",
                    icon: "error"
                });
                setCustomLoading(false);
                refetch()
            }
            setCustomLoading(false);
            refetch()
        });
        setCustomLoading(false);
        refetch()


    };

    // admin role change
    // const handleChangeActive = async (id, newStatus) => {
    //     try {
    //         // loading
    //         setCustomLoading(true);

    //         const { data } = await axiosSecure.put(`/updateBanner/${id}`, { status: newStatus })

    //         if (data?.modifiedCount > 0) {
    //             Swal.fire({
    //                 title: `Successfully Changed the Role!`,
    //                 text: `Role Changed! 🎉`,
    //                 icon: 'success',
    //                 confirmButtonText: 'Cool'
    //             }).then(() => {
    //                 // loader
    //                 setCustomLoading(false)
    //                 refetch()
    //             });
    //         } else {
    //             toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
    //             // loader
    //             setCustomLoading(false)
    //             refetch()
    //         }
    //     }
    //     catch (err) {
    //         // console.log(err);
    //         toast.error(err.response.data, { autoClose: 3000, theme: "colored" });
    //         setCustomLoading(false);
    //         refetch()
    //     }
    // }

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
                <title>Medi House 🩺 | All Tests</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center">
                    Total {tests.length} Tests!
                </h3>
            </AttentionSeeker>

            <div className="overflow-x-auto my-4 mx-auto rounded-lg">
                <table className="table  table-zebra border-2 border-base-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Coupon Code</th>
                            <th>CouponRate</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {/* row  */}
                        {
                            tests?.map((test) => {
                                return <AllTestsTable key={test._id} test={test}
                                    handleDelete={handleDelete}
                                // handleChangeActive={handleChangeActive}
                                />
                            })
                        }

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Coupon Code</th>
                            <th>CouponRate</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default AllTests;