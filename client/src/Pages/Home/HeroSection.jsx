import React, { useContext, useEffect, useState } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import PropTypes from 'prop-types'; // Import PropTypes

import { Link } from 'react-router-dom';
import BookAFreeCounselling from './BookAFreeCounselling';
import { contextProvider } from '../../Context/ContextProvider';
import Header from '../Shared/Header/Header';
import SignUp from '../Auth/SignUp';
import axios from 'axios';
import Slider from 'react-slick';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import heroImage from '../../../public/images/home/MERN-hero.png';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaLaptopCode } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";



// import Chatbot from './Chatbot';

const HeroSection = () => {
    const { isLoggedIn } = useContext(contextProvider);
    const [signUpPopUp, setSignUpPopUp] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [reviews, setReviews] = useState([]);

    // useEffect(() => {
    //     const gradient = document.querySelector(".hero_gradient");
    //     function onMouseMove(event) {
    //         gradient.style.backgroundImage = `radial-gradient(circle at ${event.clientX}px ${event.clientY}px, transparent 0, rgb(50, 5, 123, 0.9) 50%)`;
    //     }
    //     document.addEventListener("mousemove", onMouseMove);

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         document.removeEventListener("mousemove", onMouseMove);
    //     };
    // }, []);

    useEffect(() => {
        axios.get('review_data.json')
            .then(res => {
                setReviews(res.data);
            })
            .catch(err => { });
    }, []);

    const NextArrow = ({ onClick }) => {
        return (
            <div className="arrow next lg:-mr-5 max-lg:mr-8" onClick={onClick}>
                <BsArrowRight />
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className="arrow prev lg:-ml-5 max-lg:ml-8" onClick={onClick}>
                <BsArrowLeft />
            </div>
        );
    };

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 1,
                }
            },
        ],
        beforeChange: (current, next) => setImageIndex(next),
    };


    return (<>
        <section
            // style={{ backgroundImage: `url(/images/home/banner_code.jpg)` }}
            className='w-full h-auto bg-no-repeat bg-center bg-cover'
        >
            <div className='hero_gradient'>
                <Header textColor="text-white" />
                <div className=' shadow-lg'>
                    <div className='w-full border-t border-gray-300 flex flex-col-reverse md:flex-row justify-between md:px-20 py-5'>
                        <div className=' w-full md:w-[50%] pl-10' >
                            <div className='flex flex-col items-start w-[100%]'>
                                <h3 className='font-semibold text-gray-500'>Kick start your career with </h3>
                                <h1 className='text-[50px] w-[400px] font-bold text-[#4249F8] '>
                                    <span className='text-[#FEBF1B]'>M</span>
                                    <span className='text-[#5E5454]'>E</span>
                                    <span className='text-[#19A9F9]'>R</span>
                                    <span className='text-[#096407]'>N</span> Stack
                                    </h1>
                                <h2 className='text-[27px] font-semibold text-gray-600 pb-2 border-b mb-4 border-gray-600'>Training and Certification</h2>
                                <ul className='ml-4 w-[400px] marker:text-[#FEBF1B] text-md text-[#000080]'>
                                    <li className=''>One to One Doubt support</li>
                                    <li className=''>Projects based Learning</li>
                                    <li className=''>Highly Qualified Mentors</li>
                                    <li className=''>Placement Guaranteed program</li>
                                    <li className=''>Fee refund, If not like the program</li>
                                </ul>
                                <Link
                                    onClick={() => setSignUpPopUp(true)}
                                    to={'/programs/mern-stack-web-development'}
                                    className='w-max px-7 py-2 my-10 text-base font-medium bg-[#4249F8] hover:bg-[#2137F9] duration-300 text-white flex items-center gap-2 rounded'
                                >
                                    Explore
                                    <HiArrowNarrowRight className='text-2xl font-bold' />
                                </Link>
                            </div>
                            {
                                signUpPopUp && <SignUp signUpPopUp={signUpPopUp} setSignUpPopUp={setSignUpPopUp} />
                            }
                        </div>
                        <div className='w-full md:w-[50%] flex justify-center items-center'>
                            <img className='w-[350px] h-auto object-cover'
                                src={heroImage} alt="MERN" />
                        </div>
                    </div>

                    <div className=' w-full flex md:px-[10%] pb-[8%] flex-wrap justify-between  align-middle'>
                        <div className=' w-[200px] flex flex-col justify-center align-middle'>
                            <div className=' text-4xl text-[#31C10D] mb-3 mx-auto'>
                                <LiaChalkboardTeacherSolid />
                            </div>
                            <div className='border px-5 py-2 text-center bg-[#E7F9E7] rounded-lg '>
                                <h2 className='text-3xl font-semibold'>12+</h2>
                                <h3 className='mt-1 text-sm font-medium text-gray-500'>Projects</h3>
                            </div>
                        </div>

                        <div className=' w-[200px] flex flex-col justify-center align-middle'>
                            <div className=' text-4xl text-[#335FFC] mb-3 mx-auto'>
                                <FaLaptopCode />
                            </div>
                            <div className='border px-5 py-2 text-center bg-[#E2ECFF] rounded-lg '>
                                <h2 className='text-3xl font-semibold'>10+</h2>
                                <h3 className='mt-1 text-sm font-medium text-gray-500'>Technologies Taught</h3>
                            </div>
                        </div>

                        <div className=' w-[200px] flex flex-col justify-center align-middle'>
                            <div className=' text-4xl text-[#ff39de] mb-3 mx-auto'>
                                <PiStudentFill />
                            </div>
                            <div className='border px-5 py-2 text-center bg-[#f200fa20] rounded-lg '>
                                <h2 className='text-3xl font-semibold'>100+</h2>
                                <h3 className='mt-1 text-sm font-medium text-gray-500'>Students placed</h3>
                            </div>
                        </div>

                        <div className=' w-[200px] flex flex-col justify-center align-middle'>
                            <div className=' text-3xl text-[#F92323] mb-3 mx-auto'>
                                <BsGraphUpArrow />
                            </div>
                            <div className='border px-5 py-2 text-center bg-[#ff000015] rounded-lg '>
                                <h2 className='text-3xl font-semibold'>06 LPA+</h2>
                                <h3 className='mt-1 text-sm font-medium text-gray-500'>Highest package offered</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className='relative -top-7 '>
            <BookAFreeCounselling />
        </div>
        <section>
            <div className='max-w-7xl w-[90%] mx-auto text-center mt-16'>
                <h2 className='max-w-4xl w-4/5 max-sm:w-[90%] mx-auto lg:text-5xl lg:leading-[1.2] md:text-4xl text-3xl font-semibold text-gray-800 text-center'>
                    Benefits After Course Completion
                </h2><br />
                <div className='bg-gradient-to-r from-purple-400 to-green-500 rounded-lg p-6 shadow-md text-white'>
                    <marquee direction="up" height="100%">
                        <ul className='list-none text-center text-lg'>
                            <li className='mb-2'>
                                <div className="animated-card">
                                    &#10024; 100% Placement Guarantee &#10024;
                                </div>
                            </li>
                            <li className='mb-2'>
                                <div className="animated-card">
                                    &#128640; Experience Letter Upon Course Completion &#128640;
                                </div>
                            </li>
                            <li className='mb-2'>
                                <div className="animated-card">
                                    &#128293; Personalized Recommendation Letter from Industry Experts &#128293;
                                </div>
                            </li>
                            {/* Add more benefits as needed */}
                        </ul>
                    </marquee>
                </div>
            </div>
        </section>

        <section className='lg:pt-24 pb-20'>
            <div className='text-center'>
                <h1 className='max-w-4xl w-4/5 max-sm:w-[90%] mx-auto lg:text-5xl lg:leading-[1.2] md:text-4xl text-3xl font-semibold text-gray-800 text-center'>
                    Our Successful Students
                </h1>
                <p className='w-4/5 mx-auto mt-5 text-lg text-gray-600'>
                    Here are some of our students who have learned from our programs and got jobs/interns in various places
                </p>
            </div>
            <div className='max-w-[68rem] xl:w-4/5 lg:w-[90%] md:w-4/5 w-full mx-auto'>
                <Slider {...settings}>
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className={`py-28 ${index === imageIndex ? "slide activeSlide" : "slide"}`}
                        >
                            <div className='max-lg:w-[20rem_!important] mx-auto text-center xl:p-12 max-xl:pt-12 p-8 bg-white shadow-[0_2px_50px_rgba(124,58,237,0.2)] relative'>
                                <span
                                    className='absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden p-1 bg-white shadow-[0_2px_20px_2px_rgba(124,58,237,0.3)]'
                                >
                                    <img
                                        src={review.avatar}
                                        alt={`Avatar of ${review.name}`}
                                        loading='lazy'
                                        className='w-full h-full object-cover rounded-full'
                                    />
                                </span>
                                <p className='text-sm text-gray-500 mt-5'>
                                    {review.feedback}
                                </p>
                                <h2 className='text-base font-medium text-gray-800 mt-5'>
                                    {review.name}
                                </h2>
                                <h5 className='text-sm text-gray-600'>
                                    {review.position}, <br /> {review.company}
                                </h5>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
        <section
            className='pt-20 pb-40 bg-contain bg-center relative z-10'
            style={{ backgroundImage: 'url(/images/placements/star.png)' }}
        >
            <span
                className='absolute top-0 -translate-y-1/2 left-0 -translate-x-[40%] z-0 w-96 h-96 bg-no-repeat bg-contain'
                style={{ backgroundImage: 'url(/images/placements/circle-1.png)' }}
            />
            <span
                className='absolute top-0 right-0 z-0 w-[32rem] h-[32rem] bg-no-repeat bg-contain'
                style={{ backgroundImage: 'url(/images/placements/line-2.png)' }}
            />
            <div className='text-center'>
                <h1 className='max-w-4xl sm:w-4/5 w-11/12 mx-auto md:py-10 lg:text-6xl md:text-5xl text-4xl font-semibold text-gray-800'>
                    Proceed with professional work experience and grab your dream job.
                </h1>
            </div>
        </section>



    </>);
};
HeroSection.propTypes = {
    onClick: PropTypes.func, // Add PropTypes validation for onClick prop
};


export default HeroSection;


{/* <h4 className='text-lg font-medium text-[#FFD500]'>
                            With Our Training Platform
                        </h4>
                        <h1 className='lg:text-5xl lg:leading-[1.2] text-3xl font-semibold text-white mt-5'>
                            Discover Endless Possibilities in Web Development
                        </h1>
                        <p className='md:text-lg text-base font-light text-gray-200 mt-12 mb-10'>
                            Learn, Create, Innovate, and Unleash Your Creativity and Technical Expertise in the World of Web Development with Our Programs.
                        </p>
                        <Link
                            onClick={() => setSignUpPopUp(true)}
                            className='w-max mx-auto px-10 py-3 mb-8 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-800 flex items-center gap-2 rounded'
                        >
                            Enroll Now
                            <HiArrowNarrowRight className='text-2xl font-bold' />
                        </Link> */}