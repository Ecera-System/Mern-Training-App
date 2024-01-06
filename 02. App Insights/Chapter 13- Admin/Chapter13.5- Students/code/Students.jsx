import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment/moment';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Context/ContextProvider';
import PageTitle from '../../Pages/Shared/PageTitle';
import TableLoadingSkeleton from '../../Pages/Shared/Spinner/TableLoadingSkeleton';
import StudentDetails from './StudentDetails';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

const Students = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useContext(contextProvider);
    const [studentsData, setStudentsData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(Number(new URLSearchParams(location.search).get('page')) || 1);
    const size = 10;

    const totalPage = Math.ceil(count / size);

    // <!-- Update the URL query parameter when the page changes -->
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        urlSearchParams.set('page', page);

        navigate(`?${urlSearchParams.toString()}`);
    }, [location.search, navigate, page]);

    // <!-- Fetch data as a pagination -->
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/profile/students?page=${page}&size=${size}&query=${inputValue}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setStudentsData(res.data.students);
                setCount(res.data.count);
                setLoading(false);
            })
            .catch(err => {
                showToast({
                    succuss: '', error: err?.response?.data?.error,
                });
                setLoading(false);
                if (err?.response?.data?.notExist) {
                    localStorage.removeItem('auth_token');
                    return navigate('/sign-in');
                }
            });
    }, [page, inputValue, studentsData, navigate, showToast]);



    return (<>
        <PageTitle title="Students" />
        <div className="my-5 bg-white text-gray-600 rounded-lg border">
            <div className="p-5 border-b">
                <h1 className="font-semibold text-xl">
                    Students
                </h1>
                <div className="mt-4">
                    <input
                        onChange={e => setInputValue(e.target.value)}
                        className="block w-full border rounded py-2 px-4 text-sm outline-none"
                        type="text"
                        required
                        placeholder="Enter 'name' or 'email' to search student"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="bg-violet-50 text-left uppercase">
                        <tr>
                            <th className="text-sm py-3 px-5">
                                <h2 className='w-max'>Student</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max'>Email</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max'>Course</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max'>Price</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max'>Payment By</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max'>Enrolled At</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <TableLoadingSkeleton tr_count={7} td_count={6} /> :
                            studentsData.map((data) =>
                                <tr
                                    key={data._id}
                                    onClick={() => setStudentDetails(data)}
                                    className='border-b cursor-pointer hover:bg-violet-50 duration-300'
                                >
                                    <td className='py-3 px-5'>
                                        <p className="w-40 text-base font-medium">
                                            {data?.studentId?.name}
                                        </p>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <p className="w-max text-sm">
                                            {data?.studentId?.email}
                                        </p>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <p className="w-60 text-sm">
                                            {data?.courseId?.title}
                                        </p>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <p className="w-max text-sm">
                                            ${data?.price}
                                        </p>
                                    </td>
                                    <td className='py-3 pr-5 text-center'>
                                        <p className="w-max text-sm capitalize">
                                            {data?.paymentMethod}
                                        </p>
                                    </td>
                                    <td className='py-3 pr-5 text-center'>
                                        <p className="w-max text-sm capitalize">
                                            {moment(data?.updatedAt).format('DD-MMM-YYYY')}
                                        </p>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                {
                    (!loading && studentsData.length === 0) && <div className='text-center py-20'>
                        <h4 className='md:text-3xl text-xl font-medium text-gray-500'>
                            No Students data found!
                        </h4>
                    </div>
                }
            </div>
        </div>

        {/* <!-- Pagination bar --> */}
        {size < count &&
            (!loading &&
                <div className='w-max mx-auto bg-white rounded mt-8 mb-20 py-2 px-5 shadow'>
                    <ul className='list-none flex items-center gap-3 text-gray-700'>
                        <li>
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(prev => prev - 1)}
                                className={`${page === 1 ? 'text-gray-400' : 'hover:bg-gray-200 duration-200'} mr-3 px-3 py-2 rounded`}
                            >
                                <MdArrowBackIosNew className='text-lg' />
                            </button>
                        </li>
                        {
                            [...Array(totalPage).keys()].map(item =>
                                <li key={item}>
                                    <button
                                        className={`${page === item + 1 ? 'bg-violet-600 text-white' : ''} duration-200 hover:bg-violet-600 hover:text-white px-2 py-0.5 rounded`}
                                        onClick={() => setPage(item + 1)}
                                    >
                                        {item + 1}
                                    </button>
                                </li>
                            )
                        }
                        <li>
                            <button
                                disabled={totalPage === page}
                                onClick={() => setPage(prev => prev + 1)}
                                className={`${totalPage === page ? 'text-gray-400' : 'hover:bg-gray-200 duration-200'} ml-3 px-3 py-2 rounded`}
                            >
                                <MdArrowForwardIos className='text-lg' />
                            </button>
                        </li>
                    </ul>
                </div >
            )
        }


        {/* <!-- Open Student Details sidebar --> */}
        <StudentDetails studentDetails={studentDetails} setStudentDetails={setStudentDetails} />

    </>);
};

export default Students;