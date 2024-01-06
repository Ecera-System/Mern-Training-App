import React from 'react';
import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';
import Footer from '../Shared/Footer/Footer';

const ContactUs = () => {
    return (<>
        <PageTitle title="Contact us" />
        <Header />
        <div
            className='pb-20 pt-44 lg:mt-10 bg-no-repeat bg-cover'
            style={{ backgroundImage: `url(/images/hp-img-closer-bg.png)` }}
        >
            <section className='2xl:w-[1280px] xl:w-4/5 lg:w-11/12 md:w-4/5 w-11/12 mx-auto flex lg:flex-row flex-col-reverse justify-between'>
                <div className='lg:w-1/2 w-full lg:text-start text-center'>
                    <h2 className='text-4xl text-blue-900'>
                        Questions? We'll put you on the right path.
                    </h2>
                    <p className='text-base text-gray-500 my-5'>
                        Ask about Ecera System products, pricing, implementation, or anything else. Our highly trained reps are standing by, ready to help.
                    </p>
                    <p className='text-lg font-medium text-gray-700'>
                        Please write to -
                        <a href="mailto:sales@ecerasystem.com" className='ml-2'>
                            sales@ecerasystem.com
                        </a>
                    </p>
                </div>
                <div className='lg:w-1/2 w-full'>
                    {/* <img src={qnaImg} alt="" className='mx-auto' loading='lazy'/> */}
                </div>
            </section>
        </div>
        <Footer />
    </>);
};

export default ContactUs;