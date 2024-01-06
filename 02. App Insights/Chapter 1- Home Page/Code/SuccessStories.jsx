import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Slider from 'react-slick';


const SuccessStories = () => {
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
            <div className="arrow next" onClick={onClick}>
                <BsArrowRight />
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className="arrow prev" onClick={onClick}>
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
        beforeChange: (current, next) => setImageIndex(next),
    };

    return (

        <section className='pt-24 pb-20'>
            <div className='text-center'>
                <h1 className='max-w-4xl mx-auto text-5xl font-semibold text-gray-800'>
                    Our Successful Students
                </h1>
                <p className='w-4/5 mx-auto mt-5 text-lg text-gray-600'>
                    Here are some of our students who have learned from our programs and got jobs/interns in various places
                </p>
            </div>
            <div className='max-w-[68rem] w-4/5 mx-auto'>
                <Slider {...settings}>
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className={`py-28 ${index === imageIndex ? "slide activeSlide" : "slide"}`}
                        >
                            <div className='text-center p-12 bg-white shadow-[0_2px_50px_rgba(124,58,237,0.2)] relative'>
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
    );
};

export default SuccessStories;