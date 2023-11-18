import { useEffect, useState } from 'react';
import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';
import './Placements.css';
import Slider from 'react-slick';
import axios from 'axios';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Footer from '../Shared/Footer/Footer';

const Placements = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [reviews, setReviews] = useState([]);

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
        <PageTitle title="Placements" />
        <section
            className='bg-cover bg-no-repeat bg-top bg-violet-700 relative before:absolute before:bg-black/70 before:inset-0'
            style={{ backgroundImage: 'url(/images/placements/placement.png)' }}
        >
            <Header textColor="text-white" />
            <div className='relative pt-16 pb-32 z-20 max-w-3xl w-[90%] mx-auto text-center'>
                <h1 className='md:text-5xl text-3xl font-semibold text-white'>
                    Placement Stats
                </h1>
                <h4 className='md:text-2xl text-xl font-semibold text-yellow-400 lg:mt-16 mt-10'>
                    Empowering Our Learners to Achieve Career Breakthroughs and Land Top Positions in Leading Companies
                </h4>
                <p className='text-lg text-gray-100 mt-6'>
                    We want to ensure that our learners achieve the best possible career outcomes and are able to fulfill their professional goals.
                </p>
            </div>
        </section>
        <section className='flex items-center justify-center -mt-16 mb-10'>
            <div className='max-w-5xl lg:w-11/12 w-[19rem] flex items-start justify-center gap-px flex-wrap lg:flex-nowrap bg-white z-10 text-center'>
                <div
                    className='w-full p-10 shadow-[0px_10px_60px_0px_rgba(124,58,237,0.1)] relative after:duration-500 after:opacity-0 hover:after:opacity-100 after:absolute after:inset-12 after:bg-violet-400 after:-z-10 after:rounded-full after:blur-2xl'
                >
                    <h5 className='text-sm font-medium text-gray-500 mb-5'>
                        placed in 6 months
                    </h5>
                    <p className='text-5xl font-semibold text-gray-800'>
                        93%
                    </p>
                </div>
                <div
                    className='w-full p-10 shadow-[0px_10px_60px_0px_rgba(124,58,237,0.1)] relative after:duration-500 after:opacity-0 hover:after:opacity-100 after:absolute after:inset-12 after:bg-violet-400 after:-z-10 after:rounded-full after:blur-2xl'
                >
                    <h5 className='text-sm font-medium text-gray-500 mb-5'>
                        Average CTC
                    </h5>
                    <p className='text-5xl font-semibold text-gray-800'>
                        11 LPA
                    </p>
                </div>
                <div className='w-full p-10 shadow-[0px_10px_60px_0px_rgba(124,58,237,0.1)] relative after:duration-500 after:opacity-0 hover:after:opacity-100 after:absolute after:inset-12 after:bg-violet-400 after:-z-10 after:rounded-full after:blur-2xl'>
                    <h5 className='text-sm font-medium text-gray-500 mb-5'>
                        Average Salary Hike
                    </h5>
                    <p className='text-5xl font-semibold text-gray-800'>
                        89%
                    </p>
                </div>
                <div className='w-full p-10 shadow-[0px_10px_60px_0px_rgba(124,58,237,0.1)] relative after:duration-500 after:opacity-0 hover:after:opacity-100 after:absolute after:inset-12 after:bg-violet-400 after:-z-10 after:rounded-full after:blur-2xl'>
                    <h5 className='text-sm font-medium text-gray-500 mb-5'>
                        Hiring Partners
                    </h5>
                    <p className='text-5xl font-semibold text-gray-800'>
                        240+
                    </p>
                </div>
            </div>
        </section>
        <section className='md:py-20 py-16'>
            <h1 className='max-w-4xl w-4/5 max-sm:w-[90%] mx-auto lg:text-5xl lg:leading-[1.2] md:text-4xl text-3xl font-semibold text-gray-800 text-center'>
                Top companies and hyper-growth startups like to hire from us.
            </h1>
            <div className='max-w-7xl xl:w-4/5 lg:w-full md:w-[45rem] sm:w-[30rem] w-[90%] mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-16'>
                <div className='border-r border-b max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/ibm-logo.png"
                        loading='lazy'
                        alt="IBM logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-r border-b max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/aecom-logo.png"
                        loading='lazy'
                        alt="Aecom logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-r border-b max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/afpm-logo.png"
                        loading='lazy'
                        alt="AFPM logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-b max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/chase-logo.png"
                        loading='lazy'
                        alt="Chase logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-r border-b max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/dailyhunt-logo.png"
                        loading='lazy'
                        alt="Dailyhunt logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-r border-b max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/fedex-logo.png"
                        loading='lazy'
                        alt="Fedex logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-r border-b max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/ninjacart-logo.png"
                        loading='lazy'
                        alt="Ninjacart logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-b max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/paytm-logo.png"
                        loading='lazy'
                        alt="Paytm logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-r max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/siemens-logo.png"
                        loading='lazy'
                        alt="Siemens logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-r max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/walmart-logo.png"
                        loading='lazy'
                        alt="Walmart logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='border-r max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/ecerasystem-logo.png"
                        loading='lazy'
                        alt="Ecera System logo"
                        className='w-full h-full'
                    />
                </div>
                <div className='max-lg:border lg:px-16 px-14 py-8 opacity-50 hover:opacity-100 duration-300'>
                    <img
                        src="/images/placements/paytm-logo.png"
                        loading='lazy'
                        alt="Paytm logo"
                        className='w-full h-full'
                    />
                </div>
            </div>
        </section>
        <section className='md:py-20 py-14'>
            <h1 className='max-w-4xl w-4/5 max-sm:w-[90%] mx-auto lg:text-5xl lg:leading-[1.2] md:text-4xl text-3xl font-semibold text-gray-800 text-center'>
                Our learners come from different backgrounds and experiences
            </h1>

            <div className='lg:w-[50rem] md:w-[40rem] w-[20rem] mx-auto h-auto md:mt-20 mt-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 gap-x-9'>
                <div className='text-center p-10 relative z-10'>
                    <div className='absolute inset-0 bg-emerald-300 lg:skew-x-[15deg] -skew-x-[15deg] -z-[1]'></div>
                    <h4 className='text-base font-semibold '>QA/Testing</h4>
                    <p className=' text-base mt-2'>14%</p>
                </div>
                <div className='text-center p-10 relative z-10'>
                    <div className='absolute inset-0 bg-violet-300 skew-x-[15deg] -z-[1]'></div>
                    <h4 className='text-base font-semibold'>Freshers</h4>
                    <p className='text-base mt-2'>17%</p>
                </div>
                <div className='text-center p-10 relative z-10'>
                    <div className='absolute inset-0 bg-yellow-300 lg:skew-x-[15deg] -skew-x-[15deg] -z-[1]'></div>
                    <h4 className='text-base font-semibold'>Service Company Engineers</h4>
                    <p className='text-base mt-2'>25%</p>
                </div>
                <div className='text-center p-10 relative z-10'>
                    <div className='absolute inset-0 bg-pink-300 lg:-skew-x-[15deg] skew-x-[15deg] -z-[1]'></div>
                    <h4 className='text-base font-semibold '>Support/Maintenance</h4>
                    <p className=' text-base mt-2'>11%</p>
                </div>
                <div className='text-center p-10 relative z-10'>
                    <div className='absolute inset-0 bg-cyan-300 -skew-x-[15deg] -z-[1]'></div>
                    <h4 className='text-base font-semibold'>Non IT Roles</h4>
                    <p className='text-base mt-2'>15%</p>
                </div>
                <div className='text-center p-10 relative z-10'>
                    <div className='absolute inset-0 bg-orange-300 lg:-skew-x-[15deg] skew-x-[15deg] -z-[1]'></div>
                    <h4 className='text-base font-semibold'>Software Development</h4>
                    <p className='text-base mt-2'>18%</p>
                </div>
            </div>
            {/* <div className='lg:w-[50rem] md:w-[40rem] w-[20rem] mx-auto flex lg:flex-col md:flex-row flex-col lg:gap-5 gap-9 mt-20'>
                <div className='w-full grid lg:grid-cols-3 grid-cols-1 gap-5'>
                    <div className='text-center p-10 relative z-10'>
                        <div className='absolute inset-0 bg-emerald-300 skew-x-[15deg] -z-[1]'></div>
                        <h4 className='text-base font-semibold '>QA/Testing</h4>
                        <p className=' text-base mt-2'>14%</p>
                    </div>
                    <div className='text-center p-10 relative z-10'>
                        <div className='absolute inset-0 bg-violet-300 skew-x-[15deg] -z-[1]'></div>
                        <h4 className='text-base font-semibold'>Freshers</h4>
                        <p className='text-base mt-2'>17%</p>
                    </div>
                    <div className='text-center p-10 relative z-10'>
                        <div className='absolute inset-0 bg-yellow-300 skew-x-[15deg] -z-[1]'></div>
                        <h4 className='text-base font-semibold'>Service Company Engineers</h4>
                        <p className='text-base mt-2'>25%</p>
                    </div>
                </div>
                <div className='w-full grid lg:grid-cols-3 grid-cols-1 gap-5'>
                    <div className='text-center p-10 relative z-10'>
                        <div className='absolute inset-0 bg-pink-300 -skew-x-[15deg] -z-[1]'></div>
                        <h4 className='text-base font-semibold '>Support/Maintenance</h4>
                        <p className=' text-base mt-2'>11%</p>
                    </div>
                    <div className='text-center p-10 relative z-10'>
                        <div className='absolute inset-0 bg-cyan-300 -skew-x-[15deg] -z-[1]'></div>
                        <h4 className='text-base font-semibold'>Non IT Roles</h4>
                        <p className='text-base mt-2'>15%</p>
                    </div>
                    <div className='text-center p-10 relative z-10'>
                        <div className='absolute inset-0 bg-orange-300 -skew-x-[15deg] -z-[1]'></div>
                        <h4 className='text-base font-semibold'>Software Development</h4>
                        <p className='text-base mt-2'>18%</p>
                    </div>
                </div>
            </div> */}
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
        <Footer />
    </>);
};

export default Placements;