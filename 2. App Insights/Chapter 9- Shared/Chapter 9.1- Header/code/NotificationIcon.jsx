import React from 'react';
import { IoMdNotifications } from 'react-icons/io';

const NotificationIcon = () => {
    return (
        <div className='grid place-items-center'>
            <button className='hover:text-violet-500 duration-200 relative'>
                <IoMdNotifications className='text-[1.6rem]' />
                <p className='absolute -top-2 left-5 px-1 text-xs rounded bg-violet-600 text-white flex justify-center items-center'>
                    0
                </p>
            </button>
        </div>
    );
};

export default NotificationIcon;