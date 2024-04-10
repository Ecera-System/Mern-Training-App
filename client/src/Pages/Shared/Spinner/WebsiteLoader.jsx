import React from 'react'
import './Spinner.css';

const WebsiteLoader = () => {
    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black/80 grid place-items-center'>
                <h1 className='loadText absolute top-[17%] mx-auto text-6xl font-bold text-violet-400 '>Welcome to Ecera Training</h1>
                <div className="loader1" />
                <h1 className='loadText absolute bottom-[27%] mx-auto text-2xl font-bold text-white '>Please Wait, Loading...</h1>
            </div>
        </div>
    )
}

export default WebsiteLoader
