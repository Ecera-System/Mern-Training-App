import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contextProvider } from '../Context/ContextProvider';

const useGetAllBookCounselling = () => {
    const { showToast } = useContext(contextProvider);
    const [bookCData, setBookCData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/book-counselling`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setBookCData(res.data);
                setLoading(false)
            })
            .catch(err => {
                showToast({
                    succuss: '', error: err?.response?.data?.error,
                });
                if (err?.response?.data?.notExist) {
                    localStorage.removeItem('auth_token');
                    return navigate('/sign-in');
                }
            });
        setLoading(false);
    }, [bookCData, showToast, navigate]);

    return [bookCData, loading];
};

export default useGetAllBookCounselling;