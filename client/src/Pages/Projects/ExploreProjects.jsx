import { useNavigate } from 'react-router-dom';

const ExploreProjects = ({ isTitle }) => {
    const navigate = useNavigate();

    return (
        <section className={isTitle ? 'py-20' : 'md:py-28 py-20'}>
            <div className='max-w-[68rem] md:w-[90%] sm:w-[32rem] w-[18rem] mx-auto'>
                {
                    isTitle && <h1 className=' text-3xl font-medium text-gray-800 mb-8'>
                        Explore Our Projects
                    </h1>
                }
                <div className='grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-5'>
                    <button
                        onClick={() => navigate('/projects/mern-stack')}
                        className='xl:p-10 px-8 py-10 bg-indigo-900 text-white text-center rounded-md hover:-translate-y-1.5 duration-300'
                    >
                        <h2 className='text-2xl font-medium'>MERN Stack Development</h2>
                        <h4 className='text-base uppercase mt-3'>Projects</h4>
                    </button>
                    {/* <button
                        onClick={() => navigate('/projects/frontend')}
                        className='xl:p-10 px-8 py-10 bg-indigo-900 text-white text-center rounded-md hover:-translate-y-1.5 duration-300'
                    >
                        <h2 className='text-2xl font-medium'>Frontend</h2>
                        <h4 className='text-base uppercase mt-3'>Projects</h4>
                    </button>
                    <button
                        onClick={() => navigate('/projects/backend')}
                        className='xl:p-10 px-8 py-10 bg-indigo-900 text-white text-center rounded-md hover:-translate-y-1.5 duration-300 cursor-pointer'
                    >
                        <h2 className='text-2xl font-medium'>Backend</h2>
                        <h4 className='text-base uppercase mt-3'>Projects</h4>
                    </button>
                    <button
                        onClick={() => navigate('/projects/react-js')}
                        className='xl:p-10 px-8 py-10 bg-indigo-900 text-white text-center rounded-md hover:-translate-y-1.5 duration-300 cursor-pointer'
                    >
                        <h2 className='text-2xl font-medium'>React JS</h2>
                        <h4 className='text-base uppercase mt-3'>Projects</h4>
                    </button>
                    <button
                        onClick={() => navigate('/projects/node-js')}
                        className='xl:p-10 px-8 py-10 bg-indigo-900 text-white text-center rounded-md hover:-translate-y-1.5 duration-300 cursor-pointer'
                    >
                        <h2 className='text-2xl font-medium'>Node JS</h2>
                        <h4 className='text-base uppercase mt-3'>Projects</h4>
                    </button> */}
                </div>
            </div>
        </section>
    );
};

export default ExploreProjects;