import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contextProvider } from '../Context/ContextProvider';

const useGetCourseById = (id) => {
    const { showToast } = useContext(contextProvider);
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/course/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setCourseData(res.data);
                setLoading(false)
            })
            .catch(err => {
                showToast({
                    succuss: '', error: err?.response?.data?.error,
                });
            });
        setLoading(false);
    }, [id, courseData, showToast, navigate]);

    return [courseData, loading];
};

export default useGetCourseById;