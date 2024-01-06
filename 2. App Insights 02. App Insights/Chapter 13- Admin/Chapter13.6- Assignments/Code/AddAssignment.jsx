import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useGetAllCourses from '../../API/useGetAllCourses';
import { contextProvider } from '../../Context/ContextProvider';
import PageTitle from '../../Pages/Shared/PageTitle';
import Spinner from '../../Pages/Shared/Spinner/Spinner';

const AddAssignment = ({ setState }) => {
    const { showToast } = useContext(contextProvider);
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        courseId: '',
        mark: '',
        deadline: '',
        hints: '',
        brief: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const [coursesData] = useGetAllCourses();


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
            errors.name = 'Assignment name is required!';
        };
        if (!data.courseId) {
            errors.courseId = "Please select a course!";
        };
        if (!data.mark) {
            errors.mark = "Assignment mark is required!";
        };
        if (!data.deadline) {
            errors.deadline = "Assignment deadline is required!";
        };
        if (!editorRef.current.getContent()) {
            errors.brief = "Assignment brief is required!";
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
                const res = await axios.post(`${import.meta.env.VITE_API_V1_URL}/assignment`, {
                    ...formData,
                    brief: editorRef.current.getContent()
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
                success && setState("show");
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
        <PageTitle title="Add Assignments" />
        <div className="mt-5 py-6 px-8 w-full mx-auto border bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="name"
                    >
                        Assignment Name
                    </label>
                    <input
                        className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                        type="text" id="name" name='name'
                        placeholder="Enter assignment name"
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
                            htmlFor="mark"
                        >
                            Assignment Mark
                        </label>
                        <input
                            className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                            type="number" id="mark" name='mark'
                            placeholder="Enter assignment mark"
                            onChange={handleChange}
                        />
                        {
                            formErrors?.mark &&
                            <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                                <AiOutlineWarning className="text-base mt-0.5" />
                                {formErrors?.mark}
                            </p>
                        }
                    </div>
                    <div>
                        <label
                            className="font-semibold block mb-2 text-content text-sm"
                            htmlFor="deadline"
                        >
                            Deadline
                        </label>
                        <input
                            className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                            type="date" id="deadline" name='deadline'
                            onChange={handleChange}
                        />
                        {
                            formErrors?.deadline &&
                            <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                                <AiOutlineWarning className="text-base mt-0.5" />
                                {formErrors?.deadline}
                            </p>
                        }
                    </div>
                </div>
                {/* <div className="my-5">
                    <div>
                        <label
                            className="font-semibold block mb-2 text-content text-sm"
                            htmlFor="student"
                        >
                            Select Student
                        </label>
                        <select
                            id="student"
                            className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                            onChange={handleChange}
                        // onChange={(e) => setStudent(e.target.value)}
                        >
                            <option>Select Student</option>
                            <option value="all-student">All Student</option>
                            <option value={'userId'}>{`${'firstName'} ${'lastName'}`}</option>
                        </select>
                    </div>
                </div> */}
                <div>
                    <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="hints"
                    >
                        Assignment Hints/Resources
                    </label>
                    <textarea
                        className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600 h-32"
                        type="text" id="hints" name='hints'
                        placeholder="Describe assignment hints/resources"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="brief"
                    >
                        Assignment Brief
                    </label>
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            statusbar: false,
                        }}
                    />
                    {
                        formErrors?.brief &&
                        <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                            <AiOutlineWarning className="text-base mt-0.5" />
                            {formErrors?.brief}
                        </p>
                    }
                </div>
                <div className="mt-5">
                    <button 
                        type="submit"
                        className='px-8 py-2.5 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center gap-2 rounded'
                    >
                        
                        Create Assignment
                    </button>
                </div>
            </form>
        </div>
        {
            loading && <Spinner />
        }
    </>);
};

export default AddAssignment;