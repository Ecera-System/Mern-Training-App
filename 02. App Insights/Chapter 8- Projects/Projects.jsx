import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Footer from '../Shared/Footer/Footer';
import ExploreProjects from './ExploreProjects';

const Projects = () => {

    return (<>
        <PageTitle title="Projects" />
        <Header />
        <section
            className='bg-violet-100 md:py-32 py-24 bg-no-repeat bg-cover bg-center'
            style={{ backgroundImage: 'url(/images/projects/banner.png)' }}
        >
            <div className='w-max mx-auto px-10 py-5 bg-white/80 text-center rounded-lg backdrop-blur-sm'>
                <h1 className='lg:text-5xl md:text-4xl text-3xl font-semibold text-violet-600'>
                    Explore our Projects
                </h1>
            </div>
        </section>
        <ExploreProjects/>
        {/* <section
            className='py-24 bg-cover bg-no-repeat bg-bottom'
            style={{ backgroundImage: 'url(/images/bg_banner1.jpg)' }}
        >
            <div className='text-center text-white'>
                <h1 className='text-5xl font-semibold mb-12'>
                    Have any further questions?
                </h1>
                <button
                    className='border border-white py-3 px-10 text-base hover:bg-white hover:text-violet-600 duration-500'
                >
                    Contact Us
                </button>
            </div>
        </section>
        <section className='py-24'>
            <div className='xl:max-w-3xl w-3/5 mx-auto'>
                <h1 className='text-5xl font-semibold text-gray-800 text-center'>
                    FAQs
                </h1>
                <ul className='list-none flex flex-col gap-2 mt-10'>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 1 ? 1 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                1. How do I start a project?
                            </h2>
                            <span className='w-8 h-8 text-gray-800 relative'>
                                <MdKeyboardArrowDown
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 1 ? 'opacity-0 invisible rotate-90' : 'opacity-100 visible rotate-0'}`}
                                />
                                <MdKeyboardArrowUp
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 1 ? 'opacity-100 visible rotate-0' : 'opacity-0 invisible rotate-90'}`}
                                />
                            </span>
                        </div>
                        <div
                            className={`overflow-hidden maxH-0 ${indexFaq === 1 ? 'maxH-full' : ''}`}
                        >
                            <ul className='list-disc text-base font-light text-gray-600 mt-2 ml-5 flex flex-col gap-3'>
                                <li>
                                    <p>Before starting a project, be sure to select a project that</p>
                                    <ul className='list-decimal ml-5'>
                                        <li>will add value to your career goals.</li>
                                        <li>matches your programming interests.</li>
                                    </ul>
                                </li>
                                <li>
                                    Explore the mini projects that are available and click on a project that appeals to you.
                                </li>
                                <li>
                                    Go through the project overview to understand the scope and prerequisites before you start a project.
                                </li>
                                <li>
                                    Once you have found a mini project that meets the above 2 criteria, go ahead and click Start Now to begin working as per the laid out plan.
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 2 ? 2 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                2. What projects can I do with JavaScript?
                            </h2>
                            <span className='w-8 h-8 text-gray-800 relative'>
                                <MdKeyboardArrowDown
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 2 ? 'opacity-0 invisible rotate-90' : 'opacity-100 visible rotate-0'}`}
                                />
                                <MdKeyboardArrowUp
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 2 ? 'opacity-100 visible rotate-0' : 'opacity-0 invisible rotate-90'}`}
                                />
                            </span>
                        </div>
                        <div
                            className={`overflow-hidden maxH-0 ${indexFaq === 2 ? 'maxH-full' : ''}`}
                        >
                            <ul className='list-disc text-base font-light text-gray-600 mt-2 ml-5 flex flex-col gap-3'>
                                <li>
                                    <p>
                                        Search for these projects if you are looking for html, css, javascript projects or web development projects to hone your frontend development skills:
                                    </p>
                                    <ul className='list-decimal ml-5'>
                                        <li>Online Code Editor (JQuery)</li>
                                        <li>Online Code Editor (React)</li>
                                        <li>Slack clone using React</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 3 ? 3 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                3. How do I decide what project to do first?
                            </h2>
                            <span className='w-8 h-8 text-gray-800 relative'>
                                <MdKeyboardArrowDown
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 3 ? 'opacity-0 invisible rotate-90' : 'opacity-100 visible rotate-0'}`}
                                />
                                <MdKeyboardArrowUp
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 3 ? 'opacity-100 visible rotate-0' : 'opacity-0 invisible rotate-90'}`}
                                />
                            </span>
                        </div>
                        <div
                            className={`overflow-hidden maxH-0 ${indexFaq === 3 ? 'maxH-full' : ''}`}
                        >
                            <ul className='list-disc text-base font-light text-gray-600 mt-2 ml-5 flex flex-col gap-3'>
                                <li>
                                    Start with something that is beginner friendly :)
                                </li>
                                <li>
                                    It is okay to choose any project as long as you can learn/apply something.
                                </li>
                                <li>
                                    Read through the project overview of all projects and pick one that is interesting to you and covers the skills you want to explore.
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 4 ? 4 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                4. Why should I do a project?
                            </h2>
                            <span className='w-8 h-8 text-gray-800 relative'>
                                <MdKeyboardArrowDown
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 4 ? 'opacity-0 invisible rotate-90' : 'opacity-100 visible rotate-0'}`}
                                />
                                <MdKeyboardArrowUp
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 4 ? 'opacity-100 visible rotate-0' : 'opacity-0 invisible rotate-90'}`}
                                />
                            </span>
                        </div>
                        <div
                            className={`overflow-hidden maxH-0 ${indexFaq === 4 ? 'maxH-full' : ''}`}
                        >
                            <p className='text-base font-light text-gray-600 mt-2 ml-5'>
                                Mini projects push you to dig deeper and find solutions on your own. Retention of skills is higher when you practically apply yourself to do something and figure things out by yourself. This is why interviewers always ask many questions related to your project to see how deeply you have explored the concepts and skills in the project.
                            </p>
                        </div>
                    </li>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 5 ? 5 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                5. Should I do projects alone or with a group?
                            </h2>
                            <span className='w-8 h-8 text-gray-800 relative'>
                                <MdKeyboardArrowDown
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 5 ? 'opacity-0 invisible rotate-90' : 'opacity-100 visible rotate-0'}`}
                                />
                                <MdKeyboardArrowUp
                                    className={`absolute inset-0 text-3xl duration-500 ${indexFaq === 5 ? 'opacity-100 visible rotate-0' : 'opacity-0 invisible rotate-90'}`}
                                />
                            </span>
                        </div>
                        <div
                            className={`overflow-hidden maxH-0 ${indexFaq === 5 ? 'maxH-full' : ''}`}
                        >
                            <p className='text-base font-light text-gray-600 mt-2 ml-5'>
                                Group projects with max 2-3 members are reasonable so that every member has a significant role to play in the project. Pick partners who share your thirst to learn and build something from the ground up.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section> */}
        <Footer />
    </>);
};

export default Projects;