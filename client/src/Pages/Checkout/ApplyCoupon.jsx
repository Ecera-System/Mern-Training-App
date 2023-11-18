import axios from 'axios';
import React, { useState } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';

const ApplyCoupon = ({ id, price, setIsDiscount }) => {
    const [state, setState] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleApplyCoupon = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_V1_URL}/coupon-code/apply`, {
                courseId: id,
                couponCode: state
            }, {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('auth_token')
                }
            });
            setIsDiscount(price - (res.data.discount / 100) * price);
        } catch (err) {
            setError(err?.response?.data?.error);
            if (err?.response?.data?.notExist) {
                localStorage.removeItem('auth_token');
                return navigate('/sign-in');
            }
        };
        setLoading(false);
    };

    return (<>
        <div className='w-full mt-6 mb-3 flex items-start justify-between gap-6'>
            <div className='w-full'>
                <input
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter your coupon code"
                    type="text" name='couponCode' id='couponCode'
                    className="block px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                />
                {
                    error &&
                    <p className='mt-2 text-sm text-red-400 flex gap-1.5 items-start'>
                        <BsExclamationCircleFill className="mt-1" />
                        {error}
                    </p>
                }
            </div>
            <button
                type="button"
                onClick={handleApplyCoupon}
                className='px-10 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 duration-300 text-white cursor-pointer'
            >
                Apply
            </button>
        </div>
        {loading && <Spinner />}
    </>);
};

export default ApplyCoupon;