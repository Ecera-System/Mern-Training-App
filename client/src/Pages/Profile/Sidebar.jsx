import { BsJournalCode } from 'react-icons/bs';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { MdOutlineAssignment } from 'react-icons/md';
import { RiHistoryFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import useGetProfile from '../../API/useGetProfile';
import Spinner from '../Shared/Spinner/Spinner';
// import { SlBadge } from 'react-icons/sl';
// import { BsCurrencyDollar } from 'react-icons/bs';
const Sidebar = () => {
    const [profileData, loading] = useGetProfile();
    const navigate = useNavigate();

    if (loading) return <Spinner />;

    const { name, avatar, userId } = profileData;


    const handleSignOut = () => {
        localStorage.removeItem('auth_token');
        navigate('/sign-in');
    };

    return (<>
        <ul className='list-none h-screen max-h-full overflow-y-auto scrollBar-sm lg:p-6 p-2 text-gray-600'>
            <li className='lg:block hidden pt-2 pb-6 border-b mb-4'>
                <div className='flex justify-center'>
                    <img
                        src={avatar ?
                            (avatar.includes("/images/") ? import.meta.env.VITE_API_V1_URL + avatar : avatar)
                            : '/images/nav/avatar.png'
                        }
                        alt="Avatar"
                        className='w-20 h-20 max-w-full object-cover rounded-full'
                    />
                </div>
                <h3 className='text-base font-semibold text-center mt-3'>
                    {name}
                </h3>
                <p className='text-sm text-gray-500 text-center mt-1'>
                    {userId?.role}
                </p>
            </li>
            <li>
                <NavLink
                    to='/profile'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                    end
                >
                    <FiUser className='text-lg' />
                    <span className='lg:block hidden'>My Profile</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/profile/course'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <BsJournalCode className='text-lg' />
                    <span className='lg:block hidden'>My Classes</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/profile/assignments'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <MdOutlineAssignment className='text-lg' />
                    <span className='lg:block hidden'>Assignments</span>
                </NavLink>
            </li>
            {/* <li>
                <NavLink
                    to='/profile/billing-address'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <BsCurrencyDollar  className='text-lg' />
                    <span className='lg:block hidden'>Billing Address</span>
                </NavLink>
            </li> */}
            {/* <li>
                <NavLink
                    to='/profile/Certificate'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <SlBadge className='text-lg' />
                    <span className='lg:block hidden'>Certificate</span>
                </NavLink>
            </li> */}
            <li>
                <NavLink
                    to='/profile/order-history'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <RiHistoryFill className='text-lg' />
                    <span className='lg:block hidden'>Order History</span>
                </NavLink>
            </li>
            <li>
                <button
                    onClick={handleSignOut}
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <FiLogOut className='text-lg' />
                    <span className='lg:block hidden'>Sign Out</span>
                </button>
            </li>
        </ul>
    </>);
};

export default Sidebar;