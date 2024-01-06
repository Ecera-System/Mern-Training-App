import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { useContext } from 'react';
import { contextProvider } from '../../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SpinnerBtn from '../Shared/Spinner/SpinnerBtn';

const GoogleSignIn = () => {
    const { showToast, setIsLoggedIn } = useContext(contextProvider);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // <!-- Load Google Sign-In SDK script -->
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);


    // <!-- Google sign-in button -->
    const handleLogin = () => {
        // <!-- Load the Google Sign-In API -->
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            })
                .then(() => {
                    const auth2 = gapi.auth2.getAuthInstance();
                    auth2.signIn()
                        .then(async (googleUser) => {
                            const { id_token } = googleUser.getAuthResponse();
                            // === === === === ===
                            setLoading(true);
                            await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/google-sign-in`, {
                                id_token
                            })
                                .then(res => {
                                    if (res.data.auth_token) {
                                        localStorage.setItem('auth_token', res.data.auth_token);
                                        showToast({
                                            succuss: res?.data?.succuss, error: '',
                                        });
                                        setIsLoggedIn(true);
                                        navigate(res.data.redirect)
                                    };
                                })
                                .catch(err => {
                                    showToast({
                                        succuss: '', error: err?.response?.data?.error,
                                    });
                                });
                            setLoading(false);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
        });
    };


    return (
        <div
            style={{ textShadow: 'none' }}
            className='w-full'
        >
            <div className='w-full flex items-center gap-3'>
                <div className='w-full h-px bg-white' />
                <p>or</p>
                <div className='w-full h-px bg-white' />
            </div>

            <div
                onClick={loading ? undefined : handleLogin}
                className={`w-full h-11 mt-7 bg-white text-gray-700 rounded shadow duration-300 active:bg-gray-50 hover:bg-gray-50 ${loading ? 'bg-gray-50 cursor-progress' : 'cursor-pointer'}`}
            >
                <div className='w-full h-full border border-transparent flex items-center justify-center gap-3'>
                    <div className='inline-block'>
                        <img
                            className='w-6 h-auto'
                            src='https://developers.google.com/identity/images/g-logo.png'
                            alt='Google Icon'
                        />
                    </div>
                    <span className='font-medium text-base border-none inline-block text-center'>
                        {
                            loading ?
                                <SpinnerBtn
                                    parentClass={'w-14'}
                                    childClass={'bg-gray-400'}
                                />
                                : 'Continue with Google'
                        }
                    </span>
                </div>
            </div>

        </div>
    );
};

export default GoogleSignIn;