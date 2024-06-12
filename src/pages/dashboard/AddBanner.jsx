import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../utils/imageUpload";


const AddBanner = () => {

    // custom loader for update
    const [customLoader, setCustomLoader] = useState(false);
    // preview image
    const [imagePreview, setImagePreview] = useState(null);

    const axiosSecure = useAxiosSecure();

    // react form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    // Submit button for updating
    const onSubmit = async (data, e) => {

        // const form = e.target;

        const { bannerName, bannerTitle, bannerDescription, bannerCouponCode, bannerCouponRate: banner_CouponRate } = data;
        const bannerCouponRate = parseFloat(banner_CouponRate)
        const image = e.target.bannerImg.files[0]
        const isActive = false ;

        try {
            setCustomLoader(true);

            // upload image and get image url        
            const bannerImage = await imageUpload(image);

            const banner = { bannerName, bannerImage, bannerTitle, bannerDescription, bannerCouponCode, bannerCouponRate: bannerCouponRate, isActive};


            // update user data in mongo DB
            const { data: bannerData } = await axiosSecure.post(`/banners`, banner)

            if (bannerData) {
                Swal.fire({
                    title: `Successfully added the ${bannerName}!`,
                    text: `Added the ${bannerName} Banner! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    // loader
                    setCustomLoader(false)
                    reset();
                    // form.reset(); // Reset the form fields
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
                <title>Medi House 🩺 | Add a Banner</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center">
                    Add a Banner!
                </h3>
            </AttentionSeeker>

            {/* add banner */}
            <div className='flex w-full mx-auto overflow-hidden lg:max-w-4xl justify-center items-center my-4'>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* name */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='bannerName'
                        >
                            Banner Name
                        </label>
                        <input
                            id='bannerName'
                            autoComplete='bannerName'
                            name='bannerName'
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            {...register("bannerName", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.bannerName && <span className="text-red-500">Please fill up Name field</span>}
                        </div>
                    </div>

                    {/* photo */}
                    <div className='mt-4'>
                        <label htmlFor='bannerImg' className='block mb-2 text-sm  font-medium '>
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
                                id='bannerImg'
                                name='bannerImg'
                                accept='image/*'
                                // defaultValue={user?.photoURL}
                                {...register("bannerImg", { required: true })}
                            />
                        </div>

                        <div className="mt-1 animate-pulse">
                            {errors.bannerImg && <span className="text-red-500">Please upload a Test Image</span>}
                        </div>
                    </div>

                    {/* title  */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='bannerTitle'
                        >
                            Title
                        </label>
                        <input
                            id='bannerTitle'
                            autoComplete='bannerTitle'
                            name='bannerTitle'
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            {...register("bannerTitle", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.bannerTitle && <span className="text-red-500">Please fill up Title field</span>}
                        </div>
                    </div>

                    {/* description */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='bannerDescription'
                        >
                            Description
                        </label>
                        <textarea
                            id='bannerDescription'
                            autoComplete='bannerDescription'
                            name='bannerDescription'
                            className='block w-full px-4 py-2 textarea textarea-bordered h-24 border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            {...register("bannerDescription", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.bannerDescription && <span className="text-red-500">Please fill up Description field</span>}
                        </div>
                    </div>

                    {/* Coupon code */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='bannerCouponCode'
                        >
                            Coupon code
                        </label>
                        <input
                            id='bannerCouponCode'
                            autoComplete='bannerCouponCode'
                            name='bannerCouponCode'
                            // value={today}
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            {...register("bannerCouponCode", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.bannerCouponCode && <span className="text-red-500">Please fill up Coupon Code field</span>}
                        </div>
                    </div>

                    {/* coupon rate */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='bannerCouponRate'
                        >
                            Coupon Rate
                        </label>
                        <input
                            id='bannerCouponRate'
                            autoComplete='bannerCouponRate'
                            name='bannerCouponRate'
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='float'
                            {...register("bannerCouponRate", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.bannerCouponRate && <span className="text-red-500">Please fill up Number of Coupon Rate field</span>}
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

export default AddBanner;