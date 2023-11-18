import axios from 'axios';
import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Context/ContextProvider';
import TableLoadingSkeleton from '../../Pages/Shared/Spinner/TableLoadingSkeleton';
import StudentDetails from '../Students/StudentDetails';

const OrderList = () => {
    const { showToast } = useContext(contextProvider);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentDetails, setStudentDetails] = useState(null);


    // <!-- Fetch recent orders data --> 
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/course-enroll/recent-orders`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setOrders(res.data);
                setLoading(false)
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
    }, [orders, showToast, navigate]);


    return (<>
        <section className="mt-5 bg-white text-gray-600 border rounded-lg">
            <div className="p-5 border-b">
                <h1 className="text-xl text-content-secondary font-semibold mb-2">
                    Orders
                </h1>
                <p className="text-content text-sm">
                    Order Dashboard is a quick overview of all current orders.
                </p>
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
                        {loading ? <TableLoadingSkeleton tr_count={3} td_count={6} /> :
                            orders.map((data) =>
                                <tr
                                    key={data?._id}
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
            </div>

            {
                (!loading && orders.length === 0) ?
                    <div className='py-20 w-full text-center'>
                        <h4 className='md:text-3xl text-xl font-medium text-gray-400'>No orders data found!</h4>
                    </div>
                    :
                    <div className="text-center py-5">
                        <Link
                            className="inline-block py-2.5 px-6 bg-slate-800 hover:bg-slate-900 duration-300 text-white rounded"
                            to="/admin/students"
                        >
                            View All Orders
                        </Link>
                    </div>
            }

        </section>

        {/* <!-- Open Student Details sidebar --> */}
        <StudentDetails studentDetails={studentDetails} setStudentDetails={setStudentDetails} />
    </>);
};

export default OrderList;