import React, { useState } from 'react';
import FAQItem from './FAQItem';
import faqImage from '../../../public/images/home/faq.svg'

const FAQSection = () => {
    const [indexFaq, setIndexFaq] = useState(0);

    return (
        <div className='md:py-32 py-20 '>
            <h1 className="lg:text-5xl pb-7 md:text-4xl text-3xl font-semibold text-gray-800 text-center">FAQs</h1>
            <section className="2xl:w-[1280px] w-10/12 mx-auto flex justify-between">
                <div className='w-[35%] flex align-middle'>
                    <img src={faqImage} className='w-[100%] h-auto ' alt="" />
                </div>
                <div className="w-[60%]">
                    <ul className="list-none flex flex-col gap-2 mt-10">
                        <FAQItem
                            question="What is the meaning of MERN Stack?"
                            answer="MERN Stack means the combination of four different technologies used for full-stack web development. These technologies include MongoDB, ExpressJS, ReactJS, and NodeJS. All the technologies in the MERN are based on JavaScript. It can be used easily for developing the front-end, back-end, and database of a project."
                            index={1}
                            indexFaq={indexFaq}
                            setIndexFaq={setIndexFaq}
                        />
                        <FAQItem
                            question="How to learn MERN stack development?"
                            answer="You must follow a good learning path to learn MERN stack web development. First, start with the basics, including HTML, CSS, and JavaScript. Then move to the other components of this tech stack which are MongoDB, Express, React, and Node. Our well-structured and practical MERN Stack courses for beginners are always a great choice to start learning every concept of this popular tech stack."
                            index={2}
                            indexFaq={indexFaq}
                            setIndexFaq={setIndexFaq}
                        />
                        <FAQItem
                            question="How much time is required to learn MERN stack web development?"
                            answer="It takes at least six months to learn MERN stack development."
                            index={3}
                            indexFaq={indexFaq}
                            setIndexFaq={setIndexFaq}
                        />
                        <FAQItem
                            question="Will I get a certificate after the MERN stack training?"
                            answer="Yes. You will be rewarded with an industry-recognized certificate that helps you get jobs at top-level companies."
                            index={4}
                            indexFaq={indexFaq}
                            setIndexFaq={setIndexFaq}
                        />
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default FAQSection;
