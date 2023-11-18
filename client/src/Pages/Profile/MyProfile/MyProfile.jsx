import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import PageTitle from '../../Shared/PageTitle';
import useGetProfile from '../../../API/useGetProfile';
import Spinner from '../../Shared/Spinner/Spinner';
import ProfileForm from './ProfileForm';
import AddressForm from './AddressForm';

const MyProfile = () => {
    const [profileData, loading] = useGetProfile();
    const [editProfile, setEditProfile] = useState(false);
    const [editAddress, setEditAddress] = useState(false);

    if (loading) return <Spinner />;

    const { name, avatar, userId, birthday, country, city, address1, zip } = profileData;

    return (<>
        <PageTitle title={`Profile`} />
        <div className="mt-5 mb-28 w-full bg-white text-gray-600 rounded-lg border">
            <section className='p-6'>
                <div className='flex justify-between items-center'>
                    <h3 className="font-semibold text-2xl">My Profile</h3>
                    <button
                        onClick={() => setEditProfile(!editProfile)}
                        className='flex items-center gap-1.5 py-1 px-2 rounded text-sm font-medium text-violet-600 hover:bg-violet-100 duration-300'
                    >
                        {editProfile ? 'Cancel' : <><FaRegEdit />Edit</>}
                    </button>
                </div>
                {
                    editProfile ?
                        <ProfileForm
                            profileData={profileData}
                            setEditProfile={setEditProfile}
                        /> :
                        <div className='flex md:flex-row flex-col justify-between items-center gap-5 my-10'>
                            <div className='md:w-2/5 w-full flex flex-col items-center gap-5'>
                                <div>
                                    <img
                                        src={avatar ?
                                            (
                                                avatar.includes("/images/") ?
                                                    import.meta.env.VITE_API_V1_URL + avatar
                                                    : avatar
                                            )
                                            : '/images/nav/avatar.png'
                                        }
                                        alt="Avatar"
                                        className='w-[9.4rem] h-[9.4rem] max-w-full object-cover rounded-full'
                                        loading='lazy'
                                    />
                                </div>
                                <button
                                    onClick={() => setEditProfile(true)}
                                    className='text-black bg-yellow-400 hover:bg-yellow-500 duration-300 px-6 py-2.5 rounded text-sm font-medium'
                                >
                                    Change Photo
                                </button>
                            </div>
                            <ul className='list-none md:w-3/5 w-full flex flex-col gap-5'>
                                <li>
                                    <span className='text-sm text-gray-500'>Full Name</span>
                                    <p className='font-semibold'>
                                        {name}
                                    </p>
                                </li>
                                <li>
                                    <span className='text-sm text-gray-500'>Email Address</span>
                                    <p className='font-semibold'>
                                        {userId.email}
                                    </p>
                                </li>
                                <li>
                                    <span className='text-sm text-gray-500'>Contact Number</span>
                                    <p className='font-semibold'>
                                        {userId?.contactNumber ? userId.contactNumber : '--'}
                                    </p>
                                </li>
                                <li>
                                    <span className='text-sm text-gray-500'>Date of Birth</span>
                                    <p className='font-semibold'>
                                        {birthday ? birthday : '--'}
                                    </p>
                                </li>
                            </ul>
                        </div>
                }
            </section>
            <hr />
            <section className='p-6'>
                <div className='flex justify-between items-center'>
                    <h3 className="font-semibold text-2xl">Address</h3>
                    <button
                        onClick={() => setEditAddress(!editAddress)}
                        className='flex items-center gap-1.5 py-1 px-2 rounded text-sm font-medium text-violet-600 hover:bg-violet-100 duration-300'
                    >
                        {editAddress ? 'Cancel' : <><FaRegEdit />Edit</>}
                    </button>
                </div>
                <div>
                    {editAddress ?
                        <AddressForm
                            profileData={profileData}
                            setEditAddress={setEditAddress}
                        /> :
                        <ul className='list-none grid md:grid-cols-2 grid-cols-1 gap-y-5 my-10'>
                            <li>
                                <span className='text-sm text-gray-500'>Country</span>
                                <p className='font-semibold'>
                                    {country ? country : '--'}
                                </p>
                            </li>
                            <li>
                                <span className='text-sm text-gray-500'>City/State</span>
                                <p className='font-semibold'>
                                    {city ? city : '--'}
                                </p>
                            </li>
                            <li>
                                <span className='text-sm text-gray-500'>Address</span>
                                <p className='font-semibold'>
                                    {address1 ? address1 : '--'}
                                </p>
                            </li>
                            <li>
                                <span className='text-sm text-gray-500'>Zip Code</span>
                                <p className='font-semibold'>
                                    {zip ? zip : '--'}
                                </p>
                            </li>
                        </ul>
                    }
                </div>
            </section>
        </div>
    </>);
};

export default MyProfile;