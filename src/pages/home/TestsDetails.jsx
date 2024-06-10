import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";


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

    // console.log(testsDetails[0].test_name)

    if(isLoading) {
        <Loader/>
    }
    
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure><img src={testsDetails[0]?.testImage_url} alt="Test Picture" /></figure>
            <div className="card-body">
                <h2 className="card-title">{testsDetails[0].test_name}</h2>
                <p>Details: {testsDetails[0].details}</p>
                <p>Price: {testsDetails[0].price} Taka only</p>
                <p>Available Slots: {testsDetails[0].slots}</p>
                <p>Test Date: {testsDetails[0].test_date}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default TestsDetails;