import React from 'react';
import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';
import Footer from '../Shared/Footer/Footer';

const ContactUs = () => {
    return (<>
        <PageTitle title="Contact us" />
        <Header />

        <div className=" text-white min-h-[80vh]">
            <div className="container mx-auto py-12">
                <div className="max-w-lg mx-auto bg-violet-900 rounded-lg shadow-2xl p-8">
                    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                    <div className="text-lg mb-4">
                        <p>
                            <strong>Phone:</strong> +1 2486771972
                        </p>
                        <p>
                            <strong>Email:</strong> mernprogram@ecerasystem.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>);
};

export default ContactUs;