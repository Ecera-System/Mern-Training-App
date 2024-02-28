// import { useContext, useEffect, useState } from "react";
// import GoogleSignIn from "./GoogleSignIn";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { contextProvider } from "../../Context/ContextProvider";
// import axios from "axios";
// import { IoCloseSharp } from "react-icons/io5";
// import { AiOutlineWarning } from "react-icons/ai";
// import Spinner from "../Shared/Spinner/Spinner";
// import ReCAPTCHA from "react-google-recaptcha";

// const SignIn = () => {
//   const { showToast, setIsLoggedIn } = useContext(contextProvider);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [formErrors, setFormErrors] = useState({});
//   const [captcha, setCaptcha] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();

//   let from = location.state?.from?.pathname || "/";

//   useEffect(() => {
//     const token = localStorage.getItem("auth_token");
//     if (token) {
//       return navigate(from, { replace: true });
//     }
//   }, [navigate, from]);

//   // <!-- onChange input -->
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // <!-- Validate form function -->
//   const validateForm = (data) => {
//     let errors = {};
//     if (!data.email) {
//       errors.email = "Email is required!";
//     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
//       errors.email = "Email is invalid!";
//     }
//     if (!data.password) {
//       errors.password = "Password is required!";
//     } else if (data.password.length < 6) {
//       errors.password = "Password must be at least 6 characters!";
//     }

//     return errors;
//   };

//   // <!-- Submit Form Data -->
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const errors = validateForm(formData);
//     if (Object.keys(errors).length === 0 && captcha) {
//       setLoading(true);
//       setFormErrors({});
//       await axios
//         .post(`${import.meta.env.VITE_API_V1_URL}/user/sign-in`, {
//           email: formData.email,
//           password: formData.password,
//         })
//         .then((res) => {
//           if (res.data.auth_token) {
//             localStorage.setItem("auth_token", res.data.auth_token);
//             showToast({
//               succuss: res?.data?.succuss,
//               error: "",
//             });
//             setIsLoggedIn(true);
//             navigate(res.data.redirect);

//             // navigate(from, { replace: true });
//           }
//         })
//         .catch((err) => {
//           showToast({
//             succuss: "",
//             error: err?.response?.data?.error,
//           });
//         });
//       setLoading(false);
//     } else if (!captcha) {
//       showToast({ error: "Captcha verification required", success: '' });
//     } else {
//       setFormErrors(errors);
//     }
//   };

//   const closeModel = () => {
//     navigate('/');
//   }

//   function onCaptchaChange(value) {
//     setCaptcha(value);
//     // console.log("Captcha value:", value);
//   }

//   return (
//     <div className="h-[60vh]">
//       {
//         loading && <Spinner />
//       }
//       <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center overflow-y-auto py-5">
//         <div className="md:w-[35rem] w-11/12 bg-black md:p-10 p-6 rounded-lg relative">
//           <div
//             onClick={closeModel}
//             className="absolute top-5 right-5 z-50 rounded-full hover:bg-violet-100 duration-300 p-1 cursor-pointer"
//           >
//             <IoCloseSharp className="text-3xl text-gray-700" />
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             style={{ textShadow: "1px 1px 1px rgb(0,0,0,0.3)" }}
//             className="w-full h-auto lg:p-16 md:px-32 md:py-16 sm:p-10 p-7 text-base text-white flex flex-col gap-6"
//           >
//             <div>
//               <h1 className="text-2xl font-semibold text-yellow-400">
//                 Sign-in to ES Training
//               </h1>
//             </div>
//             <div>
//               <label htmlFor="email" className="px-1">
//                 Email
//               </label>
//               <input
//                 onChange={handleChange}
//                 placeholder=""
//                 required
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//               />
//               {formErrors?.email && (
//                 <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
//                   <AiOutlineWarning className="text-base mt-0.5" />
//                   {formErrors?.email}
//                 </p>
//               )}
//             </div>
//             <div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="px-1">
//                   Password
//                 </label>
//               </div>
//               <input
//                 onChange={handleChange}
//                 placeholder=""
//                 required
//                 type="password"
//                 name="password"
//                 id="password"
//                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//               />
//               {formErrors?.password && (
//                 <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
//                   <AiOutlineWarning className="text-base mt-0.5" />
//                   {formErrors?.password}
//                 </p>
//               )}
//             </div>

