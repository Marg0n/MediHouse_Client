import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import logo from '/logo_mediHouse.png';
import useAuth from './../../hooks/useAuth';


const Navbar = () => {

  const { loggedOut, user } = useAuth();
  const [theme, setTheme] = useState('cupcake');
  // State to track whether the dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);

  const menuList = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/allBlogs'>All blogs</NavLink></li>
    <li><NavLink to='/featured'>Featured Blogs</NavLink></li>
    {
      user && <>
        <li><NavLink to='/addBlog'>Add Blog</NavLink></li>
        <li><NavLink to='/wishlist'>Wishlist</NavLink> </li>
      </>
    }
    {
      !user && <>
        <li><NavLink to='/registration'>Register</NavLink></li>
      </>
    }
  </>

  const list = <>
    {/* <li>
      <div className='justify-between'>Add Job</div>
    </li> */}
    <li>
      <Link to='/addBlog'>Add Blog</Link>
    </li>
    <li>
      <Link to='/myBlogs'>My Blogs</Link>
    </li>
    <li>
      <Link to='/wishlist'>Wishlist</Link>
    </li>
    <li
      className="rounded-xl p-2 m-2 text-right"
      onClick={loggedOut}
    >
      <button className='bg-base-300 hover:bg-neutral hover:text-white block text-center'>Logout</button>
    </li>
  </>


  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  // set theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme])

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('aqua');
    } else {
      setTheme('cupcake');
    }
  }



  return (
    <div className='navbar bg-base-100 shadow-2xl container px-4 mx-auto my-4 rounded-lg font-serif'>

      {/* burger menu */}
      <div className="">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {menuList}
          </ul>
        </div>
      </div>

      {/* logo and website name */}
      <div className='flex-1'>
        <Link to="/" className='flex gap-2 items-center'>          
            <img className='w-auto h-7 rounded' src={logo} alt='' />
          <span className='font-bold'>Medi House 🩺</span>
        </Link>
      </div>

      {/* nav menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  px-1 space-x-2">
          {menuList}
        </ul>
      </div>

      <div className='flex-1 navbar-end'>

        {/* login */}
        <div className='z-50'>
          {
            user ?

              <div className="dropdown dropdown-end" onClick={toggleDropdown}>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle btn-outline avatar animate-pulse hover:animate-none">
                  <div className="w-10 rounded-full">

                    <img
                      data-tooltip-id="name-tooltip"
                      data-tooltip-content={`${user?.displayName || user?.email}`}
                      referrerPolicy="no-referrer"
                      alt="Tailwind CSS Navbar component"
                      src=
                      {
                        user?.photoURL ? user?.photoURL
                          : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"
                      }
                    />
                    <Tooltip id="name-tooltip" />
                  </div>
                </div>

                {dropdown && (
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[2] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
                    <li >
                      <p className="flex justify-center items-center">
                        Hi, <span className=" text-blue-500 font-serif">
                          {
                            user?.displayName || user?.email
                          }
                        </span>
                      </p>
                    </li>
                    <div className="divider divider-secondary my-0" ></div>
                    {list}
                  </ul>
                )}


              </div>

              : <Link to="/login"
                className="btn btn-outline text-center rounded-3xl hover:bg-neutral animate-pulse hover:text-white hover:border-0 hover:animate-none"
              >
                <GoPerson />
              </Link>
          }

        </div>

        {/* Theme changer */}
        <div>
          <label className="ml-4 swap swap-rotate">

            <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 180, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
              damping: 20
            }}
          >

          </motion.div>
            {/* this hidden checkbox controls the state */}
            <input
              onChange={handleToggle}
              type="checkbox"
              className="theme-controller"
            />

            {/* sun icon */}
            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

            {/* moon icon */}
            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

          </label>
        </div>

      </div>
    </div >
  )
}

export default Navbar