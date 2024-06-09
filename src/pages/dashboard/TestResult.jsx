import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";


const TestResult = () => {
    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>Medi House 🩺 | All Test Results</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl font-serif text-center">
                All Test Results!
                </h3>
            </AttentionSeeker>
            
        </div>
    );
};

export default TestResult;