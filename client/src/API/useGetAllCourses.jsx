import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contextProvider } from '../Context/ContextProvider';

const useGetAllCourses = () => {
    const { showToast } = useContext(contextProvider);
    const [coursesData, setCoursesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/course`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setCoursesData(res.data);
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
    }, [coursesData, showToast, navigate]);

    return [coursesData, loading];
};

export default useGetAllCourses;