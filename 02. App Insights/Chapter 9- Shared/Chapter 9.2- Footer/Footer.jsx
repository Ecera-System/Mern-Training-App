
import './Footer.css';


const Footer = () => {
    
    return (<>
        <footer className='w-full bg-slate-900'>
            <div className='2xl:w-[1280px] w-11/12 mx-auto'>
                <div className='w-full py-10 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 items-start gap-6'>
                    <ul className='list-none flex flex-col gap-3'>
                        <li>
                            <h2 className='text-white text-xl font-medium'>
                                Learning Program
                            </h2>
                        </li>
                        <li>
                            <a
                                href="/programs/mern-stack-web-development"
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                            >
                                MERN Stack
                            </a>
                        </li>
                        <li>
                            <a
                                href="/Placements" 
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                            >
                                Students
                            </a>
                            
                        </li>
                      
                    </ul>
                    <ul className='list-none flex flex-col gap-3'>
                        <li>
                            <h2 className='text-white text-xl font-medium'>
                                Ecera System
                            </h2>
                        </li>
                        <li>
                            <a
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                                href={'https://ecerasystem.com/about'}
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                                href={'/placements'}

                            >
                                Success Stories
                            </a>
                        </li>
                    </ul>
                    <ul className='list-none flex flex-col gap-3'>
                        <li>
                            <h2 className='text-white text-xl font-medium'>
                                Support
                            </h2>
                        </li>
                        <li>
                            <a
                                href={'https://ecerasystem.com/contact'}
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                            >Contact Us</a>
                        </li>
                        <li>
                            <a href="https://ecerasystem.com/" className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'>
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="https://ecerasystem.com/" className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'>
                                Cookies Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href={'/programs/mern-stack-web-development'}
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                            >FAQ</a>
                        </li>
                        <li>
                            <a
                                href="https://ecerasystem.com/terms-of-services"
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                            >
                                Terms of Services
                            </a>
                        </li>
                    </ul>
                    <ul className='list-none flex flex-col gap-3'>
                        <li>
                            <h2 className='text-white text-xl font-medium'>
                                For Business
                            </h2>
                        </li>
                        <li>
                            <a
                                href="https://ecerasystem.com/remote-employees"
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                            >
                                Hire Developers
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://ecerasystem.com/testimonial"
                                className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'
                            >
                                Testimonial
                            </a>
                        </li>
                    </ul>
                </div>
                <hr />
                <div className='py-5 flex sm:flex-row flex-col-reverse justify-between items-center gap-2'>
                    <div>
                        <p className='text-sm text-gray-300'>&copy; {new Date().getFullYear()} Ecera System™. All Rights Reserved.</p>
                    </div>



                    <ul className='list-none flex items-center gap-x-6'>
                      
                      
                       
                     
                        <li>
                            <a
                                target={'blank'}
                                href="https://github.com/Ecera-System"
                                className='text-xl text-gray-300 hover:text-gray-50 duration-300 cursor-pointer'
                            >
                                <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            

        </footer>
    </>);
};

export default Footer;