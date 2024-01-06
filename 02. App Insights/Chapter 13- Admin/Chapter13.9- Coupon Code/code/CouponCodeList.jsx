import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { SlClose } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import useGetAllCouponCode from '../../API/useGetAllCouponCode';
import { contextProvider } from '../../Context/ContextProvider';
import PageTitle from '../../Pages/Shared/PageTitle';
import Spinner from '../../Pages/Shared/Spinner/Spinner';
import TableLoadingSkeleton from '../../Pages/Shared/Spinner/TableLoadingSkeleton';

const CouponCodeList = () => {
    const { showToast } = useContext(contextProvider);
    const navigate = useNavigate();
    const [couponData, loading] = useGetAllCouponCode();
    const [coLoading, setCoLoading] = useState(false);
    const [dLoading, setDLoading] = useState(false);
    const [isDelete, setIsDelete] = useState('');


    // <!-- Handle Change Status -->
    const handleStatus = async (e, id) => {
        const data = e.target.value;
        if (!data) return;
        try {
            setCoLoading(true);
            const res = await axios.patch(`${import.meta.env.VITE_API_V1_URL}/coupon-code/${id}`, {
                status: data
            }, {
                method: 'PATCH',
                headers: {
                    'Authorization': localStorage.getItem('auth_token')
                }
            });
            const success = res.data.success;
            showToast({
                success: success,
                error: ''
            });
        } catch (err) {
            showToast({
                succuss: '', error: err?.response?.data?.error,
            });
            if (err?.response?.data?.notExist) {
                localStorage.removeItem('auth_token');
                return navigate('/sign-in');
            }
        };
        setCoLoading(false);
    };


    // <!-- Handle Delete Course -->
    const handleDelete = async (id) => {
        try {
            setDLoading(true);
            const res = await axios.delete(`${import.meta.env.VITE_API_V1_URL}/coupon-code/${id}`, {
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
        <PageTitle title="All Coupon Code" />
        <div className="border-b bg-white text-gray-600 rounded-lg border overflow-x-auto">
            <table className="table-auto w-full">
                <thead className="bg-violet-100 text-left uppercase">
                    <tr>
                        <th className="text-sm py-3 px-5">Coupon Name</th>
                        <th className="text-sm py-3 pr-5">Code</th>
                        <th className="text-sm py-3 pr-5">Course</th>
                        <th className="text-sm py-3 pr-5">Discount</th>
                        <th className="text-sm py-3 pr-5">Status</th>
                        <th className="text-sm py-3 pr-5">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <TableLoadingSkeleton td_count={6} /> :
                        couponData.map(({ _id, name, couponCode, courseId, discount, status }) =>
                            <tr key={_id} className="border-b">
                                <td className='py-3 px-5'>
                                    <p className='w-40'>
                                        {name}
                                    </p>
                                </td>
                                <td className="py-3 pr-5">
                                    <p className='w-max'>
                                        {couponCode}
                                    </p>
                                </td>
                                <td className="py-3 pr-5">
                                    <p className='w-80'>
                                        {courseId.title}
                                    </p>
                                </td>
                                <td className="py-3 pr-5">
                                    {discount}<span className='text-sm'>%</span>
                                </td>
                                <td className="py-3 pr-5 ">
                                    <select
                                        name="status"
                                        id="status"
                                        className="py-2 px-4 border border-violet-500 rounded bg-none cursor-pointer outline-none"
                                        onChange={(e) => handleStatus(e, _id)}
                                    >
                                        <option selected={status === "pending"} value="pending">
                                            Pending
                                        </option>
                                        <option selected={status === "active"} value="active">
                                            Active
                                        </option>
                                        <option selected={status === "inactive"} value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </td>
                                <td className='py-3 pr-5 text-center'>
                                    <button
                                        onClick={() => setIsDelete(_id)}
                                        className='w-max hover:text-red-500 duration-300'
                                    >
                                        <FaTrashAlt className='text-xl' />
                                    </button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            {
                (!loading && couponData.length === 0) &&
                <div className='text-center py-20'>
                    <h4 className='md:text-3xl text-xl font-medium text-gray-500'>
                        No Coupon code has been created yet!
                    </h4>
                </div>
            }
        </div>
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
                        Do you really want to delete this Coupon? This Coupon cannot be undone.
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
            (coLoading || dLoading) && <Spinner />
        }
    </>);
};

export default CouponCodeList;