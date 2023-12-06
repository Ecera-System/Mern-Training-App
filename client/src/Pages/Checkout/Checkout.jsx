import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Context/ContextProvider';
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
    const [billingAddress, setBillingAddress] = useState({});
    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate();
    const [razorpayRes, setRazorpayRes] = useState(null);

    // Fetching billing address from database

    const fetchBillingAddressData = async () => {
        try {
          setBtnLoading(true);
          const response = await axios.get(
            `${import.meta.env.VITE_API_V1_URL}/billing-address/fetch`,
            // 'http://localhost:5600/api/v1/billing-address/store',
            {
              headers: {
                Authorization: localStorage.getItem("auth_token"),
              },
            }
          );
    
          if(response.data.billingAddress){
            setBillingAddress(response.data.billingAddress);
          }else{
            showToast({
                success: '', error: 'Please fill the billing address first'
            })
            navigate("/profile/billing-address")
          }

        //   console.log(response);
          setBtnLoading(false);

        } catch (error) {

            showToast({
                success: '', error: 'Please fill the billing address first'
            })
            navigate("/profile/billing-address")

          setBtnLoading(false);
        }
      }
    
      useEffect(() => {
        fetchBillingAddressData()
      }, [])


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
    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // };


    // // <!-- Validate form function -->
    // const validateForm = (data) => {
    //     let errors = {};

    //     if (!data.firstName) {
    //         errors.firstName = 'First name is required!';
    //     }
    //     if (!data.lastName) {
    //         errors.lastName = 'Last name is required!';
    //     }
    //     if (!data.contactNumber) {
    //         errors.contactNumber = 'Contact Number is required!';
    //     } else if (!/^-?\d+\.?\d*$/.test(data.contactNumber)) {
    //         errors.contactNumber = 'Invalid contact number!';
    //     }
    //     if (!data.address1) {
    //         errors.address1 = 'Address is required!';
    //     }
    //     if (!data.country) {
    //         errors.country = 'Please select a country!';
    //     }
    //     if (!data.city) {
    //         errors.city = 'City is required!';
    //     }
    //     if (!data.zip) {
    //         errors.zip = 'Zip is required!';
    //     }

    //     return errors;
    // };

    // <!-- Button condition for usd & inr -->
    let btnState = { button: '' };

    // <!-- Submit Form Data -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        
            setBtnLoading(true);
            try {
                // <!-- Checkout with Stripe -->
                if (btnState.button === 'usd') {
                    const res = await axios.post(`${import.meta.env.VITE_API_V1_URL}/course-enroll/enroll-in-usd`, {
                        ...billingAddress,
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
                        ...billingAddress,
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
                                firstName: billingAddress.firstName,
                                lastName: billingAddress.lastName,
                                email: res.data.email,
                                contactNumber: billingAddress.contactNumber,
                                address1: billingAddress.address1,
                                address2: billingAddress.address2,
                                country: billingAddress.country,
                                city: billingAddress.city,
                                zip: billingAddress.zip,
                                studentId: res.data.studentId,
                                courseId: _id,
                                title: title,
                                price: res.data.amount,
                                currency: res.data.currency,
                                paymentMethod: 'Razorpay',
                            })
                        },
                        prefill: {
                            name: billingAddress.firstName + ' ' + billingAddress.lastName,
                            email: res.data.email,
                            contact: billingAddress.contactNumber,
                            startDate: Date.now(),
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

    };


    return (<>
        <PageTitle title={`Checkout for ${title}`} />
        <Header />
        <div className='w-full h-auto bg-violet-50'>
            <div className='2xl:w-[1280px] xl:w-4/5 lg:w-[90%] sm:w-4/5 w-11/12 mx-auto flex lg:flex-row flex-col-reverse justify-between lg:items-start items-center gap-10 lg:py-10 pb-10'>

                {/* <!-- Right Form --> */}
                <form onSubmit={handleSubmit} className='lg:w-3/4 w-full'>
                    

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























