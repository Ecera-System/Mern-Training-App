import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MdCheckCircle } from 'react-icons/md';
import PageTitle from '../../Pages/Shared/PageTitle';
import useGetAllCourses from '../../API/useGetAllCourses';
import Spinner from '../../Pages/Shared/Spinner/Spinner';
import { contextProvider } from '../../Context/ContextProvider';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const UploadVideos = () => {
    const { showToast } = useContext(contextProvider);
    const [coursesData, loading] = useGetAllCourses();
    const [formData, setFormData] = useState({ course: '', module: '', title: '', description: '' });
    const [formErrors, setFormErrors] = useState({});
    const [btnLoading, setBtnLoading] = useState(false);
    const [newModule, setNewModule] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const navigate = useNavigate();


    // <!-- Upload video to cloudinary -->
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'job-portal',
            uploadPreset: 'tutorial_video'
        },
            (error, result) => {
                if (result.event === 'success') {
                    setVideoUrl(result.info.secure_url);
                };
            });
    }, []);

    // <!-- onChange input -->
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'moduleRadio' && event.target.id === 'newModule') {
            setNewModule(true);
        }
        else if (name === 'moduleRadio' && event.target.id === 'existModule') {
            setNewModule(false);
        }
    };

    // <!-- Validate form function -->
    const validateForm = (data) => {
        let errors = {};
        if (!data.course) {
            errors.course = 'Please select a course';
        }
        else if (!data.module) {
            errors.module = 'Please select or add a module';
        }
        else if (!videoUrl) {
            errors.video = 'Please upload a video file';
        }
        else if (!data.title) {
            errors.title = 'Video title is required';
        }
        return errors;
    };

    // <!-- Submit Form Data -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            setBtnLoading(true);
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_V1_URL}/course/upload-video`, {
                    ...formData,
                    video: videoUrl,
                }, {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('auth_token')
                    }
                });
                showToast({ success: res.data.success, error: '' });
                res.data.success && navigate('/admin/all-courses')
            } catch (error) {
                showToast({
                    succuss: '', error: error?.response?.data?.error,
                });
            };
            setBtnLoading(false);

        } else {
            setFormErrors(errors);
        }
    };

    return (<>
        <PageTitle title="Upload videos" />
        <div className="mt-5 pt-10 pb-20 px-8 w-full mx-auto border bg-white text-gray-600 rounded-lg">
            <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto flex flex-col gap-6">
                <h2 className="font-semibold block mb-3 text-content text-xl text-center" >
                    Upload course video
                </h2>
                <div>
                    <label className="block mb-2 text-content text-base font-medium" htmlFor="course">
                        Course
                    </label>
                    <select
                        name="course"
                        id="course"
                        className={`block w-full border rounded outline-none py-2 px-3 text-base ${formErrors?.course && 'border-red-500'}`}
                        onChange={handleChange}
                    >
                        <option value=''>Select a Course</option>
                        {
                            coursesData.map(item =>
                                <option key={item._id} value={item._id}>
                                    {item.title}
                                </option>
                            )
                        }
                    </select>
                    {
                        formErrors?.course &&
                        <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
                            <RiErrorWarningFill className="text-base mt-0.5" />
                            {formErrors?.course}
                        </p>
                    }
                </div>
                <div>
                    <p className="block mb-2 text-content text-base font-medium">
                        Module
                    </p>
                    <div className='flex items-center justify-start gap-5 mb-2 text-sm'>
                        <div className='flex items-center gap-2'>
                            <input
                                type="radio" name="moduleRadio" id="existModule"
                                onChange={handleChange}
                                checked={!newModule}
                            />
                            <label htmlFor="existModule">Exist</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type="radio" name="moduleRadio" id="newModule"
                                onChange={handleChange}
                                checked={newModule}
                            />
                            <label htmlFor="newModule">New</label>
                        </div>
                    </div>
                    {
                        newModule ?
                            <input
                                className={`block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600 ${formErrors?.module && 'border-red-500'}`}
                                type="text" disabled={!formData?.course}
                                id="module" name="module"
                                placeholder="Add a Module"
                                onChange={handleChange}
                            /> :
                            <select
                                name="module" id="module" disabled={!formData?.course}
                                className={`block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600 ${formErrors?.module && 'border-red-500'}`}
                                onChange={handleChange}
                            >
                                <option value=''>Select a Module</option>
                                {
                                    coursesData.filter(f => f._id === formData?.course)
                                        .map(course => course?.modules?.length !== 0 ?
                                            course?.modules?.map((item, index) =>
                                                <option key={index} value={item?.title}>
                                                    {item?.title}
                                                </option>
                                            )
                                            :
                                            <option value=''>Module is empty!</option>
                                        )
                                }
                            </select>
                    }
                    {
                        formErrors?.module &&
                        <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
                            <RiErrorWarningFill className="text-base mt-0.5" />
                            {formErrors?.module}
                        </p>
                    }
                </div>
                <div>
                    <div
                        onClick={() => !videoUrl && widgetRef.current.open()}
                        className={`${!videoUrl && 'cursor-pointer'} w-max py-2 px-8 mt-2 text-violet-600 hover:bg-gray-200 duration-300 border border-violet-600 rounded text-base font-medium`}
                    >
                        {
                            videoUrl ?
                                <p className='flex items-center gap-2'>
                                    <span>Video Uploaded</span>
                                    <MdCheckCircle className='inline-block text-emerald-500 text-xl' />
                                </p>
                                : <p>Upload Video</p>
                        }
                    </div>
                    {
                        formErrors?.video &&
                        <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
                            <RiErrorWarningFill className="text-base mt-0.5" />
                            {formErrors?.video}
                        </p>
                    }
                </div>
                <div>
                    <label className="block mb-2 text-content text-base font-medium" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title" name='title' type='text'
                        className={`block w-full border rounded outline-none py-1 px-3 text-base focus:border-violet-600 placeholder:text-sm ${formErrors?.title && 'border-red-500'}`}
                        placeholder='Add video Title'
                        onChange={handleChange}
                    >
                    </input>
                    {
                        formErrors?.title &&
                        <p className='mt-1 text-sm text-red-500 flex gap-1 items-start'>
                            <RiErrorWarningFill className="text-base mt-0.5" />
                            {formErrors?.title}
                        </p>
                    }
                </div>
                <div>
                    <label className="block mb-2 text-content text-base font-medium" htmlFor="description">
                        Description <span className='font-normal'>(optional)</span>
                    </label>
                    <textarea
                        id="description" name='description' rows="3" cols=""
                        className={`block w-full border rounded outline-none py-1 px-3 text-base focus:border-violet-600 placeholder:text-sm`}
                        placeholder='write a description about the video.'
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-2 flex justify-center">
                    <button
                        type="submit"
                        className='px-10 py-3 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center gap-2 rounded'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

        {
            (loading || btnLoading) && <Spinner />
        }
    </>);
};

export default UploadVideos;