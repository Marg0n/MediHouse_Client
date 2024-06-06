import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";


const useUsersProfile = () => {

    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const { data: userData = [], refetch } = useQuery({
        queryKey: ['userData', user],
        queryFn: async () => {
            const { data } = await axiosCommon(`/users/${user?.email}`)
            return data
        }
    })

    return [userData, refetch];
};

export default useUsersProfile;