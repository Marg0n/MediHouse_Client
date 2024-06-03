"usue clients"
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
// import { motion } from "framer-motion";
import { AttentionSeeker } from "react-awesome-reveal";
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import Loader from "../components/shared/Loader";



const Home = () => {

    
    // loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const [typeEffect] = useTypewriter({
        words: ['Some Awesome Story!', 'About Your New Work!', 'About New Discoveries!', 'Whatever you think!'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 40,
    })

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="my-4" >
                <Helmet>
                    <title>Medi House 🩺 | Home</title>
                </Helmet>


                <AttentionSeeker effect='flash' >
                    <h1 className='text-3xl font-bold text-center my-10 uppercase'>
                        You can find, read or write{' '}
                        <span className='text-rose-500'>{typeEffect}</span>

                        <span className=''>
                            <Cursor cursorStyle='🖋️' cursorBlinking={false} />
                        </span>

                    </h1>
                </AttentionSeeker>

                {/* banner */}
                <div className="my-16">
                    {/* <Hero /> */}
                </div>

                {/* recent 6 blogs */}
                {/* <div className="my-16">
                    <div className="text-center my-6 space-y-4">
                        <AttentionSeeker effect='rubberBand' >
                            <h3 className="text-3xl font-serif text-center">
                                Check out some of the Recent Blogs!
                            </h3>
                        </AttentionSeeker>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 my-12 px-4">
                        {
                            allBlogs.slice(-6).reverse().map((Blog, index) => {
                                return <RecentBlogs key={index} Blog={Blog} />
                            })
                        }
                    </div>

                </div> */}

                {/* newsletter */}
                {/* <div className="my-16">
                    <div className="text-center my-6 space-y-4">
                        <AttentionSeeker effect='headShake' >
                            <h3 className="text-3xl font-serif text-center">
                                Subscribe for updates!
                            </h3>
                        </AttentionSeeker>
                    </div>

                    <Newsletter />
                </div> */}

                {/* slider */}
                {/* <div className="my-16">
                    <div className="text-center my-6 space-y-4">
                        <AttentionSeeker effect='jello' >
                            <h3 className="text-3xl font-serif text-center">
                                Have a look at our Featured Categories!
                            </h3>
                        </AttentionSeeker>
                        <p className="text-base">Take a look at some of our recommended featured Blogs!</p>
                    </div>

                    <div className='h-[calc(dvh-380px)] my-4'>
                        <Slider allBlogs={allBlogs} />
                    </div>

                </div> */}


                {/* what to expect */}
                {/* <div className="my-16">
                    <div className="text-center my-6 space-y-4">
                        <AttentionSeeker effect='heartBeat' >
                            <h3 className="flex text-3xl font-serif items-center justify-center mb-8">
                                People
                                <motion.div
                                    className="box"
                                    animate={{
                                        scale: [1, 2, 2, 1, 1],
                                        rotate: [0, 0, 180, 180, 0],
                                        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.2, 0.5, 0.8, 1],
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                >
                                    ❤️
                                </motion.div>
                                Medi House 🩺!
                            </h3>
                        </AttentionSeeker>


                        <Compliments />
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default Home;