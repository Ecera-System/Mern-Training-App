import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className='fixed inset-0 z-50 bg-black/80 grid place-items-center'>
            <div className="loader1" />
        </div>
    );
};

export default Spinner;