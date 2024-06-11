import { PropTypes } from 'prop-types';
import 'animate.css';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { FaDownload } from 'react-icons/fa';
import { CgBlock, CgUnblock } from 'react-icons/cg';
import { jsPDF } from "jspdf";

const AppointmentTable = ({ appointment, handleChangeStatus }) => {

    const { _id, imageURL, testName, testsDescription, testPrice, appointmentsDate, userMail, reportStatus } = appointment;

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
        doc.text(`Test Name: ${testName}`, 10, 10);
        // doc.text(`Test Description: ${testsDescription}`, 10, 20);
        doc.text(`testPrice: ${testPrice}`, 10, 30);
        doc.text(`Appointment Date: ${appointmentsDate}`, 10, 40);
        doc.text(`Status: ${reportStatus}`, 10, 50);
        doc.text(`Email: ${userMail}`, 10, 60);

        // Add image if it exists
        if (imageURL) {
            const image = new Image();
            image.crossOrigin = 'Anonymous'; // To avoid CORS issues
            image.src = imageURL;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                const dataURL = canvas.toDataURL('image/png');

                doc.addImage(dataURL, 'PNG', 10, 80, 50, 50); // Adjust size and position as needed
                doc.save(`${testName}.pdf`); // Save with image
            };
            image.onerror = () => {
                doc.save(`${testName}.pdf`); // Save without image if there's an error
            };
        } else {
            doc.save(`${testName}.pdf`); // Save without image if no image_url
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
                                <img src={imageURL ? imageURL : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{ }</div>
                            <div className="text-sm opacity-50">{ }</div>
                        </div>
                    </div>
                </td>
                <td>{testName}</td>
                <td>
                    {testsDescription}
                </td>
                <td>{testPrice}</td>
                <td>{appointmentsDate}</td>
                <td>{reportStatus}</td>

                <td className='flex flex-col items-center gap-4 justify-center '>

                    <div>
                        <button
                            onClick={() => handleChangeStatus(_id, 'canceled')}
                            disabled={reportStatus !== 'pending'}
                            data-tooltip-id="status-tooltip"
                            data-tooltip-content="Cancel Appointment"
                            className={`btn btn-neutral hover:btn-error btn-xs ${reportStatus === 'pending' && 'animate__animated animate__tada animate__infinite'}  hover:animate-none`}>
                            {
                                reportStatus === 'pending' ?
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
                        <Tooltip id="status-tooltip" />
                    </div>

                    {/* pdf */}
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


                </td>
            </tr>
        </>
    );
};

AppointmentTable.propTypes = {
    appointment: PropTypes.object,
    handleChangeStatus: PropTypes.func,
}

export default AppointmentTable;