import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contextProvider } from "../Context/ContextProvider";

const useGetAllAssignments = () => {
    const { showToast } = useContext(contextProvider);
    const [assData, setAssData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/assignment`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setAssData(res.data);
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
    }, [assData, showToast, navigate]);

    return [assData, loading];
};

export default useGetAllAssignments;