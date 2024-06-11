import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { TiArrowBack } from "react-icons/ti";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const TestsDetails = () => {

    const { id } = useParams();
    const axiosSecoure = useAxiosSecure()
    const { user, loading, setLoading } = useAuth();

    const { data: testsDetails = [], isLoading, refetch } = useQuery({
        queryKey: ['testsDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecoure(`/testsLists/${id}`)
            return data
        }
    })

    // console.log(testsDetails)
    const testID = testsDetails[0]?._id
    const imageURL = testsDetails[0]?.testImage_url
    const testName = testsDetails[0]?.test_name
    const testsDescription = testsDetails[0]?.details
    const testPrice = testsDetails[0]?.test_price
    const testSlots = testsDetails[0]?.test_slots
    const appointmentsDate = testsDetails[0]?.test_date
    const testDate = moment(testsDetails[0]?.test_date).format("Do MMM YYYY")
    const userMail = user?.email
    const reportStatus = 'pending'

    const booking = { testID, imageURL, testName, testsDescription, testPrice, testSlots, appointmentsDate, userMail, reportStatus }


    const handleBookNow = async() => {

        try {
            // loading
            setLoading(true);

            const { data } = await axiosSecoure.post(`/userBookings`,booking)

            if(data) {
                Swal.fire({
                    title: `${testName} Successfully Booked!`,
                    text: `${testName} booking successful! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
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
            toast.error(err.response.data, { autoClose: 5000, theme: "colored" });            
            setLoading(false);
            refetch()
         }
    }

    if (isLoading || loading) {
        <Loader />
    }

    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl lg:space-y-6 md:space-y-4">
                <figure className="lg:w-1/3 w-full">
                    <img className="md:h-full w-full" src={imageURL} alt="Test Picture" />
                </figure>
                <div className="card-body lg:w-2/3 space-y-2">
                    <h2 className="card-title">
                        <span className="font-bold font-serif">{testName}</span>
                    </h2>
                    <p>Details:
                        <span className="font-bold font-serif"> {testsDescription}</span>
                    </p>
                    <p>Price:
                        <span className="font-bold font-serif"> {testPrice} </span>Taka only
                    </p>
                    <p>Available Slots:
                        <span className="font-bold font-serif"> {testSlots}</span>
                    </p>
                    <p>Test Date:
                        <span className="font-bold font-serif"> {testDate}</span>
                    </p>


                    <div className="card-actions justify-between">

                        <Link to='/allTestPage'>
                            <button className="right-4 top-4 btn btn-outline btn-primary">
                                <TiArrowBack size={20} />
                            </button>
                        </Link>

                        <button
                            onClick={handleBookNow}
                            disabled={testsDetails[0]?.test_slots <= 0}
                            className="btn btn-primary">
                            Book Now
                        </button>

                    </div>
                </div>
            </div>

        </>
    );
};

export default TestsDetails;