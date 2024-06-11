import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { TiArrowBack } from "react-icons/ti";


const TestsDetails = () => {

    const { id } = useParams();
    const axiosSecoure = useAxiosSecure()

    const { data: testsDetails = [], isLoading } = useQuery({
        queryKey: ['testsDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecoure(`/testsLists/${id}`)
            return data
        }
    })

    console.log(testsDetails)
    const testDate = moment(testsDetails[0]?.test_date).format("Do MMM YYYY")

    if (isLoading) {
        <Loader />
    }

    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl lg:space-y-6 md:space-y-4">
                <figure className="lg:w-1/3 w-full">
                    <img className="md:h-full w-full" src={testsDetails[0]?.testImage_url} alt="Test Picture" />
                </figure>
                <div className="card-body lg:w-2/3 space-y-2">
                    <h2 className="card-title">
                        <span className="font-bold font-serif">{testsDetails[0]?.test_name}</span>
                    </h2>
                    <p>Details:
                        <span className="font-bold font-serif"> {testsDetails[0]?.details}</span>
                    </p>
                    <p>Price:
                        <span className="font-bold font-serif"> {testsDetails[0]?.test_price} </span>Taka only
                    </p>
                    <p>Available Slots:
                        <span className="font-bold font-serif"> {testsDetails[0]?.test_slots}</span>
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