import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Context/ContextProvider';
import TableLoadingSkeleton from '../../Pages/Shared/Spinner/TableLoadingSkeleton';

const TopSaleCourse = () => {
    const { showToast } = useContext(contextProvider);
    const navigate = useNavigate();
    const [topSales, setTopSales] = useState([]);
    const [loading, setLoading] = useState(true);

    // <!-- Fetch course data -->
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/course/top-sale`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setTopSales(res.data);
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
    }, [topSales, showToast, navigate]);


    return (
        <section className="bg-white text-gray-600 border rounded-lg">
            <div className="p-5 border-b">
                <h1 className="text-xl font-semibold">
                    Best Selling Courses
                </h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="bg-violet-50 text-left uppercase">
                        <tr>
                            <th className="text-sm py-3 px-5">COURSES</th>
                            <th className="text-sm py-3 pr-5">SALES</th>
                            <th className="text-sm py-3 pr-5">Students</th>
                            <th className="text-sm py-3 pr-5">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <TableLoadingSkeleton tr_count={3} td_count={4} /> :
                            topSales?.map(({ _id, title, sales, students, price }) =>
                                <tr key={_id} className='border-b'>
                                    <td className='py-3 px-5'>
                                        <div className='w-[28rem] text-base font-medium'>
                                            <h2>
                                                {title}
                                            </h2>
                                        </div>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <div className="w-32 pl-3 text-sm">
                                            {sales}
                                        </div>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <div className="w-32 text-sm pl-3">
                                            {students.length}
                                        </div>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <div className="w-32 text-sm">
                                            ${price}
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {(!loading && topSales.length === 0) &&
                <div className='py-20 w-full grid place-items-center'>
                    <p className='md:text-3xl text-xl font-medium text-gray-400'>No Course has been sold yet!</p>
                </div>
            }
        </section>
    );
};

export default TopSaleCourse;