import React from 'react'
import BookAFreeCounselling from './BookAFreeCounselling'
import { Link } from 'react-router-dom'

const CallUsBanner = () => {
    return (
        <div className='w-full lg:h-[300px] h-[40vh] bg-cover'
            style={{ backgroundImage: 'url(../../../public/images/home/coding-bg.jpg)' }}
        >
            <div className=' 2xl:w-[1280px] w-10/12 h-[100%] mx-auto flex flex-col lg:flex-row justify-between align-middle py-10 text-blue-200' >
                <div className=' h-[100%] lg:w-[40%] flex flex-col justify-center align-middle border border-white rounded-md'>
                    <h1 className='text-center my-5 text-2xl font-bold'>Still having any doubt ? </h1>
                    <BookAFreeCounselling />
                </div>
                <p className='m-auto text-2xl font-bold'>OR</p>
                <div className=' h-[100%] lg:w-[40%] flex flex-col justify-center align-middle border border-white rounded-md'>
                    <h1 className='text-center my-5 text-xl font-bold'>Want to enroll in the MERN Program ?</h1>
                    <Link className='mx-auto text-center w-[80%] text-lg font-bold p-1 bg-slate-100 text-blue-700' to={'/course/checkout/649714c70b1be79305efd21b'}>Enroll Now</Link>
                </div>

            </div>
        </div>
    )
}

export default CallUsBanner
