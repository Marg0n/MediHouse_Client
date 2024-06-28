import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { TiArrowBack } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/shared/Loader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/payments/CheckoutForm";
import { useState } from "react";



// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY_CLIENT);



const TestsDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const { user, loading, setLoading } = useAuth();

    // modal close/open
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const { data: testsDetails = [], isLoading, refetch } = useQuery({
        queryKey: ['testsDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/testsLists/${id}`)
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

    const booking = { testID, imageURL, testName, testsDescription, testPrice, appointmentsDate, userMail, reportStatus }


    const handleBookNow = async () => {

        try {
            // loading
            setLoading(true);

            const { data } = await axiosSecure.post(`/userBookings`, booking)

            if (data) {
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
            } else {
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

                        {/* <button
                            onClick={handleBookNow}
                            disabled={testsDetails[0]?.test_slots <= 0}
                            className="btn btn-primary">
                            Book Now
                        </button> */}

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="my_modal_1" className="modal" open={isOpen} onClose={closeModal}>

                            <div className="modal-box">
                                <h3 className="font-bold text-lg text-center mb-4">Pay to Book!</h3>
                                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}

                                <Elements stripe={stripePromise}>
                                    <CheckoutForm testPrice={testPrice} refetch={refetch} closeModal={closeModal} booking={booking} handleBookNow={handleBookNow}/>
                                </Elements>

                                <div className="modal-action">
                                    <form method="dialog" className="w-full">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-error w-full">Close</button>
                                    </form>
                                </div>
                            </div>

                        </dialog>
                        <button
                            className="btn btn-primary"
                            disabled={testsDetails[0]?.test_slots <= 0}
                            // onClick={() => document.getElementById('my_modal_1').showModal()}
                            onClick={() => setIsOpen(true)}
                        >
                            Book Now
                        </button>

                    </div>
                </div>
            </div>

        </>
    );
};

export default TestsDetails;