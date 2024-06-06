import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";


const useUsers = () => {

    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const { data: userData = [],refetch } = useQuery({
        queryKey: ['userData', user],
        queryFn: async () => {
            const { data } = await axiosCommon(`/users/${user?.email}`)
            return data
        }
    })

    return [userData, refetch];
};

export default useUsers;