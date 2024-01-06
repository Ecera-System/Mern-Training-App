import { useState } from 'react';
import './programs.css'
import { HiArrowNarrowRight } from 'react-icons/hi';
import { HiCodeBracket } from 'react-icons/hi2';
import { TfiInfinite } from 'react-icons/tfi';
import { BiMessageSquareDots } from 'react-icons/bi';
import { VscGithubAlt } from 'react-icons/vsc';
import { BsGraphUp } from 'react-icons/bs';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Footer from '../Shared/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import useGetAllCourses from '../../API/useGetAllCourses';
import PageTitle from '../Shared/PageTitle';
import Header from '../Shared/Header/Header';

const MERNStackWebDevelopment = () => {
    const [coursesData] = useGetAllCourses();
    const { pathname } = window.location;
    const [indexFaq, setIndexFaq] = useState(0);
    const navigate = useNavigate();

    // <!-- Find url path name of course page -->
    const course = coursesData?.find(f =>
        f.src_path === pathname ||
        f.src_path === '"' + pathname + '"' ||
        f.src_path === "'" + pathname + "'"
    );


    return (<>
        <PageTitle title='MERN Stack Web Development Program' />
        <section
            style={{ backgroundImage: 'url(/images/mern-stack-web/shapes.png)' }}
            className="bg-violet-800 relative bg-no-repeat bg-cover lg:[backgroundSize:140%_auto] [backgroundPositionX:center] [backgroundPositionY:top]"
        >
            <Header textColor='text-white' />
            <div className="max-w-4xl w-[90%] mx-auto md:pt-16 pt-12 md:pb-32 pb-20">
                <div className='text-center'>
                    <h3 className='text-xl font-medium mb-5'>
                        For Beginners and Experienced Learners
                    </h3>
                    <h1 className='lg:text-5xl lg:leading-[1.2] md:text-4xl text-3xl font-semibold text-white'>
                        Full Stack Web Development Program — MERN Stack
                    </h1>
                    <p className='max-w-2xl mx-auto text-lg font-light text-gray-100 md:mt-12 mt-10 mb-10'>
                        The MERN stack refers to a set of tools used to build powerful web applications from end to end. It includes MongoDB, Express, React, and Node.js, and is useful in many development roles.
                    </p>

                    {/* <button
                        disabled={!course}
                        onClick={() => navigate(`/course/checkout/${course?._id}`)}
                        className='w-max mx-auto px-12 py-3 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-800 flex items-center gap-2 rounded'
                    >
                        Enroll Now
                        <HiArrowNarrowRight className='text-2xl font-bold' />
                    </button> */}
                </div>
            </div>
        </section>
        <section className='lg:my-36 md:my-28 my-20'>
            <div className='lg:max-w-5xl lg:w-11/12 w-max mx-auto flex lg:flex-row flex-col items-start justify-center gap-px'>
                <div
                    className='w-full p-10 shadow-[0px_10px_60px_0px_rgba(124,58,237,0.1)] relative after:duration-500 after:opacity-0 hover:after:opacity-100 after:absolute after:inset-12 after:bg-violet-400 after:-z-10 after:rounded-full after:blur-2xl'
                >
                    <h5 className='text-sm font-medium text-gray-500 mb-5'>
                        Course Duration
                    </h5>
                    <p className='text-5xl font-semibold text-gray-800'>
                        06 <span className='text-xl font-normal'>/months</span>
                    </p>
                </div>
                <div className='w-full p-10 shadow-[0px_10px_60px_0px_rgba(124,58,237,0.1)] relative after:duration-500 after:opacity-0 hover:after:opacity-100 after:absolute after:inset-12 after:bg-violet-400 after:-z-10 after:rounded-full after:blur-2xl'>
                    <h5 className='text-sm font-medium text-gray-500 mb-5'>
                        Trial Session
                    </h5>
                    <p className='text-5xl font-semibold text-gray-800'>
                        Free
                    </p>
                </div>
                <div className='w-full p-10 shadow-[0px_10px_60px_0px_rgba(124,58,237,0.1)] relative after:duration-500 after:opacity-0 hover:after:opacity-100 after:absolute after:inset-12 after:bg-violet-400 after:-z-10 after:rounded-full after:blur-2xl'>
                    <h5 className='text-sm font-medium text-gray-500 mb-5'>
                        Projects
                    </h5>
                    <p className='text-5xl font-semibold text-gray-800'>
                        12+
                    </p>
                </div>
                <div className='w-full p-10 shadow-[0px_10px_60px_0px_rgba(124,58,237,0.1)] relative after:duration-500 after:opacity-0 hover:after:opacity-100 after:absolute after:inset-12 after:bg-violet-400 after:-z-10 after:rounded-full after:blur-2xl'>
                    <h5 className='text-sm font-medium text-gray-500 mb-5'>
                        Lecture
                    </h5>
                    <p className='text-5xl font-semibold text-gray-800'>
                        100+
                    </p>
                </div>
            </div>
        </section>
        <section className='pt-20 md:pb-28 pb-20 bg-[#15171F]' >
            <div>
                <div className='max-w-7xl w-4/5 mx-auto'>
                    <h1 className='md:text-4xl md:leading-[1.2] text-2xl sm:font-semibold font-medium text-gray-100 text-center'>
                        Work Experience-Based Learning Approach <br className='lg:block hidden' /> To Master Full Stack Developer Skills
                    </h1>
                    <p className='md:text-lg text-base font-light text-gray-300 text-center mt-5'>
                        Build software projects like the top 1% developers and learn all the skills you need to land the best full stack developer jobs.
                    </p>
                </div>
                <div className='max-w-7xl md:w-[85%] sm:w-3/5 w-[85%] mx-auto mt-16 grid items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 rounded'>
                    <div className='bg-[#181A22] w-auto h-full p-10'>
                        <div className='border border-gray-500 rounded-lg w-max p-3.5'>
                            <HiCodeBracket className='text-[25px] text-amber-300' />
                        </div>
                        <p className='mt-7 text-white text-base font-extralight'>
                            15+ hands-on micro-skilling exercises to learn CS Fundamentals and practical developer skills.
                        </p>
                    </div>
                    <div className='bg-[#181A22] w-auto h-full p-10'>
                        <div className='border border-gray-500 rounded-lg w-max p-3.5'>
                            <TfiInfinite className='text-[25px] text-amber-300' />
                        </div>
                        <p className='mt-7 text-white text-base font-extralight'>
                            7 work-like professional projects, with mentorship, to master Full-Stack skills in an actual developer environment.
                        </p>
                    </div>
                    <div className='bg-[#181A22] w-auto h-full p-10'>
                        <div className='border border-gray-500 rounded-lg w-max p-3.5'>
                            <BiMessageSquareDots className='text-[25px] text-amber-300' />
                        </div>
                        <p className='mt-7 text-white text-base font-extralight'>
                            Well-structured immersive workshops and live sessions from industry seasoned professionals.
                        </p>
                    </div>
                    <div className='bg-[#181A22] w-auto h-full p-10'>
                        <div className='border border-gray-500 rounded-lg w-max p-3.5'>
                            <VscGithubAlt className='text-[25px] text-amber-300' />
                        </div>
                        <p className='mt-7 text-white text-base font-extralight'>
                            Project-backed portfolio on GitHub and a work-ex certificate to impress recruiters.
                        </p>
                    </div>
                    <div className='bg-[#181A22] w-auto h-full p-10'>
                        <div className='border border-gray-500 rounded-lg w-max p-3.5'>
                            <BsGraphUp className='text-[25px] text-amber-300' />
                        </div>
                        <p className='mt-7 text-white text-base font-extralight'>
                            In-built career assistance to get your profile ready and guide you in applying for exciting roles in Full-Stack development.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className='md:py-32 py-24'>
            <div>
                <h1 className='w-4/5 mx-auto lg:text-5xl md:text-4xl lg:leading-[1.2] text-3xl font-semibold text-gray-800 text-center'>
                    Technologies You Will Master Hands-On
                </h1>
            </div>
            <div className='max-w-7xl xl:w-4/5 lg:w-[90%] w-3/4 mx-auto mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/javascript.png"
                        alt="javascript"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        JavaScript
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/html-5.png"
                        alt="html5"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        HTML 5
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/css-3.png"
                        alt="css3"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        CSS 3
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/react-js.png"
                        alt="React JS"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        React JS
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/nodejs.png"
                        alt="Node JS"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        Node JS
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/express-js.png"
                        alt="Express JS"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        Express JS
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/jwt.png"
                        alt="Json Web Token"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        JWT
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/bootstrap.png"
                        alt="Bootstrap"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        Bootstrap
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/tailwind.png"
                        alt="Tailwind"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        Tailwind
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/git.png"
                        alt="Redux"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        Git & GitHub
                    </h4>
                </div>
                <div className='shadow-[0_2px_40px_rgba(124,58,237,0.1)] text-center py-12 px-4 rounded-md bg-white'>
                    <img loading='lazy'
                        src="/images/mern-stack-web/mongodb.png"
                        alt="MongoDB"
                        className='w-[70px] h-[70px] m-auto mb-5'
                    />
                    <h4 className='text-sm font-semibold'>
                        MongoDB
                    </h4>
                </div>
            </div>
        </section>
        <section
            className='sm:py-24 py-20 bg-cover bg-no-repeat bg-bottom'
            style={{ backgroundImage: 'url(/images/bg_banner1.jpg)' }}
        >
            <div className='text-center text-white'>
                <h1 className='lg:text-5xl md:text-4xl text-2xl font-semibold mb-12'>
                    Have any further questions?
                </h1>
                <Link to={'https://ecerasystem.com/contact'}>
                <button
                    className='border border-white py-3 px-10 text-base hover:bg-white hover:text-violet-600 duration-500'
                >
                    Contact Us
                </button>
                </Link>
            </div>
        </section>
        <section className='md:py-32 py-20'>
            <div className='max-w-3xl sm:w-4/5 w-[90%] mx-auto'>
                <h1 className='lg:text-5xl md:text-4xl text-3xl font-semibold text-gray-800 text-center'>
                    FAQs
                </h1>
                <ul className='list-none flex flex-col gap-2 mt-10'>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 1 ? 1 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                What is the meaning of MERN Stack?
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
                            className={`overflow-hidden maxH-0 pl-5 ${indexFaq === 1 ? 'maxH-full' : ''}`}
                        >
                            <p className='text-base text-gray-600 mt-2'>
                                MERN Stack means the combination of four different technologies used for full-stack web development. These technologies include MongoDB, ExpressJS, ReactJS, and NodeJS. All the technologies in the MERN are based on JavaScript. It can be used easily for developing the front-end, back-end, and database of a project.
                            </p>
                        </div>
                    </li>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 2 ? 2 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                How to learn MERN stack development?
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
                            className={`overflow-hidden maxH-0 pl-5 ${indexFaq === 2 ? 'maxH-full' : ''}`}
                        >
                            <p className='text-base text-gray-600 mt-2'>
                                You must follow a good learning path to learn MERN stack web development. First, start with the basics, including HTML, CSS, and JavaScript. Then move to the other components of this tech stack which are MongoDB, Express, React, and Node.
                                <br /> <br />
                                Our’s well-structured and practical MERN Stack courses for beginners is always a great choice to start learning every concept of this popular tech stack.
                            </p>
                        </div>
                    </li>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 3 ? 3 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                How much time is required to learn MERN stack web development?
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
                            className={`overflow-hidden maxH-0 pl-5 ${indexFaq === 3 ? 'maxH-full' : ''}`}
                        >
                            <p className='text-base text-gray-600 mt-2'>
                                It takes at least six months to learn MERN stack development.
                            </p>
                        </div>
                    </li>
                    <li className='p-4 bg-violet-50 rounded'>
                        <div
                            onClick={() => setIndexFaq(pre => pre !== 4 ? 4 : 0)}
                            className='flex items-center justify-between cursor-pointer'
                        >
                            <h2 className='text-lg font-medium text-gray-800'>
                                Will I get a certificate after the MERN stack training?
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
                            className={`overflow-hidden maxH-0 pl-5 ${indexFaq === 4 ? 'maxH-full' : ''}`}
                        >
                            <p className='text-base text-gray-600 mt-2'>
                                Yes. You will be rewarded with an industry-recognized certificate that helps you get jobs at top-level companies.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <Footer />
    </>);
};

export default MERNStackWebDevelopment;