import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { contextProvider } from '../../Context/ContextProvider';
import Spinner from '../Shared/Spinner/Spinner';
import ReCAPTCHA from "react-google-recaptcha";
import PageTitle from '../Shared/PageTitle';


const ResetPassword = () => {
    const {token} = useParams();
    const navigate = useNavigate();
    const { showToast } = useContext(contextProvider);

    const [passwords, setPaswords] = useState({password: '', confirmPassword: ''});
    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (passwords.password && passwords.confirmPassword && captcha) {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/reset-password/${token}`, passwords)
                .then(res => {
                    showToast({success: res.data.message, error: ''});
                    navigate('/sign-in')
                })
                .catch(err => {
                    showToast({success: '', error: err?.response?.data?.error});
                });
            setLoading(false);
        }else if(!captcha){
            showToast({error: 'Captcha verification required', success: ''});
        }else{
            showToast({success: '', error: 'All fields are required'});
        }
    };

    function onCaptchaChange(value) {
        setCaptcha(value);
        // console.log("Captcha value:", value);
    }


    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <PageTitle title={'Reset Password'} />
            <div className="bg-white p-6 rounded-md flex flex-col justify-between align-middle">
                <h2 className="text-xl text-center font-bold mb-4">Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className='flex flex-col justify-between align-middle'>
                        <input
                            type="text"
                            placeholder="Enter New Password"
                            value={passwords.password}
                            onChange={(e) => setPaswords({...passwords, password: e.target.value})}
                            className='w-80 p-2 border-2 border-violet-500 rounded-sm outline-none my-2'
                        />
                        <input
                            type="text"
                            placeholder="Confirm New Password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPaswords({...passwords, confirmPassword: e.target.value})}
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
                        <Link to={'/sign-in'}  className="bg-gray-300 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md ml-3">
                            Cancel
                        </Link>
                    </div>
                    {loading && <Spinner />}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
