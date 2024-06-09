import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Loader from "../shared/Loader";


const ViewDetails = () => {

    const { email } = useParams()
    const axiosCommon = useAxiosCommon()

    // Navigation
    const navigate = useNavigate();


    const { data: singleUser = [], isLoading } = useQuery({
        queryKey: ['singleUser', email],
        queryFn: async () => {
            const { data } = await axiosCommon(`/users/${email}`)
            return data
        }
    })

    // console.log(singleUser)

    if (isLoading) {
        <Loader />
    }

    return (
        <div
            className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center relative'
        >
            <Helmet>
                <title>Medi House 🩺 | Profile of {`${singleUser?.name}`}</title>
            </Helmet>

            <button onClick={() => navigate(-1)}>
                <button className="absolute left-4 top-4 btn btn-outline btn-primary">
                    <TiArrowBack size={20} />
                </button>
            </button>

            {/* display pic, name and mail */}
            <div className=''>
                <div className="flex flex-col items-center mt-6 -mx-2">

                    <div className='mb-4'>
                        <img
                            data-tooltip-id="name-tooltips"
                            data-tooltip-content={`${singleUser[0]?.name || singleUser[0]?.email}`}
                            referrerPolicy="no-referrer"
                            className="object-cover w-24 h-24 mx-2 rounded-full avatar ring ring-primary ring-offset-base-100 ring-offset-2 "
                            src={
                                singleUser[0]?.image_url ? singleUser[0]?.image_url
                                    : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"
                            }
                            alt="avatar" />
                        <Tooltip id="name-tooltips" />
                    </div>

                    <h4 className="mx-2 mt-2 font-semibold badge badge-info">
                        {singleUser[0]?.isAdmin ? "Admin" : "User"}
                    </h4>
                    <h4 className="mx-2 mt-2 font-semibold text-blue-500">
                        {singleUser[0]?.name}
                    </h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-error">
                        {singleUser[0]?.email}
                    </p>
                </div>
                {/* const { email, name, bloodGroup, district, upazila, status, isAdmin } = userData */}

            </div>

            <div className='flex w-full items-center justify-center gap-16 '>

                <div>
                    <p className='text-base font-serif font-semibold'>Blood Group :</p>
                    <p className='text-base font-serif font-semibold'>District :</p>
                    <p className='text-base font-serif font-semibold'>Upazila :</p>
                </div>

                <div>
                    <p>{singleUser[0]?.bloodGroup}</p>
                    <p>{singleUser[0]?.district}</p>
                    <p>{singleUser[0]?.upazila}</p>
                </div>

            </div>

        </div>
    );
};

export default ViewDetails;