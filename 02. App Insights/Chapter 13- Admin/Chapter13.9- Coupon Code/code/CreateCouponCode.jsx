import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useGetAllCourses from '../../API/useGetAllCourses';
import { contextProvider } from '../../Context/ContextProvider';
import PageTitle from '../../Pages/Shared/PageTitle';
import Spinner from '../../Pages/Shared/Spinner/Spinner';

const CreateCouponCode = ({ setState }) => {
    const { showToast } = useContext(contextProvider);
    const [coursesData] = useGetAllCourses();
    const [formData, setFormData] = useState({
        name: '',
        courseId: '',
        couponCode: '',
        discount: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


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
        if (!data.name) {
            errors.name = 'Coupon name is required!';
        };
        if (!data.courseId) {
            errors.courseId = "Please select a course!";
        };
        if (!data.couponCode) {
            errors.couponCode = "Coupon code is required!";
        };
        if (!data.discount) {
            errors.discount = "Discount is required!";
        };
        return errors;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            setLoading(true);
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_V1_URL}/coupon-code`, {
                    name: formData.name,
                    courseId: formData.courseId,
                    couponCode: formData.couponCode,
                    discount: formData.discount,
                }, {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('auth_token')
                    }
                });
                const success = res.data.success;
                showToast({
                    success: success,
                    error: ''
                });
                success && setState("list");
            } catch (err) {
                showToast({
                    succuss: '', error: err?.response?.data?.error,
                });
                if (err?.response?.data?.notExist) {
                    localStorage.removeItem('auth_token');
                    return navigate('/sign-in');
                }
            };
            setLoading(false);
        } else {
            setFormErrors(errors);
        }
    };

    return (<>
        <PageTitle title="Add Coupon Code" />
        <div className="mt-5 py-6 px-8 w-full mx-auto border bg-white text-gray-600 rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="name"
                    >
                        Coupon Name
                    </label>
                    <input
                        className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                        type="text" id="name" name='name'
                        placeholder="Enter coupon name"
                        onChange={handleChange}
                    />
                    {
                        formErrors?.name &&
                        <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                            <AiOutlineWarning className="text-base mt-0.5" />
                            {formErrors?.name}
                        </p>
                    }
                </div>
                <div>
                    <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="courseId"
                    >
                        Select Course
                    </label>
                    <select
                        id="courseId" name='courseId'
                        className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                        onChange={handleChange}
                    >
                        <option>Select Course</option>
                        {coursesData?.map(course =>
                            <option
                                key={course._id}
                                value={course._id}
                            >{course.title}</option>
                        )}
                    </select>
                    {
                        formErrors?.courseId &&
                        <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                            <AiOutlineWarning className="text-base mt-0.5" />
                            {formErrors?.courseId}
                        </p>
                    }
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <label
                            className="font-semibold block mb-2 text-content text-sm"
                            htmlFor="couponCode"
                        >
                            Coupon code
                        </label>
                        <input
                            className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                            type="text" id="couponCode" name='couponCode'
                            placeholder="Enter coupon code"
                            onChange={handleChange}
                        />
                        {
                            formErrors?.couponCode &&
                            <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                                <AiOutlineWarning className="text-base mt-0.5" />
                                {formErrors?.couponCode}
                            </p>
                        }
                    </div>
                    <div>
                        <label
                            className="font-semibold block mb-2 text-content text-sm"
                            htmlFor="discount"
                        >
                            Discount Percentage
                        </label>
                        <input
                            className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                            placeholder="Ex: 20%"
                            type="number" id="discount" name='discount'
                            onChange={handleChange}
                        />
                        {
                            formErrors?.discount &&
                            <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                                <AiOutlineWarning className="text-base mt-0.5" />
                                {formErrors?.discount}
                            </p>
                        }
                    </div>
                </div>
                <div className="my-3">
                    <button
                        type="submit"
                        className='px-8 py-2.5 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center gap-2 rounded'
                    >
                        Create Coupon Code
                    </button>
                </div>
            </form>
        </div>
        {
            loading && <Spinner />
        }
    </>);
};

export default CreateCouponCode;