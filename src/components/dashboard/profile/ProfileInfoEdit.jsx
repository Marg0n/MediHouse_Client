import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../shared/Loader";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { TiArrowBack } from "react-icons/ti";
import { imageUpload } from "../../../utils/imageUpload";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import Swal from "sweetalert2";

const ProfileInfoEdit = () => {

    const { user, loading, setLoading, updateUserProfile } = useAuth();
    const axiosCommon = useAxiosCommon()

    // custom loader for update
    const [customLoader, setCustomLoader] = useState(false);

    // preview image
    const [imagePreview, setImagePreview] = useState(null);


    // Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const whereTo = location?.state || '/dashboard';

    // react form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    // Submit button for updating
    const onSubmit = async (data, e) => {

        const { name } = data;
        const image = e.target.avatar.files[0]

        try {
            setLoading(true);

            // upload image and get image url        
            const image_url = await imageUpload(image);
            // console.log(image_url)

            const userInfo = { name, image_url };

            // update user data in mongo DB
            const { data: update } = await axiosCommon.put(`/update/${user?.email}`, userInfo)


            // Add or update other data except email and pass
            updateUserProfile(name, image_url)
                .then(() => {

                    setCustomLoader(true)

                    // mongoDB updates
                    if (update?.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Successfully Updated!',
                            text: 'Updated the Profile Information! 🎉',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                    } else {
                        toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                        // loader
                        setLoading(false)
                        navigate(whereTo)
                    }

                    // Profile updated!
                    toast.success("Profile Update successful!🎉", { autoClose: 3000, theme: "colored" })

                    // loader
                    setLoading(false)
                    setCustomLoader(false)
                    navigate(whereTo)

                }).catch((errors) => {

                    setCustomLoader(false)
                    setLoading(false)
                    // An error occurred
                    const errorMessage = errors.message.split(':')[1].split('(')[0].trim();

                    toast.error(errorMessage, { autoClose: 3000, theme: "colored" });
                    navigate('/registration');
                });

            // console.log(result)

        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
            setLoading(false)
            setCustomLoader(false)
        }

    }

    // waiting time loader
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    if (loading || customLoader || timeLoading) {
        return <Loader />
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-[calc(100vh-50px)] w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center relative'>

            <Helmet>
                <title>Medi House 🩺 | Update Profile</title>
            </Helmet>

            <h3 className='mt-3 text-2xl text-center underline underline-offset-8 '>
                Update Your Profile Information!
            </h3>

            <Link to='/dashboard'>
                <button className="absolute left-4 top-4 btn btn-outline btn-primary">
                    <TiArrowBack size={20} />
                </button>
            </Link>

            <div className='flex w-full mx-auto overflow-hidden lg:max-w-4xl justify-center items-center my-4'>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* name */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='name'
                        >
                            Username
                        </label>
                        <input
                            id='name'
                            autoComplete='name'
                            name='name'
                            defaultValue={user?.displayName}
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            {...register("name", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.name && <span className="text-red-500">Please fill up Name field</span>}
                        </div>
                    </div>

                    {/* photo */}
                    <div className='mt-4'>
                        <label htmlFor='image' className='block mb-2 text-sm  font-medium '>
                            Upload Avatar:
                        </label>

                        <div className="flex gap-8 justify-center items-center">
                            <div>
                                {
                                    imagePreview ? (
                                        <div className='mb-4'>
                                            <img src={imagePreview} alt='Selected Avatar' className='w-16 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2' />
                                        </div>
                                    )
                                        : (
                                            <div className='mb-4'>
                                                <img src={user?.photoURL} alt='Current Avatar' className='w-16 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2' />
                                            </div>
                                        )
                                }
                            </div>

                            <input
                                // required
                                onChangeCapture={e => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                                className=' block w-full px-4 py-2 rounded-lg input  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 file-input-success border-none'
                                type='file'
                                id='avatar'
                                name='avatar'
                                accept='image/*'
                                // defaultValue={user?.photoURL}
                                {...register("avatar", { required: true })}
                            />
                        </div>

                        <div className="mt-1 animate-pulse">
                            {errors.avatar && <span className="text-red-500">Please upload an Avatar</span>}
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className='mt-6'>
                        <button
                            type='submit'
                            className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                        >
                            Update
                        </button>
                    </div>

                </form>



            </div>

        </div>
    );
};

export default ProfileInfoEdit;