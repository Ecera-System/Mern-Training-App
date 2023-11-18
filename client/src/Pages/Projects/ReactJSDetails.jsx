import React from 'react';
import ExploreProjects from './ExploreProjects';
import Footer from '../Shared/Footer/Footer';
import PageTitle from '../Shared/PageTitle';
import Header from '../Shared/Header/Header';

const ReactJSDetails = () => {
    return (<>
        <PageTitle title={'React JS Projects'} />
        <Header />
        <section
            className='bg-violet-100 py-32 bg-no-repeat bg-cover bg-center'
            style={{ backgroundImage: 'url(/images/projects/banner.png)' }}
        >
            <div className='w-max mx-auto px-10 py-5 bg-white/80 text-center rounded-lg backdrop-blur-sm'>
                <h1 className='text-5xl font-semibold text-violet-600'>
                    React JS Projects
                </h1>
            </div>
        </section>
        <section className='py-20 bg-indigo-900'>
            <div className='2xl:w-[1200px] w-4/5 mx-auto grid grid-cols-2 gap-10'>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        GitHub User Search
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        Application where users can search for GitHub users and view their profiles and repositories. Utilize the GitHub API to fetch user and repository data. Implement features like pagination, sorting repositories by stars or forks, and displaying user activity such as recent commits.
                    </p>
                </div>
                <div className='bg-white p-8 rounded'>
                    <h2 className='text-2xl text-gray-800'>
                        Movie Recommendation App
                    </h2>
                    <p className='text-base text-gray-600 mt-2'>
                        Application that fetches movie data from a movie API and displays a list of movies to users. Users can search for movies, view details about each movie, and save their favorite movies to a watchlist. Add features like movie ratings, sorting by genre, and pagination to enhance the user experience.
                    </p>
                </div>
            </div>
        </section>
        <ExploreProjects isTitle={true} />
        <Footer />
    </>);
};

export default ReactJSDetails;