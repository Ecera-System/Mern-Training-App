import axios from 'axios';
import { useContext, useState } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { contextProvider } from '../../../Context/ContextProvider';
import CountryList from '../../Shared/CountryList';
import Spinner from '../../Shared/Spinner/Spinner';

const AddressForm = ({ profileData, setEditAddress }) => {
    const { showToast } = useContext(contextProvider);
    const { _id, country, city, address1, zip } = profileData;
    const [formData, setFormData] = useState({
        country: country,
        city: city,
        address1: address1,
        zip: zip,
    });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);


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

        if (!data.country) {
            errors.country = 'Select a country!';
        };
        if (!data.city) {
            errors.city = 'City is required!';
        }
        if (!data.address1) {
            errors.address1 = 'Address is required!';
        };
        if (!data.zip) {
            errors.zip = 'Zip code is required!';
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
                update: 'address',
            }, {
                method: 'PATCH',
                headers: {
                    'Authorization': localStorage.getItem('auth_token')
                }
            })
                .then(res => {
                    res.data && setEditAddress(false);
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
        <form onSubmit={handleSubmit}>
            <ul className='list-none grid md:grid-cols-2 grid-cols-1 gap-8 my-10'>
                <li>
                    <label htmlFor='country' className='text-sm text-gray-500'>Country</label>
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
                </li>
                <li>
                    <label htmlFor='city' className="text-sm text-gray-500">City/State</label>
                    <input
                        onChange={handleChange}
                        defaultValue={city}
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
                </li>
                <li>
                    <label htmlFor='address1' className="text-sm text-gray-500">Address</label>
                    <input
                        onChange={handleChange}
                        defaultValue={address1}
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
                </li>
                <li>
                    <label htmlFor='zip' className="text-sm text-gray-500">Zip/Postal Code</label>
                    <input
                        onChange={handleChange}
                        defaultValue={zip}
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

export default AddressForm;