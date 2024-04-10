import "./Footer.css";
import logo from "../../../../public/images/ecera-system-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full ">
        <div className="2xl:w-[1280px] w-10/12 mx-auto">
          <div className="w-full py-10 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 items-start gap-10">
            <ul className="list-none flex flex-col gap-3">
              <li>
                <img className="w-16 h-auto" src={logo} alt="" />
              </li>
              <li>
                <p className="text-gray-600 text-base ">
                  Proudly crafted and owned by <span className="text-blue-800 font-semibold">Ecera System</span>!
                </p>
              </li>
              <li>
                <h1 className=" font-semibold text-xl ">Follow Us</h1>
                <div className="w-[50%] flex justify-between my-2">
                  <a href=""><i className="fa-brands fa-facebook text-2xl text-blue-700 "></i></a>
                  <a href="https://www.instagram.com/ecerasystem?igsh=MWJreTJqdnB0eXN4OQ=="><i className="fa-brands fa-instagram text-2xl text-blue-700 "></i></a>
                  <a href=""><i className="fa-brands fa-linkedin text-2xl text-blue-700 "></i></a>
                  <a href="https://github.com/Ecera-System"><i className="fa-brands fa-github text-2xl text-blue-700 "></i></a>
                </div>
              </li>
            
            </ul>
            <ul className="list-none flex flex-col gap-4">
              <li>
                <h2 className="text-xl font-semibold mb-4">
                  Contact
                </h2>
              </li>
              <li>
                <h3 className="text-sm text-gray-500"><i class="fa-solid fa-phone mr-2"></i> +1 2486771972</h3>
              </li>
              <li>
                <h3 className="text-sm text-gray-500"><i class="fa-regular fa-envelope mr-2"></i> mernprogram@ecerasystem.com</h3>
              </li>
              <li>
                <h3 className="text-sm text-gray-500"><i class="fa-solid fa-location-dot mr-2"></i> Farmington Hills MI 48331</h3>
              </li>
            </ul>
            <ul className="list-none flex flex-col gap-2">
              <li>
                <h2 className=" text-xl font-semibold mb-4 ">Links</h2>
              </li>
              <li>
                <Link
                  className="text-gray-500 text-sm hover:underline hover:text-gray-400 duration-300"
                  to={"/about"}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="text-gray-500 text-sm hover:underline hover:text-gray-400 duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 text-sm hover:underline hover:text-gray-400 duration-300"
                  to={"/privacy"}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 text-sm hover:underline hover:text-gray-400 duration-300"
                  to={"/cookies-policy"}
                >
                  Cookies Policy
                </Link>
              </li>
            </ul>
            <ul className='list-none flex flex-col gap-3'>
              <li>
                <h2 className='text-xl font-semibold'>
                  Subscribe for Newsletter
                </h2>
              </li>
              <li>
                <p className=" text-sm text-gray-500">Stay updated with our Training plateform Newsletter for the latest insights!</p>
              </li>
              <li className="flex my-2 w-[50%] lg:w-auto">
                <input type="email" className="p-1 border border-blue-800 w-[100px] lg:w-auto outline-none" placeholder="Enter you email" />
                <button className="bg-blue-800 text-xs p-1 text-white">Subscribe</button>
              </li>
            </ul>
          </div>
          {/* <hr /> */}
        </div>
        <div className="py-1 bg-blue-700 w-[100%] flex sm:flex-row flex-col-reverse justify-center items-center gap-2">
          <div>
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Ecera System™. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </footer >
    </>
  );
};

export default Footer;