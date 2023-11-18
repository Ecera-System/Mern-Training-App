import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import ExploreProjects from './ExploreProjects';

const MernStackDetails = () => {
    return (<>
        <PageTitle title={'MERN Stack Projects'} />
        <Header />
        <section
            className='bg-violet-100 py-32 bg-no-repeat bg-cover bg-center'
            style={{ backgroundImage: 'url(/images/projects/banner.png)' }}
        >
            <div className='w-max mx-auto px-10 py-5 bg-white/80 text-center rounded-lg backdrop-blur-sm'>
                <h1 className='text-5xl font-semibold text-violet-600'>
                    MERN Stack Projects
                </h1>
            </div>
        </section>
        <section className='py-20 bg-indigo-900'>
            <div className='2xl:w-[1200px] w-4/5 mx-auto grid grid-cols-2 gap-10'>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        Task Manager
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        Task management application where users can register, log in, and manage their tasks. Users can create tasks, set deadlines, mark tasks as complete, and organize them into different categories or projects.
                    </p>
                </div>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        Social Media Platform
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        Where users can create profiles, post updates, follow other users, like and comment on posts, and have a news feed that displays the latest posts from the people they follow. You can also include features such as notifications, direct messaging, and user authentication.
                    </p>
                </div>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        E-commerce Store
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        Where users can browse products, add them to their cart, and make purchases. Implement features like product search and filtering, user reviews and ratings, product recommendations, and secure payment processing.
                    </p>
                </div>
            </div>
        </section>
        <ExploreProjects isTitle={true} />
        <Footer />
    </>);
};

export default MernStackDetails;