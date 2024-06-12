import 'animate.css';
import { jsPDF } from "jspdf";
import { PropTypes } from 'prop-types';
import { FaDownload } from 'react-icons/fa';
import { MdDeleteForever, MdOutlineChangeCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

const AllTestsTable = ({ handleDelete, test }) => {

    const { _id, test_name, testImage_url, details, test_price, test_date, test_slots } = test;

    const handlePDF = () => {

        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();

        // Adding text to document
        doc.text(`Name: ${test_name}`, 10, 10);
        doc.text(`Details: ${details}`, 10, 20);
        doc.text(`Price: ${test_price}`, 10, 30);
        doc.text(`Date: ${test_date}`, 10, 40);
        doc.text(`Slots: ${test_slots}`, 10, 50);

        // Add image if it exists
        if (testImage_url) {
            const image = new Image();
            image.crossOrigin = 'Anonymous'; // To avoid CORS issues
            image.src = testImage_url;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                const dataURL = canvas.toDataURL('image/png');

                doc.addImage(dataURL, 'PNG', 10, 80, 50, 50); // Adjust size and position as needed
                doc.save(`${test_name}.pdf`); // Save with image
            };
            image.onerror = () => {
                doc.save(`${test_name}.pdf`); // Save without image if there's an error
            };
        } else {
            doc.save(`${test_name}.pdf`); // Save without image if no image_url
        }

        // doc.save(`${name}.pdf`);
    }


    return (
        <>
            <tr>

                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={testImage_url ? testImage_url : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{ }</div>
                            <div className="text-sm opacity-50">{ }</div>
                        </div>
                    </div>
                </td>
                <td>{test_name}</td>
                <td>
                    {details}
                </td>
                <td>{test_price}</td>
                <td>{test_date}</td>
                <td>{test_slots}</td>


                <td className='flex flex-col items-center gap-4 justify-center'>

                    <div>
                        <button
                            onClick={() => handleDelete(_id)}
                            data-tooltip-id="delete-tooltip"
                            data-tooltip-content="Delete"
                            className='btn btn-neutral hover:btn-error btn-xs  animate__animated animate__tada animate__infinite hover:animate-none'>

                            <MdDeleteForever size={20}
                                className='text-primary group-hover:text-secondary' />

                        </button>
                        <Tooltip id="delete-tooltip" />
                    </div>

                    <br />

                    <div>
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
                    </div>

                    <br />

                    <Link
                        to={`testEdit/${_id}`}
                        className='flex flex-col gap-2 justify-center items-center'>

                        <button
                            // onClick={() => handleChangeActive(_id, !isActive)}
                            data-tooltip-id="Update-tooltip"
                            data-tooltip-content='Update'
                            className='btn btn-neutral hover:btn-info btn-xs btn-circle animate__infinite hover:animate-none animate-spin'
                        >
                            <MdOutlineChangeCircle
                                size={20}
                                className='text-primary group-hover:text-secondary'
                            />
                        </button>
                        <Tooltip id="Update-tooltip" />

                    </Link>

                </td>
            </tr>
        </>
    );
};

AllTestsTable.propTypes = {
    test: PropTypes.object,
    handleChangeActive: PropTypes.func,
    handleDelete: PropTypes.func,
}

export default AllTestsTable;