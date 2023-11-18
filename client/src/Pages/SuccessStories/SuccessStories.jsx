import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';
import axios from 'axios';
import Footer from '../Shared/Footer/Footer';

const SuccessStories = () => {
    const [reviews, setReviews] = useState([]);
    const [readMore, setReadMore] = useState(null);

    useEffect(() => {
        axios.get('review_data.json')
            .then(res => {
                setReviews(res.data);
            })
            .catch(err => {});
    }, []);

    return (<>
        <PageTitle title='Our Success Students Reviews' />
        <Header />
        <section className='py-24 bg-gradient-to-r from-blue-600 to-purple-600'>
            <div className='max-w-3xl mx-auto text-center'>
                <h1 className='text-5xl font-semibold text-white'>
                    Successful Students
                </h1>
                <p className='text-lg text-violet-100 mt-6'>
                    We’re happy to have been a part of our students’ successful journey by landing them a job with their dream company.
                </p>
            </div>
        </section>
        <section className='py-20 bg-gray-50'>
            <div className='max-w-[70rem] w-4/5 mx-auto grid grid-cols-2 gap-10'>
                {
                    reviews.map((review, index) =>
                        <div key={index} className='w-full h-full'>
                            <div className={`${readMore === index ? 'h-full' : 'h-[310px]'} w-full overflow-hidden bg-white border flex rounded-md`}>
                                <div className='w-1/4 p-6 pr-0'>
                                    <img
                                        loading='lazy'
                                        className='w-24 h-24 mx-auto object-cover rounded-full'
                                        src={review.avatar}
                                        alt=""
                                    />
                                </div>
                                <div className='w-3/4 p-6'>
                                    <h2 className='text-gray-900'>
                                        <strong>{review.name}</strong>
                                    </h2>
                                    <i className='text-sm text-gray-700'>
                                        {review.position}, <br /> {review.company}
                                    </i>
                                    <p className='mt-3 text-gray-900 text-base'>
                                        {review.feedback.length > 250 ?
                                            (readMore === index ?
                                                <>
                                                    {review.feedback}
                                                    <button
                                                        className='block text-sm font-semibold underline hover:no-underline'
                                                        onClick={() => setReadMore(null)}
                                                    >
                                                        Show Less
                                                    </button>
                                                </> :
                                                <>
                                                    {review.feedback.slice(0, 250)}...
                                                    <button
                                                        className='block text-sm font-semibold underline hover:no-underline'
                                                        onClick={() => setReadMore(index)}
                                                    >
                                                        Read More
                                                    </button>
                                                </>
                                            ) :
                                            review.feedback
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </section>
        <section
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
        <Footer />
    </>);
};

export default SuccessStories;