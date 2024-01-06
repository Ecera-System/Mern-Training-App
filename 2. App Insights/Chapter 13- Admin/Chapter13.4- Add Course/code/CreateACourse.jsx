import React, { useContext, useState } from 'react';
import PageTitle from '../../Pages/Shared/PageTitle';
import { AiOutlineWarning } from 'react-icons/ai';
import { BsQuestionCircle } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { FcAddImage } from 'react-icons/fc';
import { contextProvider } from '../../Context/ContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SpinnerBtn from '../../Pages/Shared/Spinner/SpinnerBtn';

const CreateACourse = ({ setUpload }) => {
    const { showToast } = useContext(contextProvider);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [openPathImg, setOpenPathImg] = useState(false);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [dragActive, setDragActive] = useState(false);


    // <!-- Input file -->
    const handleCoverPhoto = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

        if (file && allowedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                setCoverPhoto(reader.result);
                setError({ ...error, cover_photo: "", });
            };
        } else {
            setCoverPhoto(null);
            setError({ ...error, cover_photo: "Only jpg, jpeg, or png files are accepted.", });
        }
    };

    // <!-- Handling Drag -->
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // <!-- Handling Drop -->
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

        if (file && allowedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.readAsDataURL(e.dataTransfer.files[0]);
            reader.onloadend = () => {
                setCoverPhoto(reader.result);
                setError({ ...error, cover_photo: "", });
            };
        } else {
            setCoverPhoto(null);
            setError({ ...error, cover_photo: "Only jpg, jpeg, or png files are accepted.", });
        }
    };


    // <!-- Handle Submit -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = event.target.courseTitle.value;
        const price = event.target.price.value;
        const src_path = event.target.src_path.value;

        if (!title) return setError({ ...error, title: 'Course title is required!', src_path: '' });
        if (!price) return setError({ ...error, title: '', price: 'Course price is required!', src_path: '' });
        if (!src_path) return setError({ ...error, title: '', price: '', src_path: 'Path name is required!' });
        if (!coverPhoto) return setError({ ...error, title: '', price: '', src_path: '', cover_photo: 'Cover photo is required!' });

        setError('');
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_V1_URL}/course`, {
                title, price, src_path, cover_photo: coverPhoto
            }, {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('auth_token')
                }
            });
            showToast({
                success: res.data.success,
                error: ''
            });
            res.data.success && setUpload('video');
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
    };


    return (<>
        <PageTitle title="Add a new course title" />
        <div className="mt-5 pt-10 pb-20 px-8 w-full mx-auto border bg-white text-gray-600 rounded-lg">
            <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
                <h2
                    className="font-semibold block mb-10 text-content text-xl text-center"
                >
                    Add a new Course
                </h2>
                <div>
                    <label
                        className="mb-2 inline-block text-base font-medium"
                        htmlFor="price"
                    >
                        Course title
                    </label>
                    <input
                        id="courseTitle" name='courseTitle' type='text'
                        className="block w-full border rounded outline-none py-2 px-3 text-base focus:border-violet-600"
                        placeholder='Enter title'
                    />
                    {
                        error?.title &&
                        <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                            <AiOutlineWarning className="text-base mt-0.5" />
                            {error?.title}
                        </p>
                    }
                </div>
                <div className='mt-5'>
                    <label
                        className="mb-2 inline-block text-base font-medium"
                        htmlFor="price"
                    >
                        Course fee
                    </label>
                    <input
                        id="price" name='price' type='number' min={0}
                        className="block w-full border rounded outline-none py-2 px-3 text-base focus:border-violet-600"
                        placeholder='Enter price'
                    />
                    {
                        error?.price &&
                        <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                            <AiOutlineWarning className="text-base mt-0.5" />
                            {error?.price}
                        </p>
                    }
                </div>
                <div className='mt-5 relative'>
                    <div className='w-max absolute top-1 right-1' >
                        {
                            openPathImg ?
                                <CgClose
                                    onClick={() => setOpenPathImg(false)}
                                    className='text-lg border rounded-full border-gray-600 hover:border-emerald-500 hover:text-emerald-500 duration-300 cursor-pointer'
                                /> :
                                <BsQuestionCircle
                                    onClick={() => setOpenPathImg(!openPathImg)}
                                    className='text-lg hover:text-emerald-500 duration-300 cursor-pointer'
                                />
                        }
                        {
                            openPathImg && <div
                                className='absolute top-6 right-1/2 translate-x-1/2 w-[30rem] h-auto p-6 border bg-white rounded-md shadow-[0_5px_20px_20px_rgba(124,58,237,0.1)]'
                            >
                                <p className='text-sm text-gray-800 mb-2'>
                                    This Path will locate on the course page while a user is going enrolling. If this path doesn't match the URL path of the course page, no one will be able to enroll in this course. <br />
                                    Enter the correct path name like this:
                                </p>
                                <img
                                    src="/images/admin/src_path.png"
                                    alt="src path"
                                    className='w-full h-auto'
                                />
                            </div>
                        }
                    </div>
                    <label
                        className="mb-2 mr-5 inline-block text-base font-medium"
                        htmlFor="src_path"
                    >
                        Enter the correct URL path name of Course page
                    </label>
                    <input
                        id="src_path" name='src_path' type='text'
                        className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                        placeholder='Ex: "/programs/course-path-name"'
                    />
                    {
                        error?.src_path &&
                        <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                            <AiOutlineWarning className="text-base mt-0.5" />
                            {error?.src_path}
                        </p>
                    }
                </div>
                <div className='mt-5'>
                    <label className="mb-2 block text-base font-medium" htmlFor="cover_photo" >
                        <span>
                            Cover photo
                        </span>
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`${dragActive ? 'border-emerald-500 bg-violet-50 animate-pulse' : ''} w-full text-center border-2 border-dashed rounded-md mt-2 cursor-pointer p-5`}
                        >
                            {coverPhoto ?
                                <div className='w-full'>
                                    <img src={coverPhoto} alt="Course cover" className='w-40 h-auto mx-auto mb-2' />
                                </div> :
                                <FcAddImage className='text-5xl mx-auto' />
                            }
                            <p className='text-lg text-emerald-600'>
                                Drop here cover photo or browse
                            </p>
                        </div>
                    </label>
                    <input
                        id="cover_photo" name='cover_photo' type='file'
                        className="hidden"
                        onChange={handleCoverPhoto}
                    />
                    {
                        error?.cover_photo &&
                        <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                            <AiOutlineWarning className="text-base mt-0.5" />
                            {error?.cover_photo}
                        </p>
                    }
                </div>
                <div className="mt-7 flex justify-center">
                    <button
                        disabled={loading}
                        type="submit"
                        className='px-8 py-3 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center gap-2 rounded'
                    >
                        {loading ?
                            <SpinnerBtn
                                parentClass={'w-20'}
                                childClass={'bg-gray-200'}
                            />
                            : 'New Course'
                        }
                    </button>
                </div>
            </form>
        </div>
    </>);
};

export default CreateACourse;