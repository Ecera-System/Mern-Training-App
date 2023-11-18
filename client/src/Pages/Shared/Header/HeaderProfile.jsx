import React, { useContext, useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import NotificationIcon from './NotificationIcon';
import useGetProfile from '../../../API/useGetProfile';
import { contextProvider } from '../../../Context/ContextProvider';

const HeaderProfile = () => {
    const { setIsLoggedIn } = useContext(contextProvider);
    const [profileData] = useGetProfile();
    const [openProfile, setOpenProfile] = useState(false);


    return (<>
        <li className='relative flex items-center lg:justify-center justify-start lg:gap-7 pl-5'>

            <div className='lg:flex items-center justify-center gap-7 hidden'>

                {/* <!-- Notifications --> */}
                <NotificationIcon />
            </div>

            {/* <!-- Profile --> */}
            <button
                onClick={() => setOpenProfile(!openProfile)}
                className='w-10 h-10 border-2 border-violet-600 hover:border-violet-400 duration-300 rounded-full overflow-hidden'
            >
                <img
                    src={profileData?.avatar ?
                        (
                            profileData?.avatar?.includes("/images/") ?
                                import.meta.env.VITE_API_V1_URL + profileData?.avatar
                                : profileData?.avatar
                        )
                        : '/images/nav/avatar.png'
                    }
                    alt="avatar"
                    className='w-10 h-10 max-w-full object-cover'
                />
            </button>

            <ul
                className={`list-none absolute top-12 z-50 lg:right-0 lg:left-auto left-0 w-72 h-auto p-5 bg-white text-gray-600 rounded-md shadow-[0_8px_15px_-1px_rgb(0,0,0,0.3)] lg:origin-top-right origin-top-left duration-300
                ${openProfile ? 'scale-100' : 'scale-0'}
                `}
            >
                <li className='h-auto p-5 shadow-[0_2px_10px_5px_rgb(0,0,0,0.1)] rounded-md text-center mb-5'>
                    <div className='w-20 h-20 mx-auto border-2 border-violet-600 rounded-full overflow-hidden'>
                        <img
                            src={profileData?.avatar ?
                                (
                                    profileData?.avatar?.includes("/images/") ?
                                        import.meta.env.VITE_API_V1_URL + profileData?.avatar
                                        : profileData?.avatar
                                )
                                : '/images/nav/avatar.png'
                            }
                            alt="avatar"
                            className='w-20 h-20 max-w-full object-cover'
                        />
                    </div>
                    <h2 className='text-lg font-medium mt-3 capitalize'>
                        {profileData?.userId?.role === 'admin' ? 'Admin' : profileData?.userId?.name}
                    </h2>
                    {
                        profileData?.userId?.role !== 'admin' &&
                        <p className='text-sm mt-1'>
                            {profileData?.userId?.role}
                        </p>
                    }
                </li>
                <li>
                    <NavLink
                        to='/profile'
                        className='w-full h-auto py-3 px-5 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                        end
                    >
                        <FiUser className='text-lg' />My Profile
                    </NavLink>
                </li>
                <li>
                    <button
                        onClick={() => {
                            localStorage.removeItem('auth_token');
                            setIsLoggedIn(false);
                        }}
                        className='w-full h-auto py-3 px-5 text-base hover:text-violet-600 hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                    >
                        <FiLogOut className='text-lg' />Sign Out
                    </button>
                </li>
            </ul>
        </li>
    </>);
};

export default HeaderProfile;