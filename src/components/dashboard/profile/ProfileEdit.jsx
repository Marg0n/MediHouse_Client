import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../shared/Loader";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUsersProfile from "../../../hooks/useUsersProfile";
import { TiArrowBack } from "react-icons/ti";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const ProfileEdit = () => {

    const { user, loading, setLoading } = useAuth();

    const axiosCommon = useAxiosCommon()
    // User data from DB
    const [userData, , isLoading] = useUsersProfile();

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

    // Submit button for updating
    const onSubmit = async (data) => {
        const { bloodGroup, district, upazila } = data;


        const userInfo = { bloodGroup, district, upazila };
        // console.table(userInfo);

        try {
            setLoading(true);

            // update user data in mongo DB
            const {data: update } = await axiosCommon.put(`/update/${user?.email}`, userInfo)
            // console.table(userInfo);

            if (update?.modifiedCount > 0) {
                Swal.fire({
                    title: 'Successfully Updated!',
                    text: 'Updated the Personal Information! 🎉',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    // loader
                    setLoading(false)
                    navigate(whereTo)
                });
            } else {
                toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" }) 
                // loader
                setLoading(false)               
                navigate(whereTo)
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
            setLoading(false)
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


    if (loading || isLoading || timeLoading) {
        return <Loader />
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-[calc(100vh-50px)] w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center relative'>

            <Helmet>
                <title>Medi House 🩺 | Update Personal Info</title>
            </Helmet>

            <h3 className='mt-3 text-2xl text-center underline underline-offset-8 '>
                Update Your Personal Information!
            </h3>

            <Link to='/dashboard'>
                <button className="absolute left-4 top-4 btn btn-outline btn-primary">
                    <TiArrowBack size={20} />
                </button>
            </Link>

            <div className='flex w-full mx-auto overflow-hidden justify-center items-center my-4'>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* blood group */}
                    <div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text text-primary text-sm font-medium ">Blood Group</span>
                            </div>
                            <select
                                defaultValue={userData[0]?.bloodGroup}
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
                                <span className="label-text text-primary text-sm font-medium ">District</span>
                            </div>
                            <select
                                defaultValue={userData[0]?.district}
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
                                <span className="label-text text-primary text-sm font-medium ">Upazila</span>
                            </div>
                            <select
                                defaultValue={userData[0]?.upazila}
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

export default ProfileEdit;