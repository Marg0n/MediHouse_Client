import { useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../utils/imageUpload";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const UpdateTest = () => {

    // custom loader for update
    const [customLoader, setCustomLoader] = useState(false);
    // preview image
    const [imagePreview, setImagePreview] = useState(null);

    const axiosSecure = useAxiosSecure();

    const { id } = useParams();

    // Navigation
    const navigate = useNavigate();

    const { data: testsUpdate =[], isLoading, refetch } = useQuery({
        queryKey: ['testsUpdate'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/testsLists/${id}`)
            return data
        }
    })


    const imageURL = testsUpdate[0]?.testImage_url
    const testName = testsUpdate[0]?.test_name
    const testsDescription = testsUpdate[0]?.details
    const testPrice = testsUpdate[0]?.test_price
    const testSlots = testsUpdate[0]?.test_slots
    const appointmentsDate = moment(testsUpdate[0]?.test_date).format("Do MMM YYYY")

    // const update = { imageURL, testName, testsDescription, testPrice, appointmentsDate, userMail, testStat }


    // react form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    // Submit button for updating
    const onSubmit = async (data, e) => {


        const { test_name, details, price, date: test_date, slots } = data;
        
        const test_price = parseInt(price)
        const test_slots = parseFloat(slots)
        const image = e.target.test_image.files[0]

        try {
            setCustomLoader(true);

            // upload image and get image url        
            const testImage_url = await imageUpload(image);

            const tests = { test_name, testImage_url, details, test_price, test_date, test_slots };

            // update user data in mongo DB
            const { data } = await axiosSecure.put(`/updateTests/${id}`, tests)
            // console.log(data)

            if (data?.modifiedCount > 0) {
                Swal.fire({
                    title: `Successfully Updated the ${test_name}!`,
                    text: `Updated the ${test_name}! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    // loader
                    setCustomLoader(false)
                    refetch()
                    reset(); // Reset the form fields
                    navigate(-1)
                });
            } else {
                toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                // loader
                setCustomLoader(false)
                // navigate(whereTo)
            }
        }
        catch (err) {
            // console.log(err);
            toast.error(err.message);
            setCustomLoader(false)
        }

    }

    if (customLoader || isLoading) {
        <Loader />
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>Medi House 🩺 | Update Test</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl mt-4 font-serif text-center">
                    Add a Test!
                </h3>
            </AttentionSeeker>

            <div className='flex w-full mx-auto overflow-hidden lg:max-w-4xl justify-center items-center my-4'>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* name */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='name'
                        >
                            Test Name
                        </label>
                        <input
                            id='test_name'
                            autoComplete='test_name'
                            name='test_name'
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            defaultValue={testName }
                            {...register("test_name", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.test_name && <span className="text-red-500">Please fill up Name field</span>}
                        </div>
                    </div>

                    {/* photo */}
                    <div className='mt-4'>
                        <label htmlFor='test_image' className='block mb-2 text-sm  font-medium '>
                            Upload Image
                        </label>

                        <div className="flex gap-8 justify-center items-center">
                            <div>
                                {
                                    imagePreview ? (
                                        <div className='mb-4'>
                                            <img src={imagePreview} alt='Selected Avatar' className='w-16 h-16 ' />
                                        </div>
                                    )
                                        : (
                                            <div className='mb-4'>
                                                <img src={imageURL} alt='default pic' className='w-16 h-14 ' />
                                            </div>
                                        )
                                }
                            </div>

                            <input
                                // required
                                onChangeCapture={e => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                                className=' block w-full px-4 py-2 rounded-lg input  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 file-input-success border-none'
                                type='file'
                                id='test_image'
                                name='test_image'
                                accept='image/*'
                                // defaultValue={user?.photoURL}
                                {...register("test_image", { required: true })}
                            />
                        </div>

                        <div className="mt-1 animate-pulse">
                            {errors.test_image && <span className="text-red-500">Please upload a Test Image</span>}
                        </div>
                    </div>

                    {/* details */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='details'
                        >
                            Details
                        </label>
                        <textarea
                            id='details'
                            autoComplete='details'
                            name='details'
                            className='block w-full px-4 py-2 textarea textarea-bordered h-24 border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            defaultValue={testsDescription }
                            {...register("details", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.details && <span className="text-red-500">Please fill up Details field</span>}
                        </div>
                    </div>

                    {/* price */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='price'
                        >
                            Price
                        </label>
                        <input
                            id='price'
                            autoComplete='price'
                            name='price'
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='float'
                            defaultValue={testPrice }
                            {...register("price", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.price && <span className="text-red-500">Please fill up Price field</span>}
                        </div>
                    </div>

                    {/* date */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='date'
                        >
                            Date {`Previous date: ${appointmentsDate}`}
                        </label>
                        <input
                            id='date'
                            autoComplete='date'
                            name='date'
                            // value={today}
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='date'
                            {...register("date", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.date && <span className="text-red-500">Please fill up Date field</span>}
                        </div>
                    </div>

                    {/* slots */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='slots'
                        >
                            Slots
                        </label>
                        <input
                            id='slots'
                            autoComplete='slots'
                            name='slots'
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='number'
                            defaultValue={testSlots }
                            {...register("slots", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.slots && <span className="text-red-500">Please fill up Number of Slots field</span>}
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className='mt-6'>
                        <button
                            type='submit'
                            className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                        >
                            Add the Test
                        </button>
                    </div>

                </form>



            </div>


        </div>
    );
};

export default UpdateTest;