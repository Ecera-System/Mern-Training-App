import React, { useState } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import CountryList from '../../Shared/CountryList'; // Update the path here

const BillingAddress = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        address1: '',
        address2: '',
        country: '',
        city: '',
        zip: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm(formData);

        if (Object.keys(errors).length === 0) {
            // Form data is valid, proceed with further actions
            console.log('Form data:', formData);
            // Save the form data to local storage
            localStorage.setItem('formData', JSON.stringify(formData));
            // Add your logic for handling the form submission here.
            // For now, let's navigate to the checkout page
            navigate(`/profile/course`);
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="my-5 mb-28 w-full text-gray-600">
            <div className="p-5 border rounded-lg bg-white">
                <h1 className="text-xl text-content-secondary font-semibold">
                    Billing Address
                </h1>
                <p className='mt-1'>
                Add your information here.
                </p>
            </div>
            <div className='w-full bg-violet-500 border rounded-lg'>
                <h1 className='text-xl font-bold text-black-700 p-5 border-b'>Billing Address</h1>
                <div className='w-full p-8 flex flex-col gap-6'>
                    <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
                        <div className='w-full'>
                            <label htmlFor='firstName' className='px-1 font-bold'>
                                First Name
                            </label>
                            <input
                                onChange={handleChange}
                                placeholder=''
                                type='text'
                                name='firstName'
                                id='firstName'
                                className='block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none'
                            />
                            {formErrors?.firstName && (
                                <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                    <BsExclamationCircleFill className='mt-0.5' />
                                    {formErrors?.firstName}
                                </p>
                            )}
                        </div>
                        <div className='w-full'>
                            <label htmlFor='lastName' className='px-1 font-bold'>
                                Last Name
                            </label>
                            <input
                                onChange={handleChange}
                                placeholder=''
                                type='text'
                                name='lastName'
                                id='lastName'
                                className='block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none'
                            />
                            {formErrors?.lastName && (
                                <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                                    <BsExclamationCircleFill className='mt-0.5' />
                                    {formErrors?.lastName}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='w-full'>
                        <label htmlFor='contactNumber' className="px-1 font-bold">Contact Number</label>
                        <input
                            onChange={handleChange}
                            placeholder=""
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
                    <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
                        <div className='w-full'>
                            <label htmlFor='address1' className="px-1 font-bold">Address Line 1</label>
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
                            <label htmlFor='address2' className="px-1 font-bold">Address Line 2 (optional)</label>
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
                            <label htmlFor='country' className="px-1 font-bold">Country</label>
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
                            <label htmlFor='city' className="px-1 font-bold">City/State</label>
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
                            <label htmlFor='zip' className="px-1 font-bold">Zip/Postal Code</label>
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
                <div className='w-full flex items-center gap-6 my-10'>
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className='w-max mx-auto px-10 py-3 mb-8 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-800 flex items-center gap-2 rounded'
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillingAddress;