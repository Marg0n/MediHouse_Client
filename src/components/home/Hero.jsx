import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../shared/Loader";
import { Link } from "react-router-dom";


const Hero = () => {

    const axiosSecure = useAxiosSecure()

    // banners
    const { data: banners=[], isLoading: bannerLoader} = useQuery({
        queryKey: ['banners', ],
        queryFn: async () => {
            const { data } = await axiosSecure('/banners')
            return data
        }
    })

    // console.log(banners)

    if (!bannerLoader) {
        <Loader/>
    }


    return (
        <div className="hero min-h-[calc(100vh-210px)]" style={{ backgroundImage: `url(${banners[0]?.bannerImage})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content ">
                <div className="max-w-xl">
                    <h1 className="mb-5 text-5xl font-bold">{banners[0]?.bannerTitle}</h1>
                    <p className="mb-5 text-justify">{banners[0]?.bannerDescription}</p>
                    <div className="flex gap-2 text-2xl justify-center">
                        <p>Apply this : <span className="animate-ping"> {banners[0]?.bannerCouponCode} </span>to get a flat <span className="animate-ping">{banners[0]?.bannerCouponRate}%</span> discount!</p>
                    </div>
                    <Link to='/allTestPage' className="btn btn-primary mt-4">Join Us!</Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;