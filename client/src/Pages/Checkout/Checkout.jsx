import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Context/ContextProvider';
import CountryList from '../Shared/CountryList';
import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner/Spinner';
import ApplyCoupon from './ApplyCoupon';
import Summary from './Summary';
import useGetCourseById from '../../API/useGetCourseById';

// <-- Razorpay payment API -->
const loadRazorpay = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => { resolve(true) };
        script.onerror = () => { resolve(false) };
        document.body.appendChild(script);
    });
};

const Checkout = () => {
    const { showToast } = useContext(contextProvider);
    const location = useLocation();
    const [courseData, loading] = useGetCourseById(location?.pathname?.split('/')[3]);
    const [isDiscount, setIsDiscount] = useState(null); // For Coupon Code
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        startDate: '',
        address1: '',
        address2: '',
        country: '',
        city: '',
        zip: '',

    });
    const [formErrors, setFormErrors] = useState({});
    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate();
    const [razorpayRes, setRazorpayRes] = useState(null);


    // <-- Razorpay payment verify api -->
    useEffect(() => {
        if (razorpayRes?.razorpay_payment_id) {
            axios.post(`${import.meta.env.VITE_API_V1_URL}/course-enroll/razorpay-verify`, razorpayRes, {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('auth_token')
                }
            })
                .then(res => {
                    showToast({
                        succuss: res.data.success, error: '',
                    });
                    setRazorpayRes(null);
                    setTimeout(() => {
                        navigate('/profile/course')
                    }, 3000);
                })
                .catch(err => {
                    showToast({
                        succuss: '', error: err?.response?.data?.error,
                    });
                    setRazorpayRes(null)
                })
        }
    }, [razorpayRes, showToast, navigate]);

    if (loading) return <Spinner />
    const { _id, title, price } = courseData;


    // <!-- onChange input -->
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    // <!-- Validate form function -->
    const validateForm = (data) => {
        let errors = {};

        if (!data.firstName) {
            errors.firstName = 'First name is required!';
        }
        if (!data.lastName) {
            errors.lastName = 'Last name is required!';
        }
        if (!data.contactNumber) {
            errors.contactNumber = 'Contact Number is required!';
        } else if (!/^-?\d+\.?\d*$/.test(data.contactNumber)) {
            errors.contactNumber = 'Invalid contact number!';
        }
        if (!data.address1) {
            errors.address1 = 'Address is required!';
        }
        if (!data.country) {
            errors.country = 'Please select a country!';
        }
        if (!data.city) {
            errors.city = 'City is required!';
        }
        if (!data.zip) {
            errors.zip = 'Zip is required!';
        }

        return errors;
    };

    // <!-- Button condition for usd & inr -->
    let btnState = { button: '' };

    // <!-- Submit Form Data -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm(formData);

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            setBtnLoading(true);
            try {
                // <!-- Checkout with Stripe -->
                if (btnState.button === 'usd') {
                    const res = await axios.post(`${import.meta.env.VITE_API_V1_URL}/course-enroll/enroll-in-usd`, {
                        ...formData,
                        courseId: _id,
                        title: title,
                        price: isDiscount || parseFloat(courseData.price),
                    }, {
                        method: 'POST',
                        headers: {
                            'Authorization': localStorage.getItem('auth_token')
                        }
                    });
                    if (res.data?.url) {
                        window.location = res.data?.url;
                    };
                };

                // <!-- Checkout with Razorpay -->
                if (btnState.button === 'inr') {
                    const load = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
                    if (!load) return alert("Razorpay SDK failed to load. Are you online?");

                    const res = await axios.post(`${import.meta.env.VITE_API_V1_URL}/course-enroll/enroll-in-inr`, {
                        ...formData,
                        courseId: _id,
                        title: title,
                        price: isDiscount || parseFloat(courseData.price),
                    }, {
                        method: 'POST',
                        headers: {
                            'Authorization': localStorage.getItem('auth_token')
                        }
                    });
                    const options = {
                        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                        name: 'Ecera System Training Center',
                        amount: res.data.amount,
                        currency: res.data.currency,
                        description: title,
                        image: '/images/ecera-system-logo.png',
                        order_id: res.data.id,
                        handler: async function (response) {
                            return setRazorpayRes({
                                ...response,
                                orderCreationId: res.data.id,
                                firstName: formData.firstName,
                                lastName: formData.lastName,
                                email: res.data.email,
                                contactNumber: formData.contactNumber,
                                address1: formData.address1,
                                address2: formData.address2,
                                country: formData.country,
                                city: formData.city,
                                zip: formData.zip,
                                studentId: res.data.studentId,
                                courseId: _id,
                                title: title,
                                price: res.data.amount,
                                currency: res.data.currency,
                                paymentMethod: 'Razorpay',
                            })
                        },
                        prefill: {
                            name: formData.firstName + ' ' + formData.lastName,
                            email: res.data.email,
                            contact: formData.contactNumber,
                            startDate: formData.startDate,
                        },
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                };

            } catch (err) {
                showToast({
                    succuss: '', error: err?.response?.data?.error,
                });
                if (err?.response?.data?.notExist) {
                    localStorage.removeItem('auth_token');
                    return navigate('/sign-in');
                }
            };
            setBtnLoading(false);

        } else {
            setFormErrors(errors);
        }
    };


    return (<>
        <PageTitle title={`Checkout for ${title}`} />
        <Header />
        <div className='w-full h-auto bg-violet-50'>
            <div className='2xl:w-[1280px] xl:w-4/5 lg:w-[90%] sm:w-4/5 w-11/12 mx-auto flex lg:flex-row flex-col-reverse justify-between lg:items-start items-center gap-10 lg:py-10 pb-10'>

                {/* <!-- Right Form --> */}
                <form onSubmit={handleSubmit} className='lg:w-3/4 w-full'>
                    <div className='w-full bg-violet-500 border rounded-lg'>
                        <h1 className='text-xl font-bold text-black-700 p-5 border-b'>
                            Billing Address
                        </h1>
                        <div className='w-full p-8 flex flex-col gap-6'>
                            <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
                                <div className='w-full'>
                                    <label htmlFor='firstName' className="px-1 font-semibold">First Name</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder=""
                                        type="text" name='firstName' id='firstName'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {
                                        formErrors?.firstName &&
                                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                            <BsExclamationCircleFill className="mt-0.5" />
                                            {formErrors?.firstName}
                                        </p>
                                    }
                                </div>
                                <div className='w-full'>
                                    <label htmlFor='lastName' className="px-1 font-semibold">Last Name</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder=""
                                        type="text" name='lastName' id='lastName'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {
                                        formErrors?.lastName &&
                                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                            <BsExclamationCircleFill className="mt-0.5" />
                                            {formErrors?.lastName}
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
                                <div className='w-full'>
                                    <label htmlFor='contactNumber' className="px-1 font-semibold">Contact Number</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder=""
                                        maxLength={10}
                                        type="text" name='contactNumber' id='contactNumber'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {
                                        formErrors?.contactNumber &&
                                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                            <BsExclamationCircleFill className="mt-0.5" />
                                            {formErrors?.contactNumber}
                                        </p>
                                    }
                                </div>
                                <div className='w-full'>
                                    <label htmlFor='startDate' className="px-1 font-semibold">Start Date</label>
                                    <input
                                        onChange={handleChange}
                                        type="date" name='startDate' id='startDate'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {/* You can add error handling for this field similar to other fields */}
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
                                <div className='w-full'>
                                    <label htmlFor='address1' className="px-1 font-semibold">Address Line 1</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder=""
                                        type="text" name='address1' id='address1'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {
                                        formErrors?.address1 &&
                                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                            <BsExclamationCircleFill className="mt-0.5" />
                                            {formErrors?.address1}
                                        </p>
                                    }
                                </div>
                                <div className='w-full'>
                                    <label htmlFor='address2' className="px-1 font-semibold">Address Line 2 (optional)</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder=""
                                        type="text" name='address2' id='address2'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {
                                        formErrors?.address2 &&
                                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                            <BsExclamationCircleFill className="mt-0.5" />
                                            {formErrors?.address2}
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
                                <div className='w-full'>
                                    <label htmlFor='country' className="px-1 font-semibold">Country</label>
                                    <select
                                        name="country" id="country"
                                        onChange={handleChange}
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    >
                                        <option value="">Select Country</option>
                                        <CountryList />
                                    </select>
                                    {
                                        formErrors?.country &&
                                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                            <BsExclamationCircleFill className="mt-0.5" />
                                            {formErrors?.country}
                                        </p>
                                    }
                                </div>
                                <div className='w-full'>
                                    <label htmlFor='city' className="px-1 font-semibold">City/State</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder=""
                                        type="text" name='city' id='city'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {
                                        formErrors?.city &&
                                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                            <BsExclamationCircleFill className="mt-0.5" />
                                            {formErrors?.city}
                                        </p>
                                    }
                                </div>
                                <div className='w-full'>
                                    <label htmlFor='zip' className="px-1 font-semibold">Zip/Postal Code</label>
                                    <input
                                        onChange={handleChange}
                                        placeholder=""
                                        type="text" name='zip' id='zip'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {
                                        formErrors?.zip &&
                                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                            <BsExclamationCircleFill className="mt-0.5" />
                                            {formErrors?.zip}
                                        </p>
                                    }
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div className='w-full px-8 py-5 my-5 bg-white border rounded-lg'>
                        <div className='flex items-center gap-3 cursor-pointer w-max'>
                            <input
                                onChange={(e) => setIsChecked(e.target.checked)}
                                type="checkbox"
                                id='checkbox'
                                className="w-4 h-4 accent-violet-600 cursor-pointer"
                            />
                            <label htmlFor='checkbox' className='cursor-pointer font-semibold'>
                                I have a Coupon Code
                            </label>
                        </div>
                        {
                            isChecked && <ApplyCoupon
                                id={_id}
                                price={parseFloat(price)}
                                setIsDiscount={setIsDiscount}
                            />
                        }
                    </div>

                    <div className='w-full flex items-center gap-6 my-10'>
                        <button
                            type="submit"
                            onClick={() => btnState.button = 'usd'}
                            className='text-base px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 duration-300 rounded'
                        >
                            Checkout in USD
                        </button>
                        <button
                            type="submit"
                            onClick={() => btnState.button = 'inr'}
                            className='text-base px-6 py-2.5 bg-[#1267ad] text-white hover:bg-[#0F5996] duration-300 rounded'
                        >
                            Checkout in INR
                        </button>
                    </div>
                </form>

                {/* <!-- Left Summary --> */}
                <div className='lg:w-1/4 w-full lg:sticky top-[74px] right-0'>
                    <Summary
                        data={courseData}
                        isDiscount={isDiscount || price}
                    />
                </div>
            </div>
        </div>
        {
            btnLoading && <Spinner />
        }
    </>);
};

export default Checkout;