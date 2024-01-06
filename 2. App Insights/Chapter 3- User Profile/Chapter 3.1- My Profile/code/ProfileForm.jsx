import axios from 'axios';
import { useContext, useState } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { contextProvider } from '../../../Context/ContextProvider';
import Spinner from '../../Shared/Spinner/Spinner';

const ProfileForm = ({ profileData, setEditProfile }) => {
    const { showToast } = useContext(contextProvider);
    const { _id, name, avatar, userId, birthday } = profileData;
    const [formData, setFormData] = useState({
        name: name,
        contactNumber: userId.contactNumber,
        birthday: birthday
    });
    const [formErrors, setFormErrors] = useState({});
    const [profilePhoto, setProfilePhoto] = useState('');
    const [loading, setLoading] = useState(false);


    // <!-- Capture profile photo -->
    const captureAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfilePhoto(reader.result);
        };
    };

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
            errors.name = 'Name is required!';
        };
        if (!data.contactNumber) {
            errors.contactNumber = 'Contact Number is required!';
        } else if (!/^-?\d+\.?\d*$/.test(data.contactNumber)) {
            errors.contactNumber = 'Invalid contact number!';
        };
        if (!data.birthday) {
            errors.birthday = 'Date of Birth is required!';
        };

        return errors;
    };

    // <!-- Submit Form Data -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            setLoading(true);

            await axios.patch(`${import.meta.env.VITE_API_V1_URL}/profile/${_id}`, {
                ...formData,
                avatar: profilePhoto || avatar,
                update: 'info',
            }, {
                method: 'PATCH',
                headers: {
                    'Authorization': localStorage.getItem('auth_token')
                }
            })
                .then(res => {
                    setEditProfile(false);
                    showToast({
                        succuss: res.data.success, error: '',
                    });
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
        <form onSubmit={handleSubmit} className='flex md:flex-row flex-col justify-between md:items-start items-center gap-5 my-10'>
            <div className='md:w-2/5 w-full flex flex-col items-center gap-5 pt-5'>
                <div>
                    <img
                        src={profilePhoto || (
                            avatar ?
                                (
                                    avatar.includes("/images/") ?
                                        import.meta.env.VITE_API_V1_URL + avatar
                                        : avatar
                                )
                                : '/images/nav/avatar.png'
                        )}
                        alt="Avatar"
                        className='w-[9.4rem] h-[9.4rem] max-w-full object-cover rounded-full'
                        loading='lazy'
                    />
                </div>
                <div className='text-center'>
                    <label
                        htmlFor="avatar"
                        className='inline-block cursor-pointer text-black bg-yellow-400 hover:bg-yellow-500 duration-300 px-6 py-2.5 rounded text-sm font-medium'
                    >
                        Upload Photo
                    </label>
                    <input
                        type="file" name="avatar" id="avatar"
                        className='hidden'
                        onChange={captureAvatar}
                    />
                </div>
            </div>
            <ul className='list-none md:w-3/5 w-full flex flex-col gap-5'>
                <li>
                    <label htmlFor='name' className='text-sm text-gray-500'>Full Name</label>
                    <input
                        onChange={handleChange}
                        defaultValue={name}
                        placeholder=""
                        type="text" name='name' id='name'
                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:border-violet-600 focus:outline-none"
                    />
                    {
                        formErrors?.name &&
                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                            <BsExclamationCircleFill className="mt-0.5" />
                            {formErrors?.name}
                        </p>
                    }
                </li>
                <li>
                    <label htmlFor='email' className='text-sm text-gray-500'>
                        Email Address<span className='ml-2 text-xs font-medium'>(Email Address cannot be changed)</span>
                    </label>
                    <input
                        defaultValue={userId.email}
                        readOnly
                        type="email" name='email' id='email'
                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:border-violet-600 focus:outline-none"
                    />
                </li>
                <li>
                    <label htmlFor='contactNumber' className='text-sm text-gray-500'>Contact Number</label>
                    <input
                        onChange={handleChange}
                        defaultValue={userId.contactNumber}
                        type="text" name='contactNumber' id='contactNumber'
                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:border-violet-600 focus:outline-none"
                    />
                    {
                        formErrors?.contactNumber &&
                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                            <BsExclamationCircleFill className="mt-0.5" />
                            {formErrors?.contactNumber}
                        </p>
                    }
                </li>
                <li>
                    <label htmlFor='birthday' className='text-sm text-gray-500'>Date of Birth</label>
                    <input
                        onChange={handleChange}
                        defaultValue={birthday}
                        type="date" name='birthday' id='birthday'
                        className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:border-violet-600 focus:outline-none"
                    />
                    {
                        formErrors?.birthday &&
                        <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
                            <BsExclamationCircleFill className="mt-0.5" />
                            {formErrors?.birthday}
                        </p>
                    }
                </li>
                <li>
                    <button
                        type="submit"
                        className='px-5 py-2.5 mt-2 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white rounded-lg'
                    >
                        Save Changes
                    </button>
                </li>
            </ul>
        </form>
        {
            loading && <Spinner />
        }
    </>);
};

export default ProfileForm;