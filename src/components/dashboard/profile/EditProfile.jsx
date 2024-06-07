import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../shared/Loader";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";


const EditProfile = () => {

    const { user, loading, setLoading, updateUserProfile } = useAuth();
    const profilePhoto = user?.photoURL;

    const { email } = useParams();
    const axiosCommon = useAxiosCommon()

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const whereTo = location?.state || '/';

    // react form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const pass = watch('password');


    const { data: districts = [] } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const { data } = await axios('/districts.json')
            return data
        }
    })

    const { data: upazilas = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const { data } = await axios.get('/upazilas.json')
            return data
        }
    })

    //get data from server
    const { data: userProfile = [], isLoading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const { data } = await axiosCommon(`/users/${email}`)
            return data
        }
    })

    console.table(userProfile);

    const onSubmit = async (data, e) => {
        const { name, bloodGroup, district, upazila } = data;

        const image = e.target.avatar.files[0]
        const formData = new FormData();
        formData.append('image', image)
        // console.log(formData);


        // console.table({ email, password, name, bloodGroup, district, upazila, status, formData });
        const userInfo = { email, name, bloodGroup, district, upazila };

        try {
            setLoading(true);
            // upload image and get image url
            const { data: pic } = await axiosCommon.update(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            )

            // insert user data in mongo DB
            await axiosCommon.post('/users', userInfo)
            console.table(userInfo);


            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()[\]{}|\\;:'",.<>/?~])(?=.{6,})/.test(password)) {

                // console.log(watch('password'))
                return toast.warning(
                    `Password must contain 
                an Uppercase, 
                a Lowercase, 
                a numeric character, 
                a special character 
                and Length must be at least 6 characters long!`,
                    { autoClose: 4000, theme: "colored" })
            }


            // Add or update other data except email and pass
            updateUserProfile(name, pic.data.display_url)
                .then(async () => {

                    setCustomLoader(true)

                    // Profile updated!
                    toast.success("Registration successful!🎉", { autoClose: 3000, theme: "colored" })
                    toast.info("Try to Login! 😁", { autoClose: 5000, theme: "colored" })

                    // loader
                    setCustomLoader(false)
                    loggedOut();
                    navigate('/login')

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
        }

    }

    // insert user data in mongo DB



    // console.log(tourSpot);

    // update tour spot
    // const handleUpdate = async e => {
    //     e.preventDefault();

    //     const form = e.target;
    //     //getting value
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const photo = form.photo.value;
    //     const title = form.title.value;
    //     const category = form.category.value;
    //     const short_description = form.short_description.value;
    //     const long_description = form.long_description.value;

    //     const updateBlog = { name, email, writersPhoto: profilePhoto, photo, title, category, short_description, long_description };

    //     // console.log(updateBlog)

    //     try {
    //         const {data} = await axios.put(`${import.meta.env.VITE_SERVER}/update/${email}`, updateBlog)
    //             // .then(res => res.json())
    //             // .then(data => {
    //                 // console.log(data); 
    //                 if (data?.modifiedCount > 0) {
    //                     Swal.fire({
    //                         title: 'Successfully Updated!',
    //                         text: 'Updated the Blog! 🎉',
    //                         icon: 'success',
    //                         confirmButtonText: 'Cool'
    //                     }).then(() => {
    //                         navigate('/myBlogs'); // navigate
    //                     });
    //                 }else {
    //                     toast.warning('Something went Wrong!',{ autoClose: 2000, theme: "colored" })
    //                 }
    //             // })
    //     }
    //     catch (err) {
    //         toast.error(err.message,{ autoClose: 2000, theme: "colored" })
    //     }

    // }

    // loader
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);

    //     return () => clearTimeout(timer);
    // }, []);

    if (loading || isLoading) {
        return <Loader />
    }

    return (
        < >

            <Helmet>
                <title>Medi House 🩺 | Update Profile</title>
            </Helmet>

            <div className='flex w-full mx-auto overflow-hidden bg-base-100 rounded-lg shadow-lg  lg:max-w-4xl  border border-base-300'>

                <h3 className='mt-3 text-xl text-center  '>
                    Update Your Profile Information!
                </h3>

                <div className='divider'></div>

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

                    {/* blood group */}
                    <div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Blood Group</span>
                            </div>
                            <select
                                defaultValue={userProfile?.bloodGroup}
                                className="select select-bordered w-full rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                name="bloodGroup"
                                {...register("bloodGroup", { required: true })}
                            >
                                <option value="">Select Blood Group</option>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>
                            </select>
                        </label>
                        <div className="mt-1 animate-pulse">
                            {errors.bloodGroup && <span className="text-red-500">Please select a Blood Group</span>}
                        </div>
                    </div>

                    {/* district */}
                    <div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">District</span>
                            </div>
                            <select
                                defaultValue={userProfile?.district}
                                className="select select-bordered w-full rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                name="district"
                                {...register("district", { required: "Please select a District" })}
                            >
                                <option value="">Select District</option>
                                {
                                    districts.map(district => {
                                        return (<option key={district.id}
                                            value={`${district.name}`}
                                        //  value={(e)=> e.target.value}
                                        >{district.name}</option>)
                                    })
                                }

                            </select>
                        </label>
                        <div className="mt-1 animate-pulse">
                            {errors.district && <span className="text-red-500">{errors.district.message}</span>}
                        </div>
                    </div>

                    {/* upazila */}
                    <div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Upazila</span>
                            </div>
                            <select
                                defaultValue={userProfile?.upazila}
                                className="select select-bordered w-full rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                name="upazila"
                                {...register("upazila", { required: true })}
                            >
                                <option value="">Select Upazila</option>
                                {
                                    upazilas.map(upazila => {
                                        return (<option key={upazila.id}
                                            value={`${upazila.name}`}
                                        >{upazila.name}</option>)
                                    })
                                }
                            </select>
                        </label>
                        <div className="mt-1 animate-pulse">
                            {errors.upazila && <span className="text-red-500">Please select a Upazila</span>}
                        </div>
                    </div>

                    {/* photo */}
                    <div className='mt-4'>
                        <label htmlFor='image' className='block mb-2 text-sm  font-medium '>
                            Upload Avatar:
                        </label>

                        <input
                            // required
                            className=' block w-full px-4 py-2 rounded-lg input  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 file-input-success border-none'
                            type='file'
                            id='avatar'
                            name='avatar'
                            accept='image/*'
                            {...register("avatar", { required: true })}
                        />
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
                            Register
                        </button>
                    </div>

                </form>

                <div className='flex items-center justify-between mt-4'>
                    <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>

                    <Link
                        to='/login'
                        className='text-xs text-rose-700 uppercase  hover:underline font-semibold animate-pulse'
                    >
                        Log In
                    </Link>

                    <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>
                </div>

            </div>

        </>
    );
};

export default EditProfile;