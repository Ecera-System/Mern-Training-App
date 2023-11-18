import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Header from '../Shared/Header/Header';
import ExploreProjects from './ExploreProjects';
import Footer from '../Shared/Footer/Footer';

const NodeJSDetails = () => {
    return (<>
        <PageTitle title={'Node JS Projects'} />
        <Header />
        <section
            className='bg-violet-100 py-32 bg-no-repeat bg-cover bg-center'
            style={{ backgroundImage: 'url(/images/projects/banner.png)' }}
        >
            <div className='w-max mx-auto px-10 py-5 bg-white/80 text-center rounded-lg backdrop-blur-sm'>
                <h1 className='text-5xl font-semibold text-violet-600'>
                    Node JS Projects
                </h1>
            </div>
        </section>
        <section className='py-20 bg-indigo-900'>
            <div className='2xl:w-[1200px] w-4/5 mx-auto grid grid-cols-2 gap-10'>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        Chat Application
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        A application using Node.js and a WebSocket library like Socket.io. Users can join chat rooms, send and receive messages, and view the message history. Enhance the application by adding features like private messaging, user authentication, and online status indicators.
                    </p>
                </div>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        File Uploader
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        A application where users can upload files to the server. Implement features like file validation, storage, and retrieval. You can enhance the application by adding user authentication, file sharing, and access control to specific files.
                    </p>
                </div>
            </div>
        </section>
        <ExploreProjects isTitle={true} />
        <Footer />
    </>);
};

export default NodeJSDetails;