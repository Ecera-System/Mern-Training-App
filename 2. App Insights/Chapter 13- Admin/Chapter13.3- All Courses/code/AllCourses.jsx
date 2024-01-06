import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { SlClose } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import useGetAllCourses from '../../API/useGetAllCourses';
import { contextProvider } from '../../Context/ContextProvider';
import PageTitle from '../../Pages/Shared/PageTitle';
import Spinner from '../../Pages/Shared/Spinner/Spinner';
import TableLoadingSkeleton from '../../Pages/Shared/Spinner/TableLoadingSkeleton';
import CourseContent from './CourseContent';

const AllCourses = () => {
    const { showToast } = useContext(contextProvider);
    const [coursesData, loading] = useGetAllCourses();
    const [isDelete, setIsDelete] = useState('');
    const [dLoading, setDLoading] = useState(false);
    const navigate = useNavigate();
    const [content, setContent] = useState(null); //Course content page open


    // <!-- Handle Delete Course -->
    const handleDelete = async (id) => {
        try {
            setDLoading(true);
            const res = await axios.delete(`${import.meta.env.VITE_API_V1_URL}/course/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('auth_token')
                }
            });
            const success = res.data.success;
            showToast({
                success: success,
                error: ''
            });
            setIsDelete('')
        } catch (err) {
            showToast({
                succuss: '', error: err?.response?.data?.error,
            });
            if (err?.response?.data?.notExist) {
                localStorage.removeItem('auth_token');
                return navigate('/sign-in');
            }
        };
        setDLoading(false);
    };

    return (<>
        {content ?
            <CourseContent content={content} setContent={setContent} /> : <>
                <PageTitle title="All Courses" />
                <div className="my-5 w-full bg-white text-gray-600 rounded-lg border">
                    <div className="p-5 border-b">
                        <h1 className="text-xl text-content-secondary font-semibold mb-3">
                            Courses
                        </h1>
                        <p className="text-content text-sm">
                            View and manage courses data.
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="bg-violet-50 text-left uppercase">
                                <tr>
                                    <th className="text-sm py-3 px-5">COURSES</th>
                                    <th className="text-sm py-3 pr-5">STUDENTS</th>
                                    <th className="text-sm py-3 pr-5">Class</th>
                                    <th className="text-sm py-3 pr-5">Price</th>
                                    <th className="text-sm py-3 pr-5">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <TableLoadingSkeleton td_count={5} /> :
                                    coursesData.map((data) =>
                                        <tr key={data._id} className='border-b'>
                                            <td className='py-3 px-5'>
                                                <div className='w-96 flex items-center gap-5'>
                                                    <button
                                                        onClick={() => setContent(data)}
                                                        className="text-base text-start font-medium text-emerald-500 hover:text-violet-600 duration-300"
                                                    >
                                                        {data?.title}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className='py-3 pr-5'>
                                                <span className="w-max text-sm px-3">
                                                    {data?.students?.length}
                                                </span>
                                            </td>
                                            <td className='py-3 pr-5'>
                                                <button
                                                    onClick={() => setContent(data)}
                                                    className='w-max font-medium text-emerald-500 text-sm px-3 hover:underline'
                                                >
                                                    {data?.modules?.length}
                                                </button>
                                            </td>
                                            <td className='py-3 pr-5'>
                                                <div className='w-max text-sm'>
                                                    ${data?.price}
                                                </div>
                                            </td>
                                            <td className='py-3 pr-5'>
                                                <button
                                                    onClick={() => setIsDelete(data._id)}
                                                    className='w-max hover:text-red-500 duration-300 ml-3'
                                                >
                                                    <FaTrashAlt className='text-xl' />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        {
                            (!loading && coursesData.length === 0) &&
                            <div className='text-center py-20'>
                                <h4 className='md:text-3xl text-xl font-medium text-gray-500'>
                                    No course has been created yet!
                                </h4>
                            </div>
                        }
                    </div>
                </div>
            </>}
        {
            isDelete && <div className='fixed inset-0 bg-black/60 grid place-items-center'>
                <div className='sm:w-[30rem] w-11/12 h-auto bg-white sm:p-10 p-6 rounded-lg flex flex-col gap-5'>
                    <div className='text-5xl flex justify-center text-red-500'>
                        <SlClose />
                    </div>
                    <h2 className='text-center text-3xl text-gray-600'>
                        Are you sure?
                    </h2>
                    <p className='text-base text-gray-500 text-center'>
                        Do you really want to delete this course? This course cannot be undone.
                    </p>
                    <div className='flex items-center justify-center gap-10'>
                        <button
                            onClick={() => setIsDelete('')}
                            className='py-2.5 px-10 text-base font-medium bg-gray-400 hover:bg-gray-500 duration-300 text-white rounded'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => { handleDelete(isDelete) }}
                            className='py-2.5 px-10 text-base font-medium bg-red-500 hover:bg-red-600 duration-300 text-white rounded'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        }
        {
            (dLoading) && <Spinner />
        }
    </>);
};

export default AllCourses;