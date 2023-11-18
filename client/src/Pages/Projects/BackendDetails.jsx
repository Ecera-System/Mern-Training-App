import React from 'react';
import ExploreProjects from './ExploreProjects';
import Footer from '../Shared/Footer/Footer';
import PageTitle from '../Shared/PageTitle';
import Header from '../Shared/Header/Header';

const BackendDetails = () => {
    return (<>
        <PageTitle title={'Backend Projects'} />
        <Header />
        <section
            className='bg-violet-100 py-32 bg-no-repeat bg-cover bg-center'
            style={{ backgroundImage: 'url(/images/projects/banner.png)' }}
        >
            <div className='w-max mx-auto px-10 py-5 bg-white/80 text-center rounded-lg backdrop-blur-sm'>
                <h1 className='text-5xl font-semibold text-violet-600'>
                    Backend Projects
                </h1>
            </div>
        </section>
        <section className='py-20 bg-indigo-900'>
            <div className='2xl:w-[1200px] w-4/5 mx-auto grid grid-cols-2 gap-10'>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        Blogging Platform
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        Where users can create accounts, write blog posts, and interact with other users' posts. Implement features such as user authentication, post creation and editing, commenting, and social sharing. You can also include features like user profiles, tags/categories, and a search functionality.
                    </p>
                </div>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        Online Marketplace
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        Where users can buy and sell products or services. Implement user registration, authentication, and profile management. Include features such as product listings, search and filtering, shopping cart functionality, and secure payment processing. You can also add features like ratings and reviews, messaging between buyers and sellers, and order tracking.
                    </p>
                </div>
            </div>
        </section>
        <ExploreProjects isTitle={true} />
        <Footer />
    </>);
};

export default BackendDetails;