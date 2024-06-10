import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useTestsLists = () => {
    
    const axiosCommon = useAxiosCommon();

    const { data: testsLists = [], refetch, isLoading: testsLoading } = useQuery({
        queryKey: ['testsLists'],
        queryFn: async () => {
            const { data } = await axiosCommon(`/testsLists`)
            return data
        }
    })

    return {testsLists, refetch, testsLoading};

};

export default useTestsLists;