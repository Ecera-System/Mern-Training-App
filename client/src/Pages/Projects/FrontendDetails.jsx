import React from 'react';
import ExploreProjects from './ExploreProjects';
import Footer from '../Shared/Footer/Footer';
import PageTitle from '../Shared/PageTitle';
import Header from '../Shared/Header/Header';

const FrontendDetails = () => {
    return (<>
        <PageTitle title={'Frontend Projects'} />
        <Header />
        <section
            className='bg-violet-100 py-32 bg-no-repeat bg-cover bg-center'
            style={{ backgroundImage: 'url(/images/projects/banner.png)' }}
        >
            <div className='w-max mx-auto px-10 py-5 bg-white/80 text-center rounded-lg backdrop-blur-sm'>
                <h1 className='text-5xl font-semibold text-violet-600'>
                    Frontend Projects
                </h1>
            </div>
        </section>
        <section className='py-20 bg-indigo-900'>
            <div className='2xl:w-[1200px] w-4/5 mx-auto grid grid-cols-2 gap-10'>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        Weather Application
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        That allows users to enter a location and displays the current weather conditions. You can utilize a weather API to fetch real-time weather data and present it in a user-friendly format. Enhance the application by adding features like multiple location support, a 7-day forecast, and a visually appealing UI.
                    </p>
                </div>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        Recipe Finder
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        A recipe finder application where users can search for recipes based on specific ingredients or dietary preferences. Utilize a recipe API to fetch recipe data and display it to the user. Include features such as saving favorite recipes, creating shopping lists, and providing step-by-step instructions with images.
                    </p>
                </div>
            </div>
        </section>
        <ExploreProjects isTitle={true} />
        <Footer />
    </>);
};

export default FrontendDetails;