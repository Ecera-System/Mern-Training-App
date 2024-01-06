import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineWarning } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';


const ActivateCode = () => {

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email")

    // const email = 'ataulmustafa143@gmail.com'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resendSuccess, setResendSuccess] = useState('');
    const [resendLoad, setResendLoad] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (success) {
                setSuccess('');
                navigate('/sign-in');
            }
            if (resendSuccess) {
                setResendSuccess('');
            }
        }, 2000);
        setTimeout(() => {
            if (resendSuccess) {
                setResendSuccess('');
            }
        }, 5000);
    }, [success, navigate, resendSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = e.target.code.value;

        if (code) {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/activate-account`, { code, email })
                .then(res => {
                    setSuccess(res.data.success)
                })
                .catch(err => {
                    setError(err?.response?.data?.error)
                });
            setLoading(false);
        }
        e.reset();
    };


    const handleResend = async (e) => {
        if (resendLoad) return;
        if (email) {
            setResendLoad(true);
            await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/resend-code`, { email })
                .then(res => {
                    if (res.data.acknowledged) {
                        setResendSuccess('Code has been sent!')
                    }
                })
                .catch(err => {
                    setError(err?.response?.data?.error)
                });
            setResendLoad(false);
        }
    };

    return (<>
        <div
            className={`fixed inset-0 grid place-items-center`}
        >
            <div className={`sm:w-[34rem] w-11/12 h-auto bg-white rounded-md`}>
                <div className={`absolute inset-0 bg-white duration-200 grid place-items-center ${success ? 'scale-100' : 'scale-0'}`}>
                    <div>
                        <div>
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>
                        <p className='text-xl font-medium text-gray-600'>
                            {success}
                        </p>
                    </div>
                </div>
                <button
                    // onClick={() => setOpenModal('')}
                    className='absolute top-5 right-5 rounded-full hover:bg-violet-100 duration-300 p-1'
                >
                    <IoCloseSharp className='text-4xl text-gray-700' />
                </button>
                <h2 className='text-3xl text-gray-700 px-10 pt-6 pb-4'>
                    Enter verification code
                </h2>
                <hr />
                <form
                    onSubmit={handleSubmit}
                    className='p-10 pt-5 flex flex-col gap-10'
                >
                    <div>
                        <p className='text-base text-gray-600 pb-1'>
                            A verification code has been sent to {email}
                        </p>
                        <input
                            placeholder="5 digit code" required
                            type="number" name='code'
                            className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                        />
                        {
                            error &&
                            <p className='mt-3 text-sm text-red-500 flex gap-2 items-start'>
                                <AiOutlineWarning className="text-base mt-0.5" />
                                {error}
                            </p>
                        }
                    </div>
                    <div className='flex justify-between items-center'>
                        <button
                            type='submit'
                            className='px-8 py-3 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center gap-2 rounded-md'
                        >
                            Submit
                        </button>
                        {
                            resendSuccess ?
                                <p className='text-base text-violet-600'>{resendSuccess}</p> :
                                <div
                                    onClick={handleResend}
                                    className={`text-base text-violet-600 flex items-center gap-3 ${resendLoad ? 'cursor-not-allowed' : 'cursor-pointer hover:underline'}`}
                                >
                                    Resend code
                                    {
                                        resendLoad &&
                                        <div className='loader' />
                                    }
                                </div>
                        }
                    </div>
                </form>
            </div>
        </div>
        {
            loading && <Spinner />
        }
    </>);
};


export default ActivateCode;