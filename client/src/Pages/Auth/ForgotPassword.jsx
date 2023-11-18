import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import PropTypes from 'prop-types';

const ForgotPassword = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (email) {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/forgot-password`, { email })
                .then(res => {
                    setSuccess(res.data.success);
                })
                .catch(err => {
                    setError(err?.response?.data?.error);
                });
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md">
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Submit
                        </button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-3">
                            Close
                        </button>
                    </div>
                    {loading && <div>Loading...</div>}
                    {error && <div className="text-red-500 mt-2 flex items-center"><AiOutlineWarning className="mr-1" />{error}</div>}
                    {success && <div className="text-green-500 mt-2">{success}</div>}
                </form>
            </div>
        </div>
    );
};

ForgotPassword.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ForgotPassword;
