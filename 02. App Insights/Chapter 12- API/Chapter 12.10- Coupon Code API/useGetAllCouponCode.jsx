import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contextProvider } from '../Context/ContextProvider';

const useGetAllCouponCode = () => {
    const { showToast } = useContext(contextProvider);
    const [couponData, setCouponData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/coupon-code`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setCouponData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                showToast({
                    succuss: '', error: err?.response?.data?.error,
                });
                if (err?.response?.data?.notExist) {
                    localStorage.removeItem('auth_token');
                    return navigate('/sign-in');
                };
                setLoading(false);
            });
    }, [couponData, showToast, navigate]);

    return [couponData, loading];
};

export default useGetAllCouponCode;