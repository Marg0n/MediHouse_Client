import { useEffect, useState } from "react";
import { BsClipboard2DataFill, BsClipboard2PulseFill } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { FcStatistics } from 'react-icons/fc';
import { GiKnightBanner, GiTatteredBanner, GiTestTubes } from 'react-icons/gi';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiTestTubeLine } from 'react-icons/ri';
import { RxMoon, RxSun } from 'react-icons/rx';
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import useUsersProfile from "../../hooks/useUsersProfile";
import useAuth from './../../hooks/useAuth';
import logo from '/logo_mediHouse.png';
import { AiOutlineBars } from "react-icons/ai";


const DashboardNav = () => {

    const { loggedOut, user } = useAuth();

    // Theme specification
    const [theme, setTheme] = useState(localStorage.getItem('theme') || localStorage.setItem('theme', 'winter'));

    const [userData] = useUsersProfile();

    const [isActive, setActive] = useState(false);

    // Sidebar Responsive Handler
    const handleBurgerToggle = () => {
        setActive(!isActive)
    }

    // const { email, name, bloodGroup, district, upazila, status, isAdmin } = userData
    // console.log(userData[0]?.isAdmin);



    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme('dim');
        } else {
            setTheme('winter');
        }
    }
    // set theme
    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme])



    return (
        <>

            {/* Small Screen Navbar */}
            <div className=' flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                className='w-auto h-7 rounded'
                                referrerPolicy='no-referrer' src={logo}
                                alt='logo'
                            // width='100'
                            // height='100'
                            />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleBurgerToggle}
                    className='btn p-4 btn-ghost'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>


            <aside                
                className={`z-10 md:fixed flex flex-col justify-between px-4 py-2 overflow-x-hidden overflow-y-auto bg-base-100 border-r rtl:border-r-0 rtl:border-l w-64 space-y-6 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >

                <div className="mx-auto">
                    {/* logo */}
                    <div className=" mx-auto btn btn-ghost">
                        <Link to="/" className='flex gap-2 items-center'>
                            <img className='w-auto h-7 rounded'
                                referrerPolicy='no-referrer' src={logo} alt='logo' />
                            <span className='font-bold'>Medi House 🩺</span>
                        </Link>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-center mt-6 -mx-2">

                        <div className='mb-4'>
                            <img
                                data-tooltip-id="name-tooltips"
                                data-tooltip-content={`${user?.displayName || user?.email}`}
                                referrerPolicy="no-referrer"
                                className="object-cover w-24 h-24 mx-2 rounded-full avatar ring ring-primary ring-offset-base-100 ring-offset-2 "
                                src={
                                    user?.photoURL ? user?.photoURL
                                        : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"
                                }
                                alt="avatar" />
                            <Tooltip id="name-tooltips" />
                        </div>

                        <h4 className="mx-2 mt-2 font-semibold badge badge-info">
                            {userData[0]?.isAdmin ? "Admin" : "User"}
                        </h4>
                        <h4 className="mx-2 mt-2 font-semibold text-blue-500">
                            {user?.displayName}
                        </h4>
                        <p className="mx-2 mt-1 text-sm font-medium text-error">
                            {user?.email}
                        </p>
                    </div>

                    {/* Theme changer */}
                    <div className="flex justify-center items-center mt-6">
                        <label className="swap swap-rotate">

                            {/* this hidden checkbox controls the state */}
                            <input
                                onChange={handleToggle}
                                type="checkbox"
                                className="theme-controller"
                            />

                            {
                                theme == "winter" ? <>< RxSun className=" fill-current w-5 h-5" /></>
                                    : <> <RxMoon className=" fill-current w-5 h-5" /></>
                            }
                            {/* {
                            theme == "winter" && <>< RxSun className="swap-off fill-current w-5 h-5" /></>
                        }
                        {
                            theme == "dim" && <> <RxMoon className="swap-on fill-current w-5 h-5" /></>
                        } */}


                        </label>
                    </div>
                </div>

                <div className="divider divider-accent my-2" ></div>

                {/* user option */}
                <div className="flex flex-col justify-between flex-1">
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to='/dashboard'
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                        }`
                                    }
                                >
                                    <MdSpaceDashboard size={22} />

                                    <span className="mx-4 font-medium ">My profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='appointments'
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                        }`
                                    }
                                >
                                    <BsClipboard2DataFill size={22} />

                                    <span className="mx-4 font-medium">Upcoming Appointments</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='testResults'
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                        }`
                                    }
                                >
                                    <BsClipboard2PulseFill size={22} />

                                    <span className="mx-4 font-medium">Test results</span>
                                </NavLink>
                            </li>
                            {userData[0]?.isAdmin && <>
                                <li>
                                    <NavLink
                                        to='allUsers'
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                            }`
                                        }
                                    >
                                        <FaUsers size={22} />

                                        <span className="mx-4 font-medium">All Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='addTest'
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                            }`
                                        }
                                    >
                                        <RiTestTubeLine size={22} />

                                        <span className="mx-4 font-medium">Add a Test</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='allTests'
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                            }`
                                        }
                                    >
                                        <GiTestTubes size={22} />

                                        <span className="mx-4 font-medium">All tests</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='addBanner'
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                            }`
                                        }
                                    >
                                        <GiTatteredBanner size={22} />

                                        <span className="mx-4 font-medium">Add Banner</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='allBanners'
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                            }`
                                        }
                                    >
                                        <GiKnightBanner size={22} />

                                        <span className="mx-4 font-medium">All Banners</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='statistics'
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
                                            }`
                                        }
                                    >
                                        <FcStatistics size={22} />

                                        <span className="mx-4 font-medium">Statistics</span>
                                    </NavLink>
                                </li>
                            </>
                            }
                        </ul>
                    </nav>
                </div>

                <div className="divider divider-accent my-2" ></div>

                {/* logout */}
                <div className="flex items-center justify-between  px-4 py-2 transition-colors duration-300 transform rounded-lg  hover:bg-primary hover:text-base-300">
                    <button
                        onClick={loggedOut}
                        className="flex items-center gap-x-2 ">
                        <img
                            referrerPolicy='no-referrer'
                            className="object-cover rounded-full h-7 w-7 avatar ring ring-secondary ring-offset-base-100 ring-offset-2 "
                            src={
                                user?.photoURL ? user?.photoURL
                                    : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"
                            }
                            alt="avatar"
                        />
                        <span className="text-sm font-medium ">{user?.displayName}</span>
                    </button>

                    <IoLogOutOutline size={25} />
                </div>
            </aside>
        </>
    )
}

export default DashboardNav