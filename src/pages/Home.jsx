"usue clients"
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { AttentionSeeker } from "react-awesome-reveal";
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import Loader from "../components/shared/Loader";
import Hero from "../components/home/Hero";
import Slider from "../components/home/Slider";
import Compliments from "../components/home/Compliments";



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
        words: ['Get Some Awesome',' Life saving Story !', 'have new friends!', 'gain great and',' healthy life style!', 'can feel like you can', 'do Whatever you think!'],
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
                        The Best  Hospital where you{' '}
                        <span className='text-rose-500'>{typeEffect}</span>

                        <span className=''>
                            <Cursor cursorStyle='💉' cursorBlinking={false} />
                        </span>

                    </h1>
                </AttentionSeeker>

                {/* banner */}
                <div className="my-16">
                    <Hero />
                </div>


                {/* slider */}
                <div className="my-16">
                    <div className="text-center my-6 space-y-4">
                        <AttentionSeeker effect='jello' >
                            <h3 className="text-3xl font-serif text-center">
                                Have a look at our Featured Categories!
                            </h3>
                        </AttentionSeeker>
                        <p className="text-base">Take a look at some of our recommended Tests!</p>
                    </div>

                    <div className='h-[calc(dvh-380px)] my-4'>
                        <Slider />
                    </div>

                </div>


                {/* what to expect */}
                <div className="my-16">
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
                </div>
            </div>
        </>
    );
};

export default Home;