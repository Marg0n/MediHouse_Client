import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AttentionSeeker } from "react-awesome-reveal";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Loader from "../shared/Loader";
import { Link } from "react-router-dom";
import moment from "moment";

const Featured = () => {

    const axiosCommon = useAxiosCommon()


    // data get
    const { data: tests=[], isLoading: dataLoading } = useQuery({
        queryKey: ['tests',],
        queryFn: async () => {
            const { data } = await axiosCommon(`/tests`)
            return data
        }
    })


    // Sort blogs by the length of long_description in descending order
    const sortedTests = [...tests].sort((a, b) => b.details.length - a.details.length);


    // Select the first 6 blogs
    const last6Tests = sortedTests.slice(-6);
    // const last10Blogs = sortedBlogs.slice(0, 10);


    // loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading || dataLoading) {
        return <Loader />
    }

    return (
        <div>
            <Helmet>
                <title>Medi House 🩺 | Featured</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-center font-bold text-3xl font-serif">
                    Our top {last6Tests.length} Featured Tests
                </h3>
            </AttentionSeeker>

            {/* // last10Tests.map((blog, index) => {
                            //     return <FeaturedComponent key={index} blog={blog}
                            //         index={index + 1} />
                            // }) */}

            {/* cards */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-12">

                {
                    last6Tests?.map(test => {
                        return <div key={test._id}
                            className="card card-compact w-80 bg-base-100 shadow-xl max-h-96 hover:scale-105 hover:border hover:border-primary">
                            <figure className=" ">
                                <img src={test?.testImage_url} alt="tests image" className="rounded-xl w-full " />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{test?.test_name}</h2>
                                <p className="text-justify">{test?.details.substring(0, 100)}......</p>
                                <div className="text-start w-full">
                                    <p className="flex justify-between">
                                        <span>Price :</span>
                                        <span className="font-semibold font-serif">
                                            {test?.test_price} Taka only
                                        </span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Available Slots :</span>
                                        <span className="font-semibold font-serif"> {test?.test_slots}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Test Date :</span>
                                        <span className="font-semibold font-serif"> {moment(test?.test_date).format("Do MMM YYYY")}</span>
                                    </p>
                                </div>
                                <div className="card-actions justify-end">
                                    <Link
                                        to={`/testDetails/${test._id}`}
                                        className="btn btn-primary animate-pulse hover:animate-none">Details</Link>
                                </div>
                            </div>
                        </div>
                    })

                }
            </div>

        </div>
    );
};

export default Featured;