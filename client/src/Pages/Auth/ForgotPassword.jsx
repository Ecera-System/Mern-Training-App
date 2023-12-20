import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';
import { contextProvider } from '../../Context/ContextProvider';
import ReCAPTCHA from "react-google-recaptcha";
import PageTitle from '../Shared/PageTitle';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const { showToast } = useContext(contextProvider);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (email && captcha) {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/forgot-password`, { email })
                .then(res => {
                    showToast({success: res.data.message, error: ''});
                    navigate('/sign-in')
                })
                .catch(err => {
                    showToast({success: '', error: err?.response?.data?.error})
                });
            setLoading(false);
        }else if(!captcha){
            showToast({error: 'Captcha verification required', success: ''});
        }
        else{
            showToast({error: 'Email is required', success: ''});
        }
    };

    function onCaptchaChange(value) {
        setCaptcha(value);
        // console.log("Captcha value:", value);
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <PageTitle title={'Forgot Password'} />
            <div className="bg-white p-6 rounded-md flex flex-col justify-between align-middle">
                <h2 className="text-xl text-center font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className='flex justify-center'>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
