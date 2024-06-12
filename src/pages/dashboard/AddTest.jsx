import { useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../utils/imageUpload";


const AddTest = () => {

    // custom loader for update
    const [customLoader, setCustomLoader] = useState(false);
    // preview image
    const [imagePreview, setImagePreview] = useState(null);

    const axiosSecure = useAxiosSecure();

    // Date format
    // const [today, setToday] = useState('');

    // useEffect(() => {
    //     const date = new Date();
    //     const year = date.getFullYear();
    //     const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero indexed so we add one
    //     const day = ('0' + date.getDate()).slice(-2); // Pad single digit day values
    //     const currentDate = `${year}-${month}-${day}`;
    //     setToday(currentDate);
    // }, []);

    // react form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // Submit button for updating
    const onSubmit = async (data, e) => {

        const form = e.target;

        const { test_name, details, price, date: test_date, slots } = data;
        // const test_date = moment(date).format("MMM Do YYYY")
        // const testTime = moment(slots, "HH:mm").format('hh:mm A'); // Format time in 12-hour format with AM/PM
        // console.log(testDate, slots,testTime)
        const test_price = parseInt(price)
        const test_slots = parseFloat(slots)
        const image = e.target.test_image.files[0]
        // const test_state = 'pending'; // delivered is another state
        // const test_booked = true;

        try {
            setCustomLoader(true);

            // upload image and get image url        
            const testImage_url = await imageUpload(image);
            // console.log(testImage_url)

            const tests = { test_name, testImage_url, details, test_price, test_date, test_slots };

            // update user data in mongo DB
            const { data: addTest } = await axiosSecure.post(`/addTests`, tests)
            // console.log(addTest)

            if (addTest) {
                Swal.fire({
                    title: `Successfully added the ${test_name}!`,
                    text: `Added the ${test_name}! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    // loader
                    setCustomLoader(false)
                    form.reset(); // Reset the form fields
                    // navigate(whereTo)
                });
            } else {
                toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                // loader
                setCustomLoader(false)
                // navigate(whereTo)
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
            setCustomLoader(false)
        }

    }

    if (customLoader) {
        <Loader />
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>Medi House 🩺 | Add a Test</title>
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
                                                <img src='https://i.ibb.co/kgKXrNv/no-images.jpg' alt='default pic' className='w-16 h-14 ' />
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
                            Date
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

export default AddTest;