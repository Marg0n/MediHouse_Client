import Loader from "../../components/shared/Loader";
import useTestsLists from "../../hooks/useTestsLists";


const AllTestsPage = () => {

    // tests data source from DB
    const { testsLists, testsLoading } = useTestsLists();

    // console.log(testsLists)

    if (testsLoading) {
        <Loader />
    }

    return (
        <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

            {
                testsLists?.map(test => {
                    return <div key={test._id}
                        className="card card-compact w-96 bg-base-100 shadow-xl max-h-96">
                        <figure className=" ">
                            <img src={test.testImage_url} alt="tests image"  className="rounded-xl w-full " />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{test.test_name}</h2>
                            <p className="text-justify">{test.details}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary animate-pulse hover:animate-none">Details</button>
                            </div>
                        </div>
                    </div>
                })

            }
        </div>
    );
};

export default AllTestsPage;