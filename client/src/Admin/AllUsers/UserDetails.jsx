import React from 'react';
import moment from 'moment/moment';
import { MdClose } from 'react-icons/md';

const UserDetails = ({ userDetails, setUserDetails }) => {

    return (
        <div className={`${userDetails ? 'opacity-100 visible' : 'opacity-0 invisible'} duration-300 fixed inset-0 z-50 bg-black/60`}>
            {/* <!-- Close button 1 --> */}
            <button
                style={{ cursor: `url(/images/cross.png) 75 0, auto` }}
                className={`w-full h-full`} onClick={() => setUserDetails(null)}
            ></button>

            <aside className={`absolute top-0 ${userDetails ? 'right-0' : '-right-[500px]'} duration-300 w-[30rem] h-screen overflow-y-auto overflow-x-hidden bg-white p-5`}>

                {/* <!-- Close button 2 --> */}
                <button
                    onClick={() => setUserDetails(null)}
                    className='absolute top-5 left-5 p-2 text-gray-500 hover:text-gray-600 hover:bg-blue-50 duration-300 text-2xl leading-normal rounded-full'
                >
                    <MdClose />
                </button>

                <ul className='list-none w-full mx-2 mb-10 flex flex-col gap-4'>
                    <li className='grid place-items-center my-3'>
                        <img
                            src={userDetails?.avatar ?
                                (
                                    userDetails?.avatar?.includes("/images/") ?
                                        import.meta.env.VITE_API_V1_URL + userDetails?.avatar
                                        : userDetails?.avatar
                                )
                                : '/images/nav/avatar.png'
                            }
                            alt="Avatar"
                            className='w-[9.4rem] h-[9.4rem] max-w-full object-cover rounded-full border'
                            loading='lazy'
                        />
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Full Name</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>{userDetails?.name}</span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Email</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>{userDetails?.userId?.email}</span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Contact Number</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.userId?.contactNumber || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Address 1</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.address1 || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Address 2</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.address2 || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Zip Code</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.zip || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>City</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.city || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Country</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.country || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Role</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.userId?.role}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Status</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.userId?.status}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Registered At</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {moment(userDetails?.userId?.createdAt).format('DD-MMM-YYYY')}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Enrolled Courses</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {userDetails?.userId?.courses.length}
                        </span>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default UserDetails;