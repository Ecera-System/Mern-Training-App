
import { useContext, useEffect, useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { contextProvider } from "../../Context/ContextProvider";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineWarning } from "react-icons/ai";
import PropTypes from "prop-types";
import ForgotPassword from "./ForgotPassword";

import SignUp from "./SignUp";
import Spinner from "../Shared/Spinner/Spinner";
const SignIn = () => {
  const { showToast, setIsLoggedIn } = useContext(contextProvider);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters!";
    }

    return errors;
  };

  // <!-- Submit Form Data -->
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
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
            setIsLoggedIn(true);
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

  const closeModel = () =>{
    navigate('/');
  }

  return (
    <div className="h-[60vh]">
      {
        loading && <Spinner />
      }
      <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center overflow-y-auto py-5">
        <div className="md:w-[35rem] w-11/12 bg-black md:p-10 p-6 rounded-lg relative">
          <div
            onClick={closeModel}
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
                Sign-in to ES Training
              </h1>
            </div>
            <div>
              <label htmlFor="email" className="px-1">
                Email
              </label>
              <input
                onChange={handleChange}
                placeholder=""
                required
                type="email"
                name="email"
                id="email"
                className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.email && (
                <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
                  <AiOutlineWarning className="text-base mt-0.5" />
                  {formErrors?.email}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="px-1">
                  Password
                </label>
              </div>
              <input
                onChange={handleChange}
                placeholder=""
                required
                type="password"
                name="password"
                id="password"
                className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.password && (
                <p className="relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start">
                  <AiOutlineWarning className="text-base mt-0.5" />
                  {formErrors?.password}
                </p>
              )}
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="px-16 py-2.5 mt-3 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-700 flex items-center gap-2 rounded-md shadow-[0_3px_15px_rgb(124,58,237,0.5)]"
              >
                Sign In
              </button>
            </div>
            <span></span>

            <p className="text-base font-light">
              New user?
              <Link
                to={'/sign-up'}
                className="text-yellow-400 ml-2 cursor-pointer hover:underline"
              >
                Create an account
              </Link>
            
            </p>
            <Link
                to={'/forgot-password'}
                className="text-violet-400 hover:text-violet-400 ml-2 cursor-pointer hover:underline"
              >
                Forgot password
              </Link>
            <GoogleSignIn />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