//             <ReCAPTCHA
//               className="w-full my-5 mx-auto flex justify-center align-middle"
//               sitekey={`${import.meta.env.VITE_SITE_KEY}`} onChange={onCaptchaChange} />

//             <div className="flex justify-start">
//               <button
//                 type="submit"
//                 className="px-16 py-2.5 mt-3 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-700 flex items-center gap-2 rounded-md shadow-[0_3px_15px_rgb(124,58,237,0.5)]"
//               >
//                 Sign In
//               </button>
//             </div>
//             <span></span>

//             <p className="text-base font-light">
//               New user?
//               <Link
//                 to={'/sign-up'}
//                 className="text-yellow-400 ml-2 cursor-pointer hover:underline"
//               >
//                 Create an account
//               </Link>

//             </p>
// <Link
//   to={'/forgot-password'}
//   className="text-violet-400 hover:text-violet-400 ml-2 cursor-pointer hover:underline"
// >
//   Forgot password
// </Link>
//             <GoogleSignIn />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AiOutlineWarning } from "react-icons/ai";
// import { contextProvider } from "../../Context/ContextProvider";
// import GoogleSignIn from "./GoogleSignIn";
// import Spinner from "../Shared/Spinner/Spinner";
// import autImage from "../../../public/images/auth/login-img.png";
// import ReCAPTCHA from "react-google-recaptcha";
// import "react-phone-input-2/lib/style.css";
// //

// //

// const SignIn = () => {
//   const { showToast, setIsLoggedIn } = useContext(contextProvider);
//   const [loading, setLoading] = useState(false);
//   const [captcha, setCaptcha] = useState("");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();
//   let from = location.state?.from?.pathname || "/";

//   useEffect(() => {
//     const token = localStorage.getItem("auth_token");
//     if (token) {
//       return navigate(from, { replace: true });
//     }
//   }, [navigate, from]);

//   // <!-- onChange input -->
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // <!-- Validate form function -->
//   const validateForm = (data) => {
//     let errors = {};

//     if (!data.email) {
//       errors.email = "Email is required!";
//     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
//       errors.email = "Email is invalid!";
//     }

//     if (!data.password) {
//       errors.password = "Password is required!";
//     } else if (
//       !/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{6,}$/.test(data.password)
//     ) {
//       errors.password = "Password must be strong or at least 6 characters!";
//     }

//     return errors;
//   };

//   // <!-- Submit Form Data -->
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const errors = validateForm(formData);
//     if (Object.keys(errors).length === 0 && captcha) {
//       setLoading(true);
//       setFormErrors({});
//       await axios
//         .post(`${import.meta.env.VITE_API_V1_URL}/user/sign-in`, {
//           email: formData.email,
//           password: formData.password,
//         })
//         .then((res) => {
//           if (res.data.auth_token) {
//             localStorage.setItem("auth_token", res.data.auth_token);
//             showToast({
//               succuss: res?.data?.succuss,
//               error: "",
//             });
//             //
//             setIsLoggedIn(true);
//             //
//             navigate(res.data.redirect);

//             // navigate(from, { replace: true });
//           }
//         })
//         .catch((err) => {
//           showToast({
//             succuss: "",
//             error: err?.response?.data?.error,
//           });
//         });
//       setLoading(false);
//     } else if (!captcha) {
//       showToast({ error: "Captcha verification required", success: "" });
//     } else {
//       setFormErrors(errors);
//     }
//   };

//   function onCaptchaChange(value) {
//     setCaptcha(value);
//   }

//   return (
//     <div className="w-full h-screen flex justify-center items-center bg-violet-700">
//       <div className=" w-5/6 h-[90%] flex border shadow-2xl relative">
//         <div className="bg-violet-200 hidden md:flex justify-center items-center">
//           <img src={autImage} alt="" className="w-[450px]" />
//         </div>
//         <div className="md:w-[60%] w-[100%] bg-white ">
//           <div>
//             <Link
//               to={"/"}
//               className=" font-medium border-[2px] px-5 py-1 rounded-3xl absolute left-2 top-3 bg-violet-300 hover:bg-violet-500 hover:text-white"
//             >
//               Back
//             </Link>
//             {/* <div className="md:absolute md:w-[30%] left-[5%] bottom-4">
//               <GoogleSignIn />
//             </div> */}
//           </div>
//           <div className="w-full h-[90%] md:h-full flex flex-col justify-around items-center">
//             <div className=" w-[60%] flex justify-between items-center ">
//               <Link
//                 to={"/forgot-password"}
//                 className="text-violet-400 hover:text-violet-400 ml-2 cursor-pointer hover:underline"
//               >
//                 Forgot password
//               </Link>
//               <div>
//                 <p className=" text-stone-500 inline ">New User?</p>
//                 <Link
//                   className=" w-[38%] md:w-fit text-sm font-semibold px-3 py-1 border rounded-2xl mx-3 hover:bg-violet-200 "
//                   to={"/sign-up"}
//                 >
//                   SIGN UP
//                 </Link>
//               </div>
//             </div>
//             {/*  */}
//             <div className=" w-[60%] flex justify-between items-center ">
//               <Link
//                 className="text-stone-500 hover:text-violet-400 hover:underline"
//                 to={"/inactive-activateCode"} // Adjust the path accordingly
//               >
//                 Activate Account
//               </Link>
//             </div>
//             {/*  */}
//             <div className=" w-[60%] ">
//               <h1 className=" text-2xl font-bold ">
//                 Welcome to Ecera Training
//               </h1>
//               <h3 className=" text-stone-400 ">Login to your account</h3>
//             </div>
//             <div className=" w-[60%]">
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <input
//                     className=" w-full border border-stone-500 rounded-3xl px-5 py-1.5 text-violet-600 outline-violet-500 "
//                     onChange={handleChange}
//                     name="email"
//                     type="email"
//                     placeholder="Enter your Email"
//                   />
//                   <div className=" h-6 ">
//                     {formErrors?.email && (
//                       <p className="relative top-0 text-sm font-semibold text-red-400 flex gap-2 items-start">
//                         <AiOutlineWarning className="text-base mt-0.5" />
//                         {formErrors?.email}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="">
//                   <input
//                     onChange={handleChange}
//                     name="password"
//                     className=" w-full border border-stone-500 rounded-3xl px-5 py-1.5 text-violet-600 outline-violet-500"
//                     type="password"
//                     placeholder="Enter your Password"
//                   />
//                   <div className="h-6">
//                     {formErrors?.password && (
//                       <p className="relative top-0 text-sm font-semibold text-red-400 flex gap-2 items-start">
//                         <AiOutlineWarning className="text-base mt-0.5" />
//                         {formErrors?.password}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 {/* <div>
//                   <ReCAPTCHA
//                     className="w-full my-5 mb-8"
//                     sitekey={`${import.meta.env.VITE_SITE_KEY}`}
//                     onChange={onCaptchaChange}
//                   />
//                 </div> */}
//                 <div className="flex justify-start">
//                   <button
//                     className="font-semibold px-5 py-1.5 rounded-lg border-violet-600  text-white bg-violet-600 hover:bg-violet-800 border"
//                     type="submit"
//                   >
//                     Login
//                   </button>
//                   <Link
//                     to={"/"}
//                     className="font-semibold px-5 py-1.5 rounded-lg text-violet-600 border-violet-600 hover:bg-violet-600 border hover:text-white mx-3"
//                   >
//                     Cancel
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {loading && <Spinner />}
//     </div>
//   );
// };

// export default SignIn;
//
//
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";
import { contextProvider } from "../../Context/ContextProvider";
import GoogleSignIn from "./GoogleSignIn";
import Spinner from "../Shared/Spinner/Spinner";
import autImage from "../../../public/images/auth/login-img.png";
// import ReCAPTCHA from "react-google-recaptcha";
import "react-phone-input-2/lib/style.css";
//

//

const SignIn = () => {
  const { showToast, setIsLoggedIn } = useContext(contextProvider);
  const [loading, setLoading] = useState(false);
  // const [captcha, setCaptcha] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!data.email) {
      errors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid!";
    }

    if (!data.password) {
      errors.password = "Password is required!";
    } else if (
      !/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{6,}$/.test(data.password)
    ) {
      errors.password = "Password must be strong or at least 6 characters!";
    }

    return errors;
  };

  // <!-- Submit Form Data -->
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    // if (Object.keys(errors).length === 0 && captcha) {
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      setFormErrors({});
      await axios
        .post(`${import.meta.env.VITE_API_V1_URL}/user/sign-in`, {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          if (res.data.auth_token) {
            localStorage.setItem("auth_token", res.data.auth_token);
            showToast({
              succuss: res?.data?.succuss,
              error: "",
            });
            //
            setIsLoggedIn(true);
            //
            navigate(res.data.redirect);

            // navigate(from, { replace: true });
          }
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

  // function onCaptchaChange(value) {
  //   setCaptcha(value);
  // }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-violet-700">
      <div className=" w-5/6 h-[90%] flex border shadow-2xl relative">
        <div className="bg-violet-200 hidden md:flex justify-center items-center">
          <img src={autImage} alt="" className="w-[450px]" />
        </div>
        <div className="md:w-[60%] w-[100%] bg-white ">
          <div>
            <Link
              to={"/"}
              className=" font-medium border-[2px] px-5 py-1 rounded-3xl absolute left-2 top-3 bg-violet-300 hover:bg-violet-500 hover:text-white"
            >
              Back
            </Link>
            {/* <div className="md:absolute md:w-[30%] left-[5%] bottom-4">
              <GoogleSignIn />
            </div> */}
          </div>
          <div className="w-full h-[90%] md:h-full flex flex-col justify-around items-center">
            <div className=" w-[60%] flex justify-between items-center ">
              <Link
                to={"/forgot-password"}
                className="text-violet-400 hover:text-violet-400 ml-2 cursor-pointer hover:underline"
              >
                Forgot password
              </Link>
              <div>
                <p className=" text-stone-500 inline ">New User?</p>
                <Link
                  className=" w-[38%] md:w-fit text-sm font-semibold px-3 py-1 border rounded-2xl mx-3 hover:bg-violet-200 "
                  to={"/sign-up"}
                >
                  SIGN UP
                </Link>
              </div>
            </div>
            {/*  */}
            <div className=" w-[60%] flex justify-between items-center ">
              <Link
                className="text-stone-500 hover:text-violet-400 hover:underline"
                to={"/inactive-activateCode"} // Adjust the path accordingly
              >
                Activate Account
              </Link>
            </div>
            {/*  */}
            <div className=" w-[60%] ">
              <h1 className=" text-2xl font-bold ">
                Welcome to Ecera Training
              </h1>
              <h3 className=" text-stone-400 ">Login to your account</h3>
            </div>
            <div className=" w-[60%]">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className=" w-full border border-stone-500 rounded-3xl px-5 py-1.5 text-violet-600 outline-violet-500 "
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                  />
                  <div className=" h-6 ">
                    {formErrors?.email && (
                      <p className="relative top-0 text-sm font-semibold text-red-400 flex gap-2 items-start">
                        <AiOutlineWarning className="text-base mt-0.5" />
                        {formErrors?.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="">
                  <input
                    onChange={handleChange}
                    name="password"
                    className=" w-full border border-stone-500 rounded-3xl px-5 py-1.5 text-violet-600 outline-violet-500"
                    type="password"
                    placeholder="Enter your Password"
                  />
                  <div className="h-6">
                    {formErrors?.password && (
                      <p className="relative top-0 text-sm font-semibold text-red-400 flex gap-2 items-start">
                        <AiOutlineWarning className="text-base mt-0.5" />
                        {formErrors?.password}
                      </p>
                    )}
                  </div>
                </div>
                {/* <div>
                  <ReCAPTCHA
                    className="w-full my-5 mb-8"
                    sitekey={`${import.meta.env.VITE_SITE_KEY}`}
                    onChange={onCaptchaChange}
                  />
                </div> */}
                <div className="flex justify-start">
                  <button
                    className="font-semibold px-5 py-1.5 rounded-lg border-violet-600  text-white bg-violet-600 hover:bg-violet-800 border"
                    type="submit"
                  >
                    Login
                  </button>
                  <Link
                    to={"/"}
                    className="font-semibold px-5 py-1.5 rounded-lg text-violet-600 border-violet-600 hover:bg-violet-600 border hover:text-white mx-3"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default SignIn;
