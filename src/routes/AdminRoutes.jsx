import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import Loader from './../components/shared/Loader';
import useUsers from '../hooks/useUsers';

const AdminRoutes = ({children}) => {

    const {user, loading} = useAuth();
    const [userData] = useUsers();
    const location = useLocation();
    // console.log(location)

    if (loading) {
        return <Loader/>;
    }

    if (!user && !userData[0]?.isAdmin) {
        return <Navigate to='/login' state={location?.pathname || '/'} replace={true}/>
    }

    return (
        <div>
            {children}
        </div>
    );
};

AdminRoutes.propTypes = {
    children: PropTypes.node,
}

export default AdminRoutes;