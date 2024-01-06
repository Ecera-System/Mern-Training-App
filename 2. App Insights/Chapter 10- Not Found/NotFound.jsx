import React from 'react';
import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';

const NotFound = () => {
    return (<>
        <PageTitle title="404 error" />
        <Header />
        <div className='w-full h-[calc(100vh-90px)] grid place-items-center'>
            <div className='text-center m-10'>
                <h4 className='text-base font-bold text-gray-800 tracking-[3px]'>
                    OOPS! PAGE NOT FOUND
                </h4>
                <h1 className='text-gray-800 text-[15rem] font-black leading-none tracking-[-40px]'>
                    <span style={{ textShadow: '-8px 0 0 #fff' }}>4</span>
                    <span style={{ textShadow: '-8px 0 0 #fff' }}>0</span>
                    <span style={{ textShadow: '-8px 0 0 #fff' }}>4</span>
                </h1>
                <h4 className='text-base font-medium text-gray-800'>
                    WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND!
                </h4>
            </div>
        </div>
    </>);
};

export default NotFound;