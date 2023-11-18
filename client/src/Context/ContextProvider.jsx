import React, { createContext, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineWarning } from 'react-icons/ai';

export const contextProvider = createContext();

const ContextProvider = ({ children }) => {
    const [courseState, setCourseState] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('auth_token') !== null
    ); //User Authenticate
    const [toast, setToast] = useState({ success: '', error: '' }); //Toast Notify

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => {
            setToast({
                ...toast,
                success: '',
                error: ''
            });
        }, 5000);
    };

    return (
        <contextProvider.Provider
            value={{
                showToast,
                toast,
                courseState,
                setCourseState,
                isLoggedIn,
                setIsLoggedIn
            }}
        >
            <div className={`fixed top-0 left-0 w-full h-auto bg-white z-[60] text-center duration-500 ${toast.success || toast.error ? 'translate-y-0' : '-translate-y-full'}`}>
                {toast.success &&
                    <div className='py-5 text-base text-emerald-500 bg-emerald-50 flex items-center justify-center gap-3'>
                        <FiCheckCircle className='text-lg' />
                        <p>
                            {toast.success}
                        </p>
                    </div>
                }
                {toast.error &&
                    <div className='py-5 text-base text-red-500 bg-red-50 flex items-center justify-center gap-2'>
                        <AiOutlineWarning className='text-lg' />
                        <p>
                            {toast.error}
                        </p>
                    </div>
                }
            </div>
            {children}
        </contextProvider.Provider>
    );
};

export default ContextProvider;