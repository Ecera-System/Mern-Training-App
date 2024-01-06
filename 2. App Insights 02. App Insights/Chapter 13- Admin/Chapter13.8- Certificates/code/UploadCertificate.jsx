import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useGetAllCourses from '../../API/useGetAllCourses';
import { contextProvider } from '../../Context/ContextProvider';
import PageTitle from '../../Pages/Shared/PageTitle';
import Spinner from '../../Pages/Shared/Spinner/Spinner';

const UploadCertificate = ({ setState }) => {
    const { showToast } = useContext(contextProvider);
    const [coursesData] = useGetAllCourses();
    const [courseId, setCourseId] = useState('');
    const [certificateImage, setCertificateImage] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const captureImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCertificateImage(reader.result);
        };
    };


    // <!-- Validate form function -->
    const validateForm = (data) => {
        let errors = {};
        if (!courseId) {
            errors.courseId = 'Please select a course!';
        }
        if (!certificateImage) {
            errors.certificateImage = 'Please upload certificate image!';
        }
        return errors;
    };


    // <!-- Handle Submit -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm(certificateImage);

        if (Object.keys(errors).length === 0) {
            try {
                setFormErrors({});
                setLoading(true);
                const res = await axios.patch(`${import.meta.env.VITE_API_V1_URL}/certificate`, {
                    courseId,
                    certificate: certificateImage,
                }, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': localStorage.getItem('auth_token')
                    }
                });

                const success = res.data.success;
                showToast({
                    success: success,
                    error: ''
                });

            } catch (err) {
                showToast({
                    succuss: '', error: err?.response?.data?.error,
                });
                if (err?.response?.data?.notExist) {
                    localStorage.removeItem('auth_token');
                    return navigate('/sign-in');
                }
            }
            setLoading(false);

        }
        else {
            setFormErrors(errors);
        }
    };
    return (<>
        <PageTitle title="Upload Certificate" />
        <div className="mt-5 py-6 px-8 w-full mx-auto border bg-white text-gray-600 rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label
                        className="font-semibold block mb-2 text-content text-base"
                        htmlFor="courseId"
                    >
                        Select Course
                    </label>
                    <select
                        id="courseId" name='courseId'
                        className="block w-full border rounded outline-none py-2 px-3 text-base focus:border-violet-600"
                        onChange={(e) => setCourseId(e.target.value)}
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
                <div>
                    <label
                        className="text-content text-base font-medium block mb-2"
                        htmlFor="certificate"
                    >
                        Upload Certificate
                    </label>
                    <input
                        className="block w-full border rounded py-1.5 px-3 text-base outline-none"
                        type="file"
                        id="certificate"
                        onChange={captureImage}
                    />
                    {
                        formErrors?.certificateImage &&
                        <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                            <AiOutlineWarning className="text-base mt-0.5" />
                            {formErrors?.certificateImage}
                        </p>
                    }
                </div>
                <div className="mt-5">
                    <button
                        type="submit"
                        className='px-8 py-3 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center gap-2 rounded'
                    >
                        Upload Certificate
                    </button>
                </div>
            </form>
        </div>
        {
            loading && <Spinner />
        }
    </>);
};

export default UploadCertificate;