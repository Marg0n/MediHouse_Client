// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
// import { PropTypes } from 'prop-types';
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { AttentionSeeker } from "react-awesome-reveal";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loader from '../shared/Loader';
import { useQuery } from '@tanstack/react-query';

const Slider = () => {

    const axiosSecure = useAxiosSecure()

    // banners
    const { data: bannersSlider=[], isLoading: bannerLoader} = useQuery({
        queryKey: ['bannersSlider', ],
        queryFn: async () => {
            const { data } = await axiosSecure('/bannersSlider')
            return data
        }
    })


    if (bannerLoader) {
        <Loader/>
    }

    // console.log('southeastAsia', showSliders)

    const [typeEffect] = useTypewriter({
        words: ['for any kind of stress!', 'to gain new view of health!', 'to gain healthy!'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 40,
    })



    return (
        <>
            <AttentionSeeker effect='flash' >
                <h1 className='text-3xl font-bold text-center my-10 uppercase'>
                    You can just Visit us {' '}
                    <span className='text-rose-500'>{typeEffect}</span>

                    <span className=''>
                        <Cursor cursorStyle='🖋️' cursorBlinking={false} />
                    </span>

                </h1>
            </AttentionSeeker>

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[FreeMode, Autoplay, Pagination, Navigation]}
                loop={true}
                className="mySwiper"
            >

                {
                    bannersSlider?.map(showSlider => {

                        return <SwiperSlide
                            key={showSlider._idx}
                            style={{
                                'position': 'relative',

                            }}
                        >
                            <img className='h-96 w-full' src={showSlider.bannerImage} alt="" />
                            <div className='absolute bottom-4 right-4 p-6 text-primary font-serif text-right'>
                                <div className="text-3xl font-bold">
                                    {showSlider.bannerName}
                                </div>
                                <div className="text-xl font-semibold">
                                    {showSlider.bannerTitle}
                                </div>
                                {/* <div className="text-base font-semibold" >
                                    <p>
                                        {showSlider.description}
                                    </p>
                                </div> */}
                            </div>
                        </SwiperSlide>
                    })
                }


            </Swiper>

        </>
    );
};

// Slider.propTypes = {
//     showSliders: PropTypes.array,
// }

export default Slider;