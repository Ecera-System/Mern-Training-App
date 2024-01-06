import React from 'react';

const   Summary = ({ data, isDiscount }) => {
    const {
        title,
    } = data;

    return (
        <div>
            <h2 className='text-xl text-center font-semibold text-gray-700 pt-5 pb-2 border-b'>
                Course
            </h2>
            <div className='mt-5 mb-4'>
                <h4 className='text-base text-gray-700'>
                    {title}
                </h4>
            </div>
            <div className='lg:text-xl text-lg font-semibold text-gray-700 flex lg:justify-between items-center gap-5'>
                <span>Total:</span>
                <span>${isDiscount}</span>
            </div>
        </div>
    );
};

export default Summary;