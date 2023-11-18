import React from 'react';
import moment from 'moment/moment';
import { MdClose } from 'react-icons/md';

const StudentDetails = ({ studentDetails, setStudentDetails }) => {

    return (
        <div className={`${studentDetails ? 'opacity-100 visible' : 'opacity-0 invisible'} duration-300 fixed inset-0 z-50 bg-black/60`}>
            {/* <!-- Close button 1 --> */} 
            <button
                style={{ cursor: `url(/images/cross.png) 75 0, auto` }}
                className={`w-full h-full`} onClick={() => setStudentDetails(null)}
            ></button>

            <aside className={`absolute top-0 ${studentDetails ? 'right-0' : '-right-[500px]'} duration-300 w-[30rem] h-screen overflow-y-auto overflow-x-hidden scrollBar-sm bg-white p-5`}>

                {/* <!-- Close button 2 --> */}
                <button
                    onClick={() => setStudentDetails(null)}
                    className='absolute top-5 left-5 p-2 text-gray-500 hover:text-gray-600 hover:bg-blue-50 duration-300 text-2xl leading-normal rounded-full'
                >
                    <MdClose />
                </button>

                <ul className='list-none w-full mx-2 mb-10 flex flex-col gap-3'>
                    <li>
                        <h4 className='text-gray-800 text-xl font-medium text-center mt-3'>
                            Student Details
                        </h4>
                    </li>
                    <li className='grid place-items-center my-3'>
                        <img
                            src={studentDetails?.profileId?.avatar ?
                                (
                                    studentDetails?.profileId?.avatar?.includes("/images/") ?
                                        import.meta.env.VITE_API_V1_URL + studentDetails?.profileId?.avatar
                                        : studentDetails?.profileId?.avatar
                                )
                                : '/images/nav/avatar.png'
                            }
                            alt="Avatar"
                            className='w-32 h-32 max-w-full object-cover rounded-full border'
                            loading='lazy'
                        />
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Full Name</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.studentId?.name}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Email</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.studentId?.email}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Contact Number</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.studentId?.contactNumber || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Address 1</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.profileId?.address1 || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Address 2</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.profileId?.address2 || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Zip Code</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.profileId?.zip || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>City</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.profileId?.city || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Country</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.profileId?.country || '--'}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Status</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.studentId?.status}
                        </span>
                    </li>


                    {/* <!-- Order Details --> */}
                    <li className=''>
                        <h4 className='text-gray-800 text-xl font-medium text-center mt-4 mb-2'>
                            Order Details
                        </h4>
                        <hr />
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Enrolled At</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {moment(studentDetails?.createdAt).format('DD-MMM-YYYY')}
                        </span>
                    </li>
                    <li className='flex items-start'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Course</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.courseId?.title}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Price</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            ${studentDetails?.price}
                            <span className='ml-2 font-normal uppercase'>{studentDetails?.currency}</span>
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Payment Status</span>
                        <span className='w-4/6 text-base font-medium text-gray-600 capitalize'>
                            {studentDetails?.paymentStatus}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Payment Method</span>
                        <span className='w-4/6 text-base font-medium text-gray-600 capitalize'>
                            {studentDetails?.paymentMethod}
                        </span>
                    </li>
                    <li className='flex items-center'>
                        <span className='w-2/6 text-sm font-medium text-gray-500'>Transaction ID</span>
                        <span className='w-4/6 text-base font-medium text-gray-600'>
                            {studentDetails?.transactionId}
                        </span>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default StudentDetails;