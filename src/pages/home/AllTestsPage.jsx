import { Link } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import { FcNext, FcPrevious, FcSearch } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from "react-helmet-async";
import moment from "moment";
import { useForm } from "react-hook-form";


const AllTestsPage = () => {

    // Pagination count variables
    const [itemsPerPage, setItemsPerPage] = useState(3); // default showing items per page
    const [currentPage, setCurrentPage] = useState(1); // default showing page is 1
    const [dataCount, setDataCount] = useState();

    // search
    const [searchTerm, setSearchTerm] = useState('')

    // filtering
    const [filter, setFilter] = useState('');

    // Date format of today
    const [today, setToday] = useState('');

    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero indexed so we add one
        const day = ('0' + date.getDate()).slice(-2); // Pad single digit day values
        const currentDate = `${year}-${month}-${day}`;
        setToday(currentDate);
    }, []);


    const axiosCommon = useAxiosCommon();

    // pagination 
    const { data: testsListsCount, isLoading: pageNumberLoading } = useQuery({
        queryKey: ['testsListsCount', filter, currentPage, itemsPerPage,searchTerm],
        queryFn: async () => {
            const { data } = await axiosCommon(`/testsListsCount?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&search=${searchTerm}`)
            await setDataCount(data.counts)
            return data
        }
    })

    // data get
    const { data: testsListPagination, isLoading: dataLoading, refetch } = useQuery({
        queryKey: ['testsListPagination', currentPage, itemsPerPage, filter, today,searchTerm],
        queryFn: async () => {
            const { data } = await axiosCommon(`/testsListPagination?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&today=${today}&search=${searchTerm}`)
            return data
        }
    })

    // console.log(testsListsCount)
    const numberOfPages = Math.ceil(dataCount / itemsPerPage) || 1

    // pagination count
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

    // handle pagination button
    const handlePaginationButton = value => {
        setCurrentPage(value);
        // console.log(value);
        { value === 24 && setItemsPerPage(Math.ceil(value / (Math.ceil(value / 6)))) }
    }
    // console.log(typeof(currentPage) , currentPage)


    const {
        register,
        handleSubmit,
        // formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {

        const { name, date } = data;

        setFilter(date)
        setSearchTerm(name)
        // console.log(filter <= today ? 'choto' : 'boro')

        // console.log(date, name, filter)

        refetch();
    }

    // reset
    const handleReset = () => {
        setFilter('')
        setSearchTerm('')
        setCurrentPage(1);
        refetch();
        reset(); // Reset the form fields
        // Reload the page to clear the filters
        // window.location.reload();
    }

    refetch();
    

    // loader
    if (pageNumberLoading || dataLoading) {
        <Loader />
    }


    return (
        <div className="container mx-auto flex flex-col justify-center items-center gap-6">

            <Helmet>
                <title>Medi House 🩺 | All Tests</title>
            </Helmet>


            <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>




                <form
                    className="flex gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/* filtered by date */}
                    <div >
                        <input
                            type="date"
                            name='date'
                            id='date'
                            className='block p-4 w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            {...register("date")}
                        // value={today}
                        />
                    </div>

                    {/* search */}
                    <div className=' '>
                        <label className="input input-bordered  flex items-center gap-2">
                            <input
                                name="name"
                                type="text" className="grow" placeholder="Test Name"
                                {...register("name")}
                            />
                        </label>
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn btn-outline btn-circle animate-pulse">
                        <FcSearch size={20} />
                    </button>
                </form>

                {/* reset */}
                <button
                    onClick={handleReset}
                    className='btn btn-outline btn-secondary'>Reset</button>
            </div>


            {/* cards */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">

                {
                    testsListPagination?.map(test => {
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

            {/* pagination */}
            <div className=" mx-auto">
                <div className="flex justify-center space-x-1">

                    {/* previous */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePaginationButton(currentPage - 1)}
                        title="previous" type="button"
                        className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-secondary  hover:text-white'>

                        <div className='flex items-center -mx-1'>
                            <FcPrevious />
                            <span className='mx-1'>previous</span>
                        </div>

                    </button>

                    {/* number of pages */}
                    {
                        pages.map(page => {
                            return <>
                                <button
                                    onClick={() => handlePaginationButton(page)}
                                    key={page}
                                    type="button"
                                    title="Pagination Button"
                                    className={`hidden ${currentPage == page ? 'bg-blue-500 text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                                >{page}</button>
                            </>
                        })
                    }

                    {/* next */}
                    <button
                        disabled={currentPage === numberOfPages}
                        onClick={() => handlePaginationButton(currentPage + 1)}
                        title="next" type="button"
                        className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-secondary disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>

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