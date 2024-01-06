import React from 'react';

const SuccessMessage = () => {
    return (
        <div className="p-8 border-b">
            <div className="flex items-center flex-col">
                <div>
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-emerald-500 mb-1">
                    The Course Added Successfully
                </h3>
                {/* <span className="text-sm">Admin will be Approve soon.</span> */}
            </div>
        </div>
    );
};

export default SuccessMessage;