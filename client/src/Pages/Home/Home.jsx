import PageTitle from '../Shared/PageTitle';
import HeroSection from './HeroSection';
import TechIcon from './TechIcon';
import Footer from '../Shared/Footer/Footer';
import './Home.css';

const Home = () => {
    return (<>
        <PageTitle title="MERN Training Center" />
        <HeroSection />
        <TechIcon />
        <section
            className='pt-12 pb-32'
        >
            <div className=''>
                <h1 className='w-4/5 mx-auto lg:text-5xl md:text-4xl text-3xl font-semibold text-gray-700 text-center'>
                    Why Join Our Development Program?
                </h1>
                <div className='max-w-7xl lg:w-[90%] md:w-[40rem] sm:w-3/4 w-4/5 mx-auto grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-10 mt-16 relative'>
                    <div className='absolute left-1/2 -translate-x-1/2 h-full w-2 bg-slate-700 lg:block hidden' />

                    <div className='flex md:flex-row flex-col items-center gap-8 p-8 bg-white lg:rounded-l-full max-lg:rounded-md shadow-[0_-2px_30px_20px_rgba(124,59,237,0.1)]'>
                        <div className='w-max'>
                            <div className='w-24 h-24 p-6 bg-fuchsia-500 rounded-full'>
                                <img src="/images/home/career-path.png" alt="Career Path Icon" className='max-w-full max-h-full' />
                            </div>
                        </div>
                        <div className='w-full text-center md:text-start'>
                            <h1 className='text-lg font-semibold text-gray-700 group-hover/card:text-white pb-2'>
                                Accelerate Your Career Growth
                            </h1>
                            <p className='text-base text-gray-500 group-hover/card:text-white'>
                                Gain in-demand skills, hands-on experience, and industry insights from experienced mentors. Our program is designed to propel your career to new heights.
                            </p>
                        </div>
                    </div>
                    <div className='lg:block hidden' />
                    <div className='lg:block hidden' />
                    <div className='flex md:flex-row flex-col items-center gap-8 p-8 bg-white lg:rounded-r-full max-lg:rounded-md shadow-[0_-2px_30px_20px_rgba(124,59,237,0.1)]'>
                        <div className='w-max'>
                            <div className='w-24 h-24 p-6 bg-cyan-400 rounded-full'>
                                <img src="/images/home/rocket.png" alt="Rocket Icon" className='max-w-full max-h-full' />
                            </div>
                        </div>
                        <div className='w-full text-center md:text-start'>
                            <h1 className='text-lg font-semibold text-gray-700 group-hover/card:text-white pb-2'>
                                Stay Ahead of the Curve with Latest Technologies
                            </h1>
                            <p className='text-base text-gray-500 group-hover/card:text-white'>
                                In the ever-evolving world of technology, staying up-to-date is crucial. By joining our program, Get the chance to explore and master the latest tools, frameworks, and technologies.
                            </p>
                        </div>
                    </div>
                    <div className='lg:block hidden' />
                    <div className='lg:block hidden' />
                    <div className='flex md:flex-row flex-col items-center gap-8 p-8 bg-white lg:rounded-l-full max-lg:rounded-md shadow-[0_-2px_30px_20px_rgba(124,59,237,0.1)]'>
                        <div className='w-max'>
                            <div className='w-24 h-24 p-6 bg-violet-500 rounded-full'>
                                <img src="/images/home/networking.png" alt="Networking Icon" className='max-w-full max-h-full' />
                            </div>
                        </div>
                        <div className='w-full text-center md:text-start'>
                            <h1 className='text-lg font-semibold text-gray-700 group-hover/card:text-white pb-2'>
                                Collaborate and Network with Industry Professionals
                            </h1>
                            <p className='text-base text-gray-500 group-hover/card:text-white'>
                                Networking is a key aspect of professional growth. You&apos;ll have the opportunity to collaborate and network with industry professionals, including fellow developers, mentors, and guest speakers.
                            </p>
                        </div>
                    </div>
                    <div className='lg:block hidden' />
                    <div className='lg:block hidden' />
                    <div className='flex md:flex-row flex-col items-center gap-8 p-8 bg-white lg:rounded-r-full max-lg:rounded-md shadow-[0_-2px_30px_20px_rgba(124,59,237,0.1)]'>
                        <div className='w-max'>
                            <div className='w-24 h-24 p-6 bg-orange-400 rounded-full'>
                                <img src="/images/home/project.png" alt="Project Icon" className='max-w-full max-h-full' />
                            </div>
                        </div>
                        <div className='w-full text-center md:text-start'>
                            <h1 className='text-lg font-semibold text-gray-700 group-hover/card:text-white pb-2'>
                                Hands-On Projects for Real-World Experience
                            </h1>
                            <p className='text-base text-gray-500 group-hover/card:text-white'>
                                Theory alone is not enough to become a proficient developer. Gain practical experience, tackle complex challenges, and build a portfolio of impressive projects that showcase your skills to potential employers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            style={{ backgroundImage: `url(/images/bg_img1.jpg)` }}
            className='w-full md:pt-24 md:pb-32 py-20 bg-no-repeat bg-cover bg-center'
        >
            <div className='max-w-7xl w-[90%] mx-auto'>
                <div className='text-center'>
                    <h1 className='lg:text-5xl md:text-4xl text-3xl font-semibold text-gray-700 pb-3'>
                        Featured Courses
                    </h1>
                </div>
                <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10'>
                    <div className='border rounded-xl p-6 border-violet-600 flex items-start gap-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_12px_4px_rgba(124,59,237,0.1)] duration-300'>
                        <div className="w-max">
                            <img src="/images/book_icon.png" alt="book" className='w-28 h-auto' />
                        </div>
                        <p className='w-full text-sm text-gray-500'>
                            8X higher engagement in live online classes by industry professionals.
                        </p>
                    </div>
                    <div className='border rounded-xl p-6 border-violet-600 flex items-start gap-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_12px_4px_rgba(124,59,237,0.1)] duration-300'>
                        <div className="w-max">
                            <img src="/images/book_icon.png" alt="" className='w-28 h-auto' />
                        </div>
                        <p className='w-full text-sm text-gray-500'>
                            Covering essential web development concepts, frameworks, and tools to build robust and dynamic websites.
                        </p>
                    </div>
                    <div className='border rounded-xl p-6 border-violet-600 flex items-start gap-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_12px_4px_rgba(124,59,237,0.1)] duration-300'>
                        <div className="w-max">
                            <img src="/images/book_icon.png" alt="" className='w-28 h-auto' />
                        </div>
                        <p className='w-full text-sm text-gray-500'>
                            Hands-on projects to apply knowledge in real-world scenarios and enhance practical skills.
                        </p>
                    </div>
                    <div className='border rounded-xl p-6 border-violet-600 flex items-start gap-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_12px_4px_rgba(124,59,237,0.1)] duration-300'>
                        <div className="w-max">
                            <img src="/images/book_icon.png" alt="" className='w-28 h-auto' />
                        </div>
                        <p className='w-full text-sm text-gray-500'>
                            Interactive learning through coding exercises and discussions to reinforce understanding.
                        </p>
                    </div>
                    <div className='border rounded-xl p-6 border-violet-600 flex items-start gap-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_12px_4px_rgba(124,59,237,0.1)] duration-300'>
                        <div className="w-max">
                            <img src="/images/book_icon.png" alt="" className='w-28 h-auto' />
                        </div>
                        <p className='w-full text-sm text-gray-500'>
                            Flexible schedule with self-paced modules and convenient online access.
                        </p>
                    </div>
                    <div className='border rounded-xl p-6 border-violet-600 flex items-start gap-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_12px_4px_rgba(124,59,237,0.1)] duration-300'>
                        <div className="w-max">
                            <img src="/images/book_icon.png" alt="" className='w-28 h-auto' />
                        </div>
                        <p className='w-full text-sm text-gray-500'>
                            Supportive community fostering collaboration, insights sharing, and professional connections.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <hr className='bg-violet-500 h-0.5' />
        <Footer />
    </>);
};
export default Home;
