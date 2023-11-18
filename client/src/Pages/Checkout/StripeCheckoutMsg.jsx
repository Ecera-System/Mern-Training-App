import React from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';

const StripeCheckoutMsg = () => {
    const searchQuery = window.location.search;
    const query = new URLSearchParams(searchQuery);
    const queryObj = Object.fromEntries(query);
    const navigate = useNavigate();

    return (<>
        <PageTitle
            title={`${(queryObj?.success && 'Payment Successful!') || (queryObj?.canceled && 'Payment Cancelled')}`}
        />
        <div className='w-screen h-screen bg-violet-50 flex justify-center items-center'>
            {
                queryObj?.canceled &&
                <div className='sm:w-96 w-11/12 h-auto text-center bg-white p-8 rounded-lg'>
                    <div className='flex justify-center'>
                        <SlClose className="text-5xl text-red-500" />
                    </div>
                    <h2 className='text-2xl font-medium text-gray-600 py-5'>Payment Cancelled</h2>
                    <p className='text-sm font-medium text-gray-600 mb-4'>
                        Unable to process payment
                    </p>
                    <button
                        onClick={() => {
                            navigate('/')
                        }}
                        className='w-full py-2 rounded text-center bg-slate-800 hover:bg-slate-900 duration-300 text-white text-lg font-medium'
                    >
                        OK
                    </button>
                </div>
            }
            {
                queryObj?.success &&
                <div className='sm:w-96 w-11/12 h-auto text-center bg-white p-8 rounded-lg'>
                    <div className='flex justify-center'>
                        <BsCheck2Circle className="text-5xl text-emerald-500" />
                    </div>
                    <h2 className='text-2xl font-medium text-gray-600 py-5'>Payment Successful!</h2>
                    <p className='text-sm font-medium text-gray-600 mb-4'>
                        Thank you for your enrollment
                    </p>
                    <button
                        onClick={() => {
                            navigate('/profile/course')
                        }}
                        className='w-full py-2 rounded text-center bg-emerald-500 hover:bg-emerald-600 duration-300 text-white text-lg font-medium'
                    >
                        OK
                    </button>
                </div>
            }
        </div>
    </>);
};

export default StripeCheckoutMsg;