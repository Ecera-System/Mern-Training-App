import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { contextProvider } from '../../Context/ContextProvider';
import Spinner from '../../Pages/Shared/Spinner/Spinner';
import ReCAPTCHA from "react-google-recaptcha";
import PageTitle from '../../Pages/Shared/PageTitle';

const UpdatePasswordByAdmin = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const { showToast } = useContext(contextProvider);

    const [passwords, setPaswords] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword && passwords.confirmPassword && captcha) {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_V1_URL}/admin/update-password`, { userEmail: email, ...passwords }, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("auth_token"),
                },
            })
                .then(res => {
                    showToast({ error: '', success: res.data.message });
                    navigate('/admin/all-users?page=1')
                })
                .catch(err => {
                    showToast({ error: err?.response?.data?.error, success: '' });
                });
            setLoading(false);
        } else if (!captcha) {
            showToast({ error: "Captcha verification required", success: '' });
        } else {
            showToast({ error: "All fields are required", success: '' });
        }
    };

    function onCaptchaChange(value) {
        setCaptcha(value);
        // console.log("Captcha value:", value);
    }


    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <PageTitle title={'Upadate Password - Admin'} />
            <div className="bg-white p-6 rounded-md flex flex-col justify-between align-middle">
                <h2 className="text-xl text-center font-bold mb-4">Update Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className='flex flex-col justify-between align-middle'>
                        <input
                            type="text"
                            placeholder="Enter New Password"
                            value={passwords.password}
                            onChange={(e) => setPaswords({ ...passwords, newPassword: e.target.value })}
                            className='w-80 p-2 border-2 border-violet-500 rounded-sm outline-none my-2'
                        />
                        <input
                            type="text"
                            placeholder="Confirm New Password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPaswords({ ...passwords, confirmPassword: e.target.value })}
                            className='w-80 p-2 border-2 border-violet-500 rounded-sm outline-none'
                        />

                    </div>
                    <ReCAPTCHA
                        className="w-full my-5 mx-auto flex justify-center align-middle"
                        sitekey={`${import.meta.env.VITE_SITE_KEY}`} onChange={onCaptchaChange} />
                    <div className="w-80 mt-4 flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md">
                            Submit
                        </button>
                        <Link to={'/admin/all-users?page=1'} className="bg-gray-300 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md ml-3">
                            Cancel
                        </Link>
                    </div>
                    {loading && <Spinner />}
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordByAdmin;
