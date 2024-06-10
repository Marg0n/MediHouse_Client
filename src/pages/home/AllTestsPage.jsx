import { Link } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import useTestsLists from "../../hooks/useTestsLists";
import { FcNext, FcPrevious } from "react-icons/fc";


const AllTestsPage = () => {

    // tests data source from DB
    const { testsLists, testsLoading } = useTestsLists();

    // console.log(testsLists)


    if (testsLoading) {
        <Loader />
    }

    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className="container mx-auto ">

            <div>

            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

                {
                    testsLists?.map(test => {
                        return <div key={test._id}
                            className="card card-compact w-96 bg-base-100 shadow-xl max-h-96">
                            <figure className=" ">
                                <img src={test?.testImage_url} alt="tests image" className="rounded-xl w-full " />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{test?.test_name}</h2>
                                <p className="text-justify">{test?.details}</p>
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

            <div className="mt-6 mx-auto">
                <div className="flex justify-center space-x-1">

                    {/* previous */}
                    <button title="previous" type="button" className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-secondary  hover:text-white'>

                        <div className='flex items-center -mx-1'>
                            <FcPrevious />
                            <span className='mx-1'>previous</span>
                        </div>

                    </button>

                    {
                        pages.map(page => {
                            return <>
                                <button key={page} type="button" title="Page number" className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                                >{page}</button>
                            </>
                        })
                    }

                    {/* next */}
                    <button title="next" type="button" className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-secondary disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>

                        <div className='flex items-center -mx-1'>
                            <span className='mx-1'>Next</span>
                            <FcNext />
                        </div>

                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllTestsPage;