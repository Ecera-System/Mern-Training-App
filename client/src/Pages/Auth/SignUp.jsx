// import  { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { MdOutlineArrowBackIosNew } from 'react-icons/md'
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiOutlineWarning } from 'react-icons/ai';
// import { contextProvider } from '../../Context/ContextProvider';
// import ActivateCode from './ActivateCode';
// import Spinner from '../Shared/Spinner/Spinner';
// import GoogleSignIn from './GoogleSignIn';

// const SignUp = () => {
// const { showToast } = useContext(contextProvider);
// const [loading, setLoading] = useState(false);

// const [openModal, setOpenModal] = useState('');
// const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contactNumber: '',
//     password: '',
//     confirmPassword: ''
// });
// const [formErrors, setFormErrors] = useState({});
// const navigate = useNavigate();
// const location = useLocation();
// let from = location.state?.from?.pathname || "/";

// useEffect(() => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//         return navigate(from, { replace: true });
//     }
// }, [navigate, from]);

// // <!-- onChange input -->
// const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//         ...formData,
//         [name]: value
//     });
// };

// // <!-- Validate form function -->
// const validateForm = (data) => {
//     let errors = {};

//     if (!data.name) {
//         errors.name = 'Name is required!';
//     }

//     if (!data.email) {
//         errors.email = 'Email is required!';
//     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
//         errors.email = 'Email is invalid!';
//     }

//     if (!data.contactNumber) {
//         errors.contactNumber = 'Contact Number is required!';
//     } else if (!/^-?\d+\.?\d*$/.test(data.contactNumber)) {
//         errors.contactNumber = 'Contact Number is invalid!';
//     }

//     if (!data.password) {
//         errors.password = 'Password is required!';
//     } else if (!/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{6,}$/.test(data.password)) {
//         errors.password = 'Password must be strong or at least 6 characters!';
//     }

//     if (!data.confirmPassword) {
//         errors.confirmPassword = 'Confirm Password is required!';
//     } else if (data.confirmPassword !== data.password) {
//         errors.confirmPassword = 'Confirm Password does not match Password!';
//     }

//     return errors;
// };

// // <!-- Submit Form Data -->
// const handleSubmit = async (event) => {
//     event.preventDefault();
//     const errors = validateForm(formData);
//     if (Object.keys(errors).length === 0) {
//         setFormErrors({});
//         setLoading(true);
//         await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/sign-up`, {
//             name: formData.name,
//             contactNumber: formData.contactNumber,
//             email: formData.email,
//             password: formData.password,
//         })
//             .then(res => {
//                 res.data && setOpenModal(res.data);
//             })
//             .catch(err => {
//                 showToast({
//                     succuss: '', error: err?.response?.data?.error,
//                 });
//             });
//         setLoading(false);
//     } else {
//         setFormErrors(errors);
//     }
// };

//     return (<>
//         {/* <PageTitle title="Sign Up" /> */}
//         <div
//             style={{ backgroundImage: `url(/images/auth/auth_bg.jpg)` }}
//             className='w-screen max-w-full h-screen overflow-y-auto bg-no-repeat bg-center bg-cover grid lg:grid-cols-2 grid-cols-1 items-center relative'
//         >
//             <div className='absolute top-10 left-5 z-50 lg:block hidden'>
//                 <button
//                     onClick={() => navigate(-1)}
//                     className='flex items-center gap-2 border rounded px-3 py-1 text-white hover:bg-white hover:text-gray-700 duration-300'
//                 >
//                     <MdOutlineArrowBackIosNew />
//                     Back
//                 </button>
//             </div>
//             <div className='w-full h-auto p-16 lg:block hidden'>
//                 <img src="/Images/Auth/login-img.png" alt="" className='' />
//             </div>
//             <div className='w-full lg:h-screen h-full overflow-y-auto backdrop-blur-sm bg-violet-100/10 grid place-items-center'>
//                 <form
//                     onSubmit={handleSubmit}
//                     style={{ textShadow: '1px 1px 1px rgb(0,0,0,0.3)' }}
//                     className='w-full h-auto lg:p-16 md:px-32 md:py-16 sm:p-10 p-7 text-base text-white flex flex-col gap-6'
//                 >
//                     <div>
//                         <h1 className='text-3xl font-semibold'>
//                             Sign up to ES Training
//                         </h1>
//                     </div>
//                     <div>
//                         <label htmlFor='name' className="px-1">Full Name</label>
//                         <input
//                             onChange={handleChange}
//                             placeholder=""
//                             type="text" name='name' id='name'
//                             className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//                         />
//                         {
//                             formErrors?.name &&
//                             <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
//                                 <AiOutlineWarning className="text-base mt-0.5" />
//                                 {formErrors?.name}
//                             </p>
//                         }
//                     </div>
//                     <div>
//                         <label htmlFor='email' className="px-1">Email</label>
//                         <input
//                             type="email"
//                             name='email' id='email'
//                             className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//                             onChange={handleChange}
//                         />
//                         {
//                             formErrors?.email &&
//                             <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
//                                 <AiOutlineWarning className="text-base mt-0.5" />
//                                 {formErrors?.email}
//                             </p>
//                         }
//                     </div>
//                     <div>
//                         <label htmlFor='contact' className="px-1 mb-2 block">Contact Number</label>
//                         <input
//                             type='text'
//                             id='contact' name="contactNumber"
//                             className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//                             onChange={handleChange}
//                         />
//                         {
//                             formErrors?.contactNumber &&
//                             <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
//                                 <AiOutlineWarning className="text-base mt-0.5" />
//                                 {formErrors?.contactNumber}
//                             </p>
//                         }
//                     </div>
//                     <div className='grid md:grid-cols-2 grid-cols-1 items-start gap-5'>
//                         <div>
//                             <label htmlFor='password' className="px-1">Password</label>
//                             <input
//                                 placeholder=""
//                                 type="password" name='password' id='password'
//                                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//                                 onChange={handleChange}
//                             />
//                             {
//                                 formErrors?.password &&
//                                 <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
//                                     <AiOutlineWarning className="text-base mt-0.5" />
//                                     {formErrors?.password}
//                                 </p>
//                             }
//                         </div>
//                         <div>
//                             <label htmlFor='confirmPassword' className="px-1">Confirm Password</label>
//                             <input
//                                 placeholder=""
//                                 type="password" name='confirmPassword' id='confirmPassword'
//                                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//                                 onChange={handleChange}
//                             />
//                             {
//                                 formErrors?.confirmPassword &&
//                                 <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
//                                     <AiOutlineWarning className="text-base mt-0.5" />
//                                     {formErrors?.confirmPassword}
//                                 </p>
//                             }
//                         </div>
//                     </div>
//                     <div className='flex justify-start'>
//                         <button
//                             type='submit'
//                             className='px-16 py-2.5 mt-3 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-700 flex items-center gap-2 rounded-md shadow-[0_3px_15px_rgb(124,58,237,0.5)]'
//                         >
//                             Sign Up
//                         </button>

//                     </div>
//                     <p className='text-base font-light mt-3'>
//                         Already have an account?
//                         <Link
//                             to='/sign-in'
//                             className='text-yellow-400 ml-2 hover:underline'
//                         >
//                             Sign In
//                         </Link>
//                     </p>
//                     <GoogleSignIn />
//                 </form>
//             </div>
//         </div>
//         <ActivateCode
//             openModal={openModal}
//             setOpenModal={setOpenModal}
//         />
//         {
//             loading && <Spinner />
//         }
//     </>);
// };

// export default SignUp;
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AiOutlineWarning } from "react-icons/ai";
import { contextProvider } from "../../Context/ContextProvider";
import GoogleSignIn from "./GoogleSignIn";
import { IoCloseSharp } from "react-icons/io5";
import SignIn from "./SignIn";
import Spinner from "../Shared/Spinner/Spinner";

const SignUp = ({ setSignUpPopUp }) => {
  const { showToast } = useContext(contextProvider);
  const [loading, setLoading] = useState(false);
  const [signInPopUp, setSignInPopUp] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return navigate(from, { replace: true });
    }
  }, [navigate, from]);

  // <!-- onChange input -->
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // <!-- Validate form function -->
  const validateForm = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = "Name is required!";
    }

    if (!data.email) {
      errors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid!";
    }

    if (!data.contactNumber) {
      errors.contactNumber = "Contact Number is required!";
    } else if (!/^-?\d+\.?\d*$/.test(data.contactNumber)) {
      errors.contactNumber = "Contact Number is invalid!";
    }

    if (!data.password) {
      errors.password = "Password is required!";
    } else if (
      !/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{6,}$/.test(data.password)
    ) {
      errors.password = "Password must be strong or at least 6 characters!";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required!";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Confirm Password does not match Password!";
    }

    return errors;
  };

  // <!-- Submit Form Data -->
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      setLoading(true);
      await axios
        .post(`${import.meta.env.VITE_API_V1_URL}/user/sign-up`, {
          name: formData.name,
          contactNumber: formData.contactNumber,
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          res.data && setOpenModal(res.data);

          const queryParams = new URLSearchParams({
            email: formData.email,
          });

          navigate(`/activateCode?${queryParams.toString()}`);
        })
        .catch((err) => {
          showToast({
            succuss: "",
            error: err?.response?.data?.error,
          });
        });
      setLoading(false);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      {/* <PageTitle title="Sign Up" /> */}
      <div className="h-[80vh]">
        <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center overflow-y-auto py-5">
          <div className="md:w-[35rem] w-11/12 bg-black md:p-10 p-6 rounded-lg relative">
            {/* Close btn */}
            <div
              onClick={() => setSignUpPopUp(false)}
              className="absolute top-5 right-5 z-50 rounded-full hover:bg-violet-100 duration-300 p-1 cursor-pointer"
            >
              <IoCloseSharp className="text-3xl text-gray-700" />
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ textShadow: "1px 1px 1px rgb(0,0,0,0.3)" }}
              className="w-full h-auto lg:p-16 md:px-32 md:py-16 sm:p-10 p-7 text-base text-white flex flex-col gap-6"
            >
              <div>
                <h1 className="text-2xl font-semibold text-yellow-400">
                  Sign up to ES Training
                </h1>
              </div>
              <div>
                <label htmlFor="name" className="px-1">
                  Full Name
                </label>
                <input
                  onChange={handleChange}
                  placeholder=""
                  type="text"
                  name="name"
                  id="name"
                  className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                />
                {formErrors?.name && (
                  <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
                    <AiOutlineWarning className="text-base mt-0.5" />
                    {formErrors?.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="px-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                  onChange={handleChange}
                />
                {formErrors?.email && (
                  <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
                    <AiOutlineWarning className="text-base mt-0.5" />
                    {formErrors?.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact" className="px-1 mb-2 block">
                  Contact Number
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) =>
                      setFormData({ ...formData, countryCode: e.target.value })
                    }
                    className="block mt-2 px-3 py-2 rounded-lg w-32 bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
                  >
                    <option value="">Country Code</option>
                    <option value="+1">United States (+1)</option>
                    <option value="+91">India (+91)</option>
                    <option value="+44">United Kingdom (+44)</option>
                    <option value="+49">Germany (+49)</option>
                    <option value="+33">France (+33)</option>
                    <option value="+81">Japan (+81)</option>
                    <option value="+86">China (+86)</option>
                    <option value="+7">Russia (+7)</option>
                    {/* Add more countries as needed */}
                  </select>
                  <input
                    type="text"
                    id="contact"
                    name="contactNumber"
                    className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                    onChange={handleChange}
                  />
                </div>
                {formErrors?.contactNumber && (
                  <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
                    <AiOutlineWarning className="text-base mt-0.5" />
                    {formErrors?.contactNumber}
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 items-start gap-5">
                <div>
                  <label htmlFor="password" className="px-1">
                    Password
                  </label>
                  <input
                    placeholder=""
                    type="password"
                    name="password"
                    id="password"
                    className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                    onChange={handleChange}
                  />
                  {formErrors?.password && (
                    <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
                      <AiOutlineWarning className="text-base mt-0.5" />
                      {formErrors?.password}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="px-1">
                    Confirm Password
                  </label>
                  <input
                    placeholder=""
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                    onChange={handleChange}
                  />
                  {formErrors?.confirmPassword && (
                    <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
                      <AiOutlineWarning className="text-base mt-0.5" />
                      {formErrors?.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="px-16 py-2.5 mt-3 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-700 flex items-center gap-2 rounded-md shadow-[0_3px_15px_rgb(124,58,237,0.5)]"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-base font-light">
                Already have an account?
                <Link
                  onClick={() => setSignInPopUp(true)}
                  className="text-yellow-400 ml-2 hover:underline"
                >
                  Sign In
                </Link>
                {signInPopUp && (
                  <SignIn
                    signInPopUp={signInPopUp}
                    setSignInPopUp={setSignInPopUp}
                  />
                )}
              </p>
              <GoogleSignIn />
            </form>
          </div>
        </div>
      </div>

      {loading && <Spinner />}
    </>
  );
};
SignUp.propTypes = {
  setSignUpPopUp: PropTypes.func.isRequired,
};

export default SignUp;
