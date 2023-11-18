import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineAdd, MdOutlineAssignment } from 'react-icons/md';
import { SlBadge } from 'react-icons/sl';
import { BsFillJournalBookmarkFill, BsJournalCode } from 'react-icons/bs';
import { RiCoupon2Line } from 'react-icons/ri';
// import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('auth_token');
        navigate('/sign-in');
    };

    return (<>
        <ul className='list-none h-screen max-h-full overflow-y-auto scrollBar-sm lg:p-6 p-2 text-gray-600'>
            <li className='py-6 border-b mb-4'>
                <h1 className='text-center text-2xl font-medium text-gray-700 max-lg:hidden'>Admin</h1>
                <div className='grid place-items-center lg:mt-6'>
                    <Link
                        to='/admin/add-course'
                        className='lg:w-full w-max lg:px-5 lg:py-2.5 p-2 lg:text-sm text-center bg-violet-600 hover:bg-violet-700 duration-300 text-white rounded'
                    >
                        <span className='max-lg:hidden'>Add Course</span>
                        <MdOutlineAdd className='lg:hidden text-2xl' />
                    </Link>
                </div>
            </li>
            <li>
                <NavLink
                    to='/admin'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                    end
                >
                    <RxDashboard className='text-lg' />
                    <span className='max-lg:hidden'>Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/admin/all-courses'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <BsJournalCode className='text-lg' />
                    <span className='max-lg:hidden'>All Courses</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/admin/students'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <FiUsers className='text-lg' />
                    <span className='max-lg:hidden'>Students</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/admin/assignments'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <MdOutlineAssignment className='text-lg' />
                    <span className='max-lg:hidden'>Assignments</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/admin/coupon-code'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <RiCoupon2Line className='text-lg' />
                    <span className='max-lg:hidden'>Coupon Code</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/admin/certificate'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <SlBadge className='text-lg' />
                    <span className='max-lg:hidden'>Certificate</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/admin/book-counselling'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                    end
                >
                    <BsFillJournalBookmarkFill className='text-lg' />
                    <span className='max-lg:hidden'>Book Counselling</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/admin/all-users'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                    end
                >
                    <HiOutlineUserGroup className='text-lg' />
                    <span className='max-lg:hidden'>All Users</span>
                </NavLink>
            </li>
            {/* <li>
                <NavLink
                    to='/admin/Settings/settings'
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                    end
                >
                    <IoSettingsOutline className='text-lg' />
                    <span className='max-lg:hidden'>Settings</span>
                </NavLink>
            </li> */}
            <li>
                <button
                    onClick={handleSignOut}
                    className='lg:w-full w-max h-auto py-3 lg:px-5 px-3 text-base hover:text-violet-600 hover:bg-violet-100 duration-300 relative rounded flex items-center gap-3'
                >
                    <FiLogOut className='text-lg' />
                    <span className='max-lg:hidden'>Sign Out</span>
                </button>
            </li>
        </ul>
    </>);
};

export default Sidebar;