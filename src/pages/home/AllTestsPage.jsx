import { Link } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import useTestsLists from "../../hooks/useTestsLists";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";


const AllTestsPage = () => {

    // tests data source from DB
    const { testsLists, testsLoading } = useTestsLists();

    // Pagination count variables
    const [itemsPerPage, setItemsPerPage] = useState(6); // default showing items per page are 6
    const [currentPage, setCurrentPage] = useState(1); // default showing page is 1
    const [dataCount, setDataCount] = useState();

    const axiosCommon = useAxiosCommon();

    const { data: testsListsCount ,  } = useQuery({
        queryKey: ['testsListsCount'],
        queryFn: async () => {
            const { data } = await axiosCommon(`/testsListsCount?page=${currentPage}&size=${itemsPerPage}`)
            setDataCount(data.counts)
            return data
        }
    })
    const { data: testsListPagination ,  isLoading: paginationLoding} = useQuery({
        queryKey: ['testsListPagination',currentPage, itemsPerPage],
        queryFn: async () => {
            const { data } = await axiosCommon(`/testsListPagination?page=${currentPage}&size=${itemsPerPage}`)
            return data
        }
    })

    // console.log(testsListsCount)
    const numberOfPages = Math.ceil(dataCount/itemsPerPage) ||  0

    // pagination count
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

    // handle pagination button
    const handlePaginationButton = value =>{
        setCurrentPage(value);
        // console.log(value);
        value => 24 && setItemsPerPage(Math.ceil(value/(Math.ceil(value/6))))        
    }

    // loader
    if (paginationLoding) {
        <Loader />
    }


    return (
        <div className="container mx-auto ">

            <div>

            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">

                {
                    testsListPagination?.map(test => {
                        return <div key={test._id}
                            className="card card-compact w-80 bg-base-100 shadow-xl max-h-96 hover:scale-105 hover:border hover:border-primary">
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
                                <button 
                                onClick={() => handlePaginationButton(page)}
                                key={page} type="button" title="Page number" 
                                className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
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