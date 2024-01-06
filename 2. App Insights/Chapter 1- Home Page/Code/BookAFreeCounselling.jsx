import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import { contextProvider } from '../../Context/ContextProvider';
import SpinnerBtn from '../Shared/Spinner/SpinnerBtn';

const BookAFreeCounselling = () => {
    const { showToast } = useContext(contextProvider);
    const [isBooking, setIsBooking] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        slots: [{ date: '', time: '' }], // An array of slots, initially one empty slot
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        setTimeout(() => {
            if (isSuccess) {
                setIsSuccess(false);
                setIsBooking(false);
            }
        }, 8000);
    }, [isSuccess]);

    // Function to add more slots for date and time selection
    const addSlot = () => {
        setFormData(prevState => ({
            ...prevState,
            slots: [...prevState.slots, { date: '', time: '' }],
        }));
    };

    // Function to remove a slot for date and time selection
    const removeSlot = (index) => {
        setFormData(prevState => {
            const updatedSlots = prevState.slots.filter((_, i) => i !== index);
            return {
                ...prevState,
                slots: updatedSlots,
            };
        });
    };

    // <!-- Validate form function -->
    const validateForm = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Name is required!';
        }
        if (!data.email) {
            errors.email = 'Email is required!';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid!';
        }
        if (!data.contactNumber) {
            errors.contactNumber = 'Contact Number is required!';
        } else if (!/^-?\d+\.?\d*$/.test(data.contactNumber)) {
            errors.contactNumber = 'Contact Number is invalid!';
        }
        if (data.slots.length === 0) {
            errors.slots = 'Please select at least one date and time slot!';
        } else {
            // Check if all slots are selected
            for (const slot of data.slots) {
                if (!slot.date || !slot.time) {
                    errors.slots = 'Please select a date and time for all slots!';
                    break;
                }
            }
        }

        return errors;
    };

    // <!-- Submit Form Data -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_V1_URL}/book-counselling`, formData)
                .then(res => {
                    res?.data?.success && setIsSuccess(true);
                })
                .catch(err => {
                    showToast({
                        succuss: '', error: err?.response?.data?.error,
                    });
                });
            setLoading(false);
        } else {
            setFormErrors(errors);
        }
    };

    return (<>
        <div className='flex justify-center'>
            <button
                onClick={() => setIsBooking(true)}
                className='sm:px-8 px-5 py-3 sm:text-base text-sm font-medium bg-[#FFD500] text-black hover:shadow-[0_3px_15px_rgb(255,213,0.5)] duration-300 flex items-center gap-2 rounded-full'
            >
                Book a Free Counselling Session Now
                <HiArrowNarrowRight className='text-2xl font-bold' />
            </button>
        </div>

        {isBooking &&
            <div className='fixed inset-0 z-50 bg-black/60 grid place-items-center overflow-y-auto py-5'>
                <div className='md:w-[35rem] w-11/12 bg-black md:p-10 p-6 rounded-lg relative'>

                    {/* Close btn */}
                    <div
                        onClick={() => setIsBooking(false)}
                        className='absolute top-5 right-5 z-50 rounded-full hover:bg-violet-100 duration-300 p-1 cursor-pointer'
                    >
                        <IoCloseSharp className='text-3xl text-gray-700' />
                    </div>
                    {
                        isSuccess ?
                            <div className=''>
                                <div>
                                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                    </svg>
                                </div>
                                <p className='text-base text-center mt-5 text-white'>
                                    The request has been submitted. Someone from the team will contact you shortly.
                                </p>
                            </div> :
                            <form
                                onSubmit={handleSubmit}
                                className='w-full h-full flex flex-col gap-6'
                            >

                                <div>
                                    <h className='text-2xl font-semibold text-yellow-400'>
                                        Book a Free Counselling Session
                                    </h>
                                </div>

                                <div>
                                    <label htmlFor='name' className="px-1 text-white">Full Name</label>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        value={formData.name}
                                        placeholder=""
                                        type="text" name='name' id='name'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-black border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {formErrors?.name &&
                                        <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
                                            <RiErrorWarningFill className="text-base mt-0.5" />
                                            {formErrors?.name}
                                        </p>
                                    }
                                </div>

                                <div>
                                    <label htmlFor='email' className="px-1 text-white">Email</label>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        value={formData.email}
                                        placeholder=""
                                        type="text" name='email' id='email'
                                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-black border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                                    />
                                    {formErrors?.email &&
                                        <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
                                            <RiErrorWarningFill className="text-base mt-0.5" />
                                            {formErrors?.email}
                                        </p>
                                    }
                                </div>

                                <div>
    <label htmlFor='contactNumber' className="px-1 text-white">Contact Number</label>
    <div className="flex items-center gap-2">
        <select
            value={formData.countryCode}
            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
            className="block mt-2 px-3 py-2 rounded-lg w-50 bg-white text-black border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
        >
              <option value="">No Country Selected</option>
    <option value="+1">United States (+1)</option>
    <option value="+91">India (+91)</option>
    <option value="+44">United Kingdom (+44)</option>
    <option value="+49">Germany (+49)</option>
    <option value="+33">France (+33)</option>
    <option value="+81">Japan (+81)</option>
    <option value="+86">China (+86)</option>
    <option value="+7">Russia (+7)</option>
        </select>
        <input
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            value={formData.contactNumber}
            placeholder=""
            type="text" name='contactNumber' id='contactNumber'
            className="block mt-2 flex-1 px-3 py-2 rounded-lg bg-white text-black border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
        />
    </div>
    {formErrors?.contactNumber &&
        <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
            <RiErrorWarningFill className="text-base mt-0.5" />
            {formErrors?.contactNumber}
        </p>
    }
</div>


                                {/* Rendering slots for date and time selection */}
                                {formData.slots.map((slot, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div>
                                            <label htmlFor={`date-${index}`} className="px-1">Date</label>
                                            
                                            <select
                                                id={`date-${index}`}
                                                value={slot.date}
                                                onChange={(e) => setFormData(prevState => {
                                                    const updatedSlots = [...prevState.slots];
                                                    updatedSlots[index].date = e.target.value;
                                                    return {
                                                        ...prevState,
                                                        slots: updatedSlots,
                                                    };
                                                })}
                                                className="block mt-2 px-3 py-2 rounded-lg w-full text-center bg-white text-black border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                            >
                                                
                                                <option value="">Select a date</option>
                                                {/* Add available date options here */}
                                                <option value="2023-12-15">December 15, 2023</option>
                                                <option value="2023-12-25">December 25, 2023</option>
                                                <option value="2024-1-1">January 1, 2024</option>
                                                <option value="2024-1-5">January 5, 2024</option>
                                                <option value="2024-1-10">January 10, 2024</option>
                                                <option value="2024-1-15">January 15, 2024</option>


                                                
                                            </select>
                                            {formErrors?.slots?.[index]?.date &&
                                                <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
                                                    <RiErrorWarningFill className="text-base mt-0.5" />
                                                    {formErrors?.slots[index]?.date}
                                                </p>
                                            }
                                        </div>

                                        <div>
                                            <label htmlFor={`time-${index}`} className="px-1">Time</label>
                                            <select
                                                id={`time-${index}`}
                                                value={slot.time}
                                                onChange={(e) => setFormData(prevState => {
                                                    const updatedSlots = [...prevState.slots];
                                                    updatedSlots[index].time = e.target.value;
                                                    return {
                                                        ...prevState,
                                                        slots: updatedSlots,
                                                    };
                                                })}
                                                className="block mt-2 px-3 text-center py-2 rounded-lg w-full bg-white text-black border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                                            >
                                                <option value="">Select a time</option>
                                                {/* Add available time options here */}
                                                <option value="04:00 AM">4:00 PM</option>
                                                <option value="06:00 PM">6:00 PM</option>
                                                <option value="08:00 PM">8:00 PM</option>
                                            </select>
                                            {formErrors?.slots?.[index]?.time &&
                                                <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
                                                    <RiErrorWarningFill className="text-base mt-0.5" />
                                                    {formErrors?.slots[index]?.time}
                                                </p>
                                            }
                                        </div>

                                        {/* Render add slot button for all slots except the last one */}
                                        {index < formData.slots.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSlot(index)}
                                                className="px-2 py-1.5 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                            

                                <div className='flex flex-col items-center justify-center'>
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className='w-max mt-3 px-8 py-3 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center gap-2 rounded-md hover:shadow-[0_3px_15px_rgb(124,58,237,0.5)]'
                                    >
                                        {loading ?
                                            <SpinnerBtn
                                                parentClass={'w-14'}
                                                childClass={'bg-white'}
                                            />
                                            : 'Submit'
                                        }
                                    </button>
                                </div>

                            </form>
                    }
                </div>
            </div>
        }
    </>);
};

export default BookAFreeCounselling;
