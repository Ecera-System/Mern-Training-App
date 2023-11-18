import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { contextProvider } from '../../Context/ContextProvider';
import PageTitle from '../../Pages/Shared/PageTitle';
import TableLoadingSkeleton from '../../Pages/Shared/Spinner/TableLoadingSkeleton';
import { FaTrashAlt } from 'react-icons/fa';
import { SlClose } from 'react-icons/sl';
import Spinner from '../../Pages/Shared/Spinner/Spinner';
import UserDetails from './UserDetails';

const AllUsers = () => {
    const { showToast } = useContext(contextProvider);
    const navigate = useNavigate();
    const location = useLocation();
    const [profiles, setProfiles] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false);
    const [isDelete, setIsDelete] = useState('');
    const [dLoading, setDLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState(Number(new URLSearchParams(location.search).get('page')) || 1);
    const size = 10;

    const totalPage = Math.ceil(count / size);

    // <!-- Update the URL query parameter when the page changes -->
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        urlSearchParams.set('page', page);

        navigate(`?${urlSearchParams.toString()}`);
    }, [location.search, navigate, page]);

    // <!-- Fetch data as a pagination -->
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_V1_URL}/profile/all-users?page=${page}&size=${size}&query=${inputValue}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        })
            .then(res => {
                setProfiles(res.data.users);
                setCount(res.data.count);
                setLoading(false)
            })
            .catch(err => {
                showToast({
                    succuss: '', error: err?.response?.data?.error,
                });
                setLoading(false);
                if (err?.response?.data?.notExist) {
                    localStorage.removeItem('auth_token');
                    return navigate('/sign-in');
                }
            });
    }, [navigate, page, inputValue, showToast]);


    // <!-- Handle Change User Status -->
    const handleStatus = async (e, id) => {
        const data = e.target.value;
        if (!data) return;
        try {
            setStatusLoading(true);
            const res = await axios.patch(`${import.meta.env.VITE_API_V1_URL}/profile/status/${id}`, {
                status: data,
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
        };
        setStatusLoading(false);
    };

    // <!-- Handle Delete User -->
    const handleDelete = async (id) => {
        try {
            setDLoading(true);
            const res = await axios.delete(`${import.meta.env.VITE_API_V1_URL}/profile/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('auth_token')
                }
            });
            const success = res.data.success;
            showToast({
                success: success,
                error: ''
            });
            setIsDelete('')
        } catch (err) {
            showToast({
                succuss: '', error: err?.response?.data?.error,
            });
            if (err?.response?.data?.notExist) {
                localStorage.removeItem('auth_token');
                return navigate('/sign-in');
            }
        };
        setDLoading(false);
    };

    return (<>
        <PageTitle title={"All Users"} />
        <div className="my-5 w-full bg-white text-gray-600 rounded-lg border">
            <div className="p-5 border-b">
                <h1 className="text-xl font-semibold">
                    Users
                </h1>
                <div className="mt-4">
                    <input
                        onChange={e => setInputValue(e.target.value)}
                        className="block w-full border rounded py-2 px-4 text-sm outline-none"
                        type="text"
                        required
                        placeholder="Enter 'name' or 'email' to search user"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="bg-violet-50 text-left uppercase">
                        <tr>
                            <th className="text-sm py-3 px-5">
                                <h2 className='w-max'>Name</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max'>Email</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max'>Role</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max'>Status</h2>
                            </th>
                            <th className="text-sm py-3 pr-5">
                                <h2 className='w-max mx-auto'>Delete</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <TableLoadingSkeleton td_count={5} /> :
                            profiles.map((profile) =>
                                <tr key={profile._id} className='border-b'>
                                    <td className='py-3 px-5'>
                                        <button
                                            onClick={() => setUserDetails(profile)}
                                            className="w-max text-base font-medium text-emerald-500 hover:text-emerald-600 duration-300"
                                        >
                                            {profile?.name}
                                        </button>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <div className="w-max text-sm">
                                            {profile?.userId?.email}
                                        </div>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <div className="w-max text-sm capitalize">
                                            {profile?.userId?.role}
                                        </div>
                                    </td>
                                    {profile.userId.role === 'admin' ?
                                        <td></td> :
                                        <td className='py-3 pr-5'>
                                            <select
                                                name="status"
                                                id="status"
                                                className="py-2 px-3 w-max border border-violet-500 rounded bg-none cursor-pointer outline-none text-sm"
                                                onChange={(e) => handleStatus(e, profile.userId._id)}
                                            >
                                                <option selected={profile?.userId?.status === "active"} value="active">
                                                    Active
                                                </option>
                                                <option selected={profile?.userId?.status === "inactive"} value="inactive">
                                                    Inactive
                                                </option>
                                                <option selected={profile?.userId?.status === "blocked"} value="blocked">
                                                    Blocked
                                                </option>
                                            </select>
                                        </td>}

                                    {profile.userId.role === 'admin' ?
                                        <td></td> :
                                        <td className='py-3 pr-5 text-center'>
                                            <button
                                                onClick={() => setIsDelete(profile.userId._id)}
                                                className='w-max hover:text-red-500 duration-300'
                                            >
                                                <FaTrashAlt className='text-xl' />
                                            </button>
                                        </td>
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {
                    (!loading && profiles.length === 0) && <div className='text-center py-20'>
                        <h4 className='md:text-3xl text-xl font-medium text-gray-500'>
                            No Users data found!
                        </h4>
                    </div>
                }
            </div>
        </div>

        {/* <!-- Pagination bar --> */}
        {size < count &&
            (!loading &&
                <div className='w-max mx-auto bg-white rounded mt-8 mb-20 py-2 px-5 shadow'>
                    <ul className='list-none flex items-center gap-3 text-gray-700'>
                        <li>
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(prev => prev - 1)}
                                className={`${page === 1 ? 'text-gray-400' : 'hover:bg-gray-200 duration-200'} mr-3 px-3 py-2 rounded`}
                            >
                                <MdArrowBackIosNew className='text-lg' />
                            </button>
                        </li>
                        {
                            [...Array(totalPage).keys()].map(item =>
                                <li key={item}>
                                    <button
                                        className={`${page === item + 1 ? 'bg-violet-600 text-white' : ''} duration-200 hover:bg-violet-600 hover:text-white px-2 py-0.5 rounded`}
                                        onClick={() => setPage(item + 1)}
                                    >
                                        {item + 1}
                                    </button>
                                </li>
                            )
                        }
                        <li>
                            <button
                                disabled={totalPage === page}
                                onClick={() => setPage(prev => prev + 1)}
                                className={`${totalPage === page ? 'text-gray-400' : 'hover:bg-gray-200 duration-200'} ml-3 px-3 py-2 rounded`}
                            >
                                <MdArrowForwardIos className='text-lg' />
                            </button>
                        </li>
                    </ul>
                </div >
            )
        }

        {/* <!-- Delete User Button --> */}
        {
            isDelete && <div className='fixed inset-0 bg-black/60 grid place-items-center'>
                <div className='sm:w-[30rem] w-11/12 h-auto bg-white sm:p-10 p-6 rounded-lg flex flex-col gap-5'>
                    <div className='text-5xl flex justify-center text-red-500'>
                        <SlClose />
                    </div>
                    <h2 className='text-center text-3xl text-gray-600'>
                        Are you sure?
                    </h2>
                    <p className='text-base text-gray-500 text-center'>
                        Do you really want to delete this user? This user cannot be undone.
                    </p>
                    <div className='flex items-center justify-center gap-10'>
                        <button
                            onClick={() => setIsDelete('')}
                            className='py-2.5 px-10 text-base font-medium bg-gray-400 hover:bg-gray-500 duration-300 text-white rounded'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => { handleDelete(isDelete) }}
                            className='py-2.5 px-10 text-base font-medium bg-red-500 hover:bg-red-600 duration-300 text-white rounded'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        }
        {(statusLoading || dLoading) && <Spinner />}

        <UserDetails userDetails={userDetails} setUserDetails={setUserDetails} />
    </>);
};

export default AllUsers;