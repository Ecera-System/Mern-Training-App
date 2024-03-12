import "./Footer.css";
import logo from "../../../../public/images/ecera-system-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-[#381e0f]">
        <div className="2xl:w-[1280px] w-11/12 mx-auto">
          <div className="w-full py-10 lg:pl-16 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 items-start gap-12">
            <ul className="list-none flex flex-col gap-3">
              <li>
                <img className="w-16 h-auto" src={logo} alt="" />
              </li>
              <li>
                <p className="text-white text-sm">
                  Website owned by Ecera System
                </p>
              </li>
              <li>
                <p className="text-white text-sm">
                  <span className="font-bold text-lg">Address: </span>
                  33405 Colony Park Drive Farmington Hills MI 48331
                </p>
              </li>
              <li>
                <p className="text-white text-sm">
                  <span className="font-bold text-lg">Phone: </span>
                  +1 2486771972
                </p>
              </li>
            </ul>

            <ul>
              <ul className="list-none flex flex-col gap-3">
                <li>
                  <h2 className="text-white text-xl font-medium">
                    Ecera System
                  </h2>
                </li>

                <li>
                  <a
                    className="text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300"
                    href={"/placements"}
                  >
                    Success Stories
                  </a>
                </li>
              </ul>

              <ul className="list-none flex flex-col gap-3 mt-4">
                <li>
                  <h2 className="text-white text-xl font-medium">
                    Learning Program
                  </h2>
                </li>
                <li>
                  <a
                    href="/programs/mern-stack-web-development"
                    className="text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300"
                  >
                    MERN Stack
                  </a>
                </li>
                <li>
                  <a
                    href="/Placements"
                    className="text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300"
                  >
                    Students
                  </a>
                </li>
              </ul>
            </ul>
            <ul className="list-none flex flex-col gap-3">
              <li>
                <h2 className="text-white text-xl font-medium">Support</h2>
              </li>
              <li>
                <Link
                  className="text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300"
                  to={"/about"}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                {/* <a href="https://ecerasystem.com/" className='text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300'>
                                Privacy Policy
                            </a> */}
                <Link
                  className="text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300"
                  to={"/privacy"}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                {/* <a
                  href="https://ecerasystem.com/"
                  className="text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300"
                >
                  Cookies Policy
                </a> */}
                <Link
                  className="text-gray-300 text-sm hover:underline hover:text-gray-400 duration-300"
                  to={"/cookies-policy"}
                >
                  Cookies Policy
                </Link>
              </li>
              {/* <li>
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
                        </li> */}
            </ul>
            {/* <ul className='list-none flex flex-col gap-3'>
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
                    </ul> */}
          </div>
          <hr />
          <div className="py-5 flex sm:flex-row flex-col-reverse justify-between items-center gap-2">
            <div>
              <p className="text-sm text-gray-300">
                &copy; {new Date().getFullYear()} Ecera System™. All Rights
                Reserved.
              </p>
            </div>

            <ul className="list-none flex items-center gap-x-6">
              <li>
                <a
                  target={"blank"}
                  href="https://github.com/Ecera-System"
                  className="text-xl text-gray-300 hover:text-gray-50 duration-300 cursor-pointer"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
