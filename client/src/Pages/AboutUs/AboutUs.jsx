import React from 'react';
import logo from '../../../public/images/ecera-system-logo.png'
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const AboutUs = () => {
    return (
        <div>
            <Header textColor="text-white" />
            <div className="bg-gray-100 py-10 px-4 md:px-16 lg:px-32">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
                        About Our Training Platform
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col justify-center items-center">
                            <img
                                src={logo}// Replace with your website logo
                                alt="Website Logo"
                                className="w-48 h-48 object-cover rounded-full shadow-lg mb-4"
                            />
                            <p className="text-lg text-center">
                                Our training platform provides comprehensive courses on MERN stack web development. We are committed to offering high-quality education with qualified mentors and industry-standard technologies.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold mb-4">
                                What We Offer
                            </h2>
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">Qualified Mentors</h3>
                                <p>Our platform is staffed with experienced mentors who guide students through every step of the learning process.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                                <h3 className="text-lg font-semibold mb-2">Technologies We Teach</h3>
                                <p>We cover the entire MERN stack, including MongoDB, Express.js, React.js, and Node.js, providing students with a comprehensive understanding of modern web development.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                                <h3 className="text-lg font-semibold mb-2">Flexible Learning</h3>
                                <p>Our courses are designed to accommodate various learning styles and schedules, allowing students to learn at their own pace.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;