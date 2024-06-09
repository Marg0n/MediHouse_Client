import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { MdOutlineChangeCircle } from 'react-icons/md';
import 'animate.css';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { FaDownload } from 'react-icons/fa';

const UsersTable = ({ user, handleChangeRole }) => {


    const { _id, email, name, bloodGroup, district, upazila, status, isAdmin, image_url } = user;


    return (

        <tr>

            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image_url ? image_url : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{ }</div>
                        <div className="text-sm opacity-50">{ }</div>
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>
                {email}
                {/* <br /> */}
                {/* <span className="badge badge-secondary badge-bg">
                    {}
                </span> */}
            </td>
            <td>{bloodGroup}</td>
            <td>{district}</td>
            <td>{upazila}</td>
            <td>{status}</td>
            <td>{isAdmin ? "Admin" : 'User'}</td>
            <td className='flex flex-col items-center gap-4 justify-center'>

                <Link to={`users/${email}`} className='btn bg-error text-base-300 hover:bg-blue-500 hover:text-white animate-pulse btn-xs'>View Details</Link>

                <button
                    onClick={() => handleChangeRole(_id)}
                    data-tooltip-id="role-tooltip"
                    data-tooltip-content="Change Role"
                    className='btn btn-neutral hover:btn-error btn-xs  animate__animated animate__tada animate__infinite hover:animate-none'>
                    <MdOutlineChangeCircle
                        size={20}
                        className='text-primary group-hover:text-secondary'
                    />
                </button>
                <Tooltip id="role-tooltip" />

                <Link
                    to={`download/${_id}`}
                    data-tooltip-id="update-tooltip"
                    data-tooltip-content="Download"
                    className='btn btn-neutral hover:btn-info btn-xs animate__animated  animate__jello animate__infinite hover:animate-none'>
                    <FaDownload
                        size={20}
                        className='text-primary group-hover:text-secondary'
                    />
                </Link>
                <Tooltip id="update-tooltip" />
            </td>
        </tr>

    );
};

UsersTable.propTypes = {
    user: PropTypes.object,
    handleChangeRole: PropTypes.func,
}

export default UsersTable;