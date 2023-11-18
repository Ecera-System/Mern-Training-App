import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contextProvider } from '../Context/ContextProvider';

const useGetUser = () => {
    const { showToast } = useContext(contextProvider);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/user/single`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setUserData(res.data);
                setLoading(false)
            })
            .catch(err => {
                // showToast({
                //     succuss: '', error: err?.response?.data?.error,
                // });
                setLoading(false);
                if (err?.response?.data?.notExist) {
                    localStorage.removeItem('auth_token');
                    return navigate('/sign-in');
                }
            });
    }, [userData, navigate]);

    return [userData, loading];
};

export default useGetUser;