import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import 'animate.css';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { FaDownload } from 'react-icons/fa';
import { CgBlock, CgUnblock } from 'react-icons/cg';
import { jsPDF } from "jspdf";

const UsersTable = ({ user, handleChangeRole }) => {


    const { _id, email, name, bloodGroup, district, upazila, status, isAdmin, image_url } = user;

    const handlePDF = () => {

        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF(
            // {
            //     orientation: "landscape",
            //     unit: "in",
            //     format: [4, 2]
            // }
        );

        // Adding text to document
        doc.text(`Name: ${name}`, 10, 10);
        doc.text(`Email: ${email}`, 10, 20);
        doc.text(`Blood Group: ${bloodGroup}`, 10, 30);
        doc.text(`District: ${district}`, 10, 40);
        doc.text(`Upazila: ${upazila}`, 10, 50);
        doc.text(`Status: ${status}`, 10, 60);
        doc.text(`User Level: ${isAdmin ? "Admin" : 'User'}`, 10, 70);

        // Add image if it exists
        if (image_url) {
            const image = new Image();
            image.crossOrigin = 'Anonymous'; // To avoid CORS issues
            image.src = image_url;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                const dataURL = canvas.toDataURL('image/png');

                doc.addImage(dataURL, 'PNG', 10, 80, 50, 50); // Adjust size and position as needed
                doc.save(`${name}.pdf`); // Save with image
            };
            image.onerror = () => {
                doc.save(`${name}.pdf`); // Save without image if there's an error
            };
        } else {
            doc.save(`${name}.pdf`); // Save without image if no image_url
        }

        // doc.save(`${name}.pdf`);
    }


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
                    onClick={() => handleChangeRole(_id, status)}
                    data-tooltip-id="role-tooltip"
                    data-tooltip-content="Change Role"
                    className='btn btn-neutral hover:btn-error btn-xs  animate__animated animate__tada animate__infinite hover:animate-none'>
                    {
                        status === 'active' ?
                            <CgBlock
                                size={20}
                                className='text-primary group-hover:text-secondary'
                            />
                            : <CgUnblock
                                size={20}
                                className='text-primary group-hover:text-secondary'
                            />
                    }
                </button>
                <Tooltip id="role-tooltip" />

                <button
                    onClick={() => handlePDF()}
                    data-tooltip-id="update-tooltip"
                    data-tooltip-content="Download"
                    className='btn btn-neutral hover:btn-info btn-xs animate__animated  animate__jello animate__infinite hover:animate-none'>
                    <FaDownload
                        size={20}
                        className='text-primary group-hover:text-secondary'
                    />
                </button>
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