import 'animate.css';
import { jsPDF } from "jspdf";
import { PropTypes } from 'prop-types';
import { FaDownload } from 'react-icons/fa';
import { MdDeleteForever, MdOutlineChangeCircle } from 'react-icons/md';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

const AllBannerTable = ({ banners, handleChangeActive, handleDelete }) => {

    const { _id, bannerName, bannerImage, bannerTitle, bannerDescription, bannerCouponCode, bannerCouponRate, isActive } = banners;

    const handlePDF = () => {

        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();

        // Adding text to document
        doc.text(`Name: ${bannerName}`, 10, 10);
        doc.text(`Title: ${bannerTitle}`, 10, 20);
        doc.text(`Description: ${bannerDescription}`, 10, 30);
        doc.text(`Coupon Code: ${bannerCouponCode}`, 10, 40);
        doc.text(`Coupon Rate: ${bannerCouponRate}`, 10, 50);
        doc.text(`Status: ${isActive}`, 10, 60);

        // Add image if it exists
        if (bannerImage) {
            const image = new Image();
            image.crossOrigin = 'Anonymous'; // To avoid CORS issues
            image.src = bannerImage;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                const dataURL = canvas.toDataURL('image/png');

                doc.addImage(dataURL, 'PNG', 10, 80, 50, 50); // Adjust size and position as needed
                doc.save(`${bannerName}.pdf`); // Save with image
            };
            image.onerror = () => {
                doc.save(`${bannerName}.pdf`); // Save without image if there's an error
            };
        } else {
            doc.save(`${bannerName}.pdf`); // Save without image if no image_url
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
                                <img src={bannerImage ? bannerImage : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{ }</div>
                            <div className="text-sm opacity-50">{ }</div>
                        </div>
                    </div>
                </td>
                <td>{bannerName}</td>
                <td>
                    {bannerTitle}
                </td>
                <td>{bannerDescription}</td>
                <td>{bannerCouponCode}</td>
                <td>{bannerCouponRate}</td>
                <td>
                    <div className='flex flex-col gap-2 justify-center items-center'>

                        {isActive ? "Showing" : 'Hidden'}
                        <br />
                        <button
                            onClick={() => handleChangeActive(_id, !isActive)}
                            data-tooltip-id="isActive-tooltip"
                            data-tooltip-content={isActive ? "Showing" : 'Hidden'}
                            className='btn btn-neutral hover:btn-info btn-xs btn-circle animate__infinite hover:animate-none animate-spin'
                        >
                            <MdOutlineChangeCircle
                                size={20}
                                className='text-primary group-hover:text-secondary'
                            />
                        </button>
                        <Tooltip id="isActive-tooltip" />

                    </div>
                </td>
                <td className='flex flex-col items-center gap-4 justify-center'>

                    <div>
                        <button
                            onClick={() => handleDelete(_id )}
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

                </td>
            </tr>
        </>
    );
};

AllBannerTable.propTypes = {
    banners: PropTypes.object,
    handleChangeActive: PropTypes.func,
    handleDelete: PropTypes.func,
}

export default AllBannerTable;