import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";


const TestsDetails = () => {

    const { id } = useParams();
    const axiosSecoure = useAxiosSecure()

    const { data: testsDetails = [], isLoading } = useQuery({
        queryKey: ['testsDetails'],
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
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="w-1/3 ">
                <img className="h-full " src={testsDetails[0]?.testImage_url} alt="Test Picture" />
            </figure>
            <div className="card-body w-2/3">
                <h2 className="card-title">{testsDetails[0]?.test_name}</h2>
                <p>Details: {testsDetails[0]?.details}</p>
                <p>Price: {testsDetails[0]?.test_price} Taka only</p>
                <p>Available Slots: {testsDetails[0]?.test_slots}</p>
                <p>Test Date: {testDate}</p>


                <div className="card-actions justify-end">
                    <button
                        disabled={testsDetails[0]?.test_slots <= 0}
                        className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default TestsDetails;