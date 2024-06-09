import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUsersProfile = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: userData = [], refetch, isLoading } = useQuery({
        queryKey: ['userData', user],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/${user?.email}`)
            return data
        }
    })

    return [userData, refetch, isLoading];
};

export default useUsersProfile;