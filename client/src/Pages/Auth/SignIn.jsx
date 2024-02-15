
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";
import { contextProvider } from "../../Context/ContextProvider";
import GoogleSignIn from "./GoogleSignIn";
import Spinner from "../Shared/Spinner/Spinner";
import autImage from "../../../public/images/auth/login-img.png";
import ReCAPTCHA from "react-google-recaptcha";
import "react-phone-input-2/lib/style.css";

const SignIn = () => {
  const { showToast } = useContext(contextProvider);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState('');
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
    if (Object.keys(errors).length === 0 && captcha) {
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
    } else if (!captcha) {
      showToast({ error: "Captcha verification required", success: '' });
    } else {
      setFormErrors(errors);
    }
  };

  function onCaptchaChange(value) {
    setCaptcha(value);
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-violet-700"
    >
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
            <div className="md:absolute md:w-[30%] left-[5%] bottom-4">
              <GoogleSignIn />
            </div>
          </div>
          <div className="w-full h-[90%] md:h-full flex flex-col justify-around items-center">
            <div className=" w-[60%] flex justify-between items-center ">
              <Link
                to={'/forgot-password'}
                className="text-violet-400 hover:text-violet-400 ml-2 cursor-pointer hover:underline"
              >
                Forgot password
              </Link>
              <div>
                <p className=" text-stone-500 inline ">
                  New User?</p>
                <Link className=" w-[38%] md:w-fit text-sm font-semibold px-3 py-1 border rounded-2xl mx-3 hover:bg-violet-200 "
                  to={"/sign-up"}>SIGN UP</Link>
              </div>
            </div>
            <div className=" w-[60%] ">
              <h1 className=" text-2xl font-bold ">
                Welcome to Ecera Training</h1>
              <h3 className=" text-stone-400 ">
                Login to your account</h3>
            </div>
            <div className=" w-[60%]">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className=" w-full border border-stone-500 rounded-3xl px-5 py-1.5 text-violet-600 outline-violet-500 "
                    onChange={handleChange} name="email"
                    type="email" placeholder="Enter your Email" />
                  <div className=" h-6 " >
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
                    onChange={handleChange} name="password"
                    className=" w-full border border-stone-500 rounded-3xl px-5 py-1.5 text-violet-600 outline-violet-500"
                    type="password" placeholder="Enter your Password" />
                  <div className="h-6" >
                    {formErrors?.password && (
                      <p className="relative top-0 text-sm font-semibold text-red-400 flex gap-2 items-start">
                        <AiOutlineWarning className="text-base mt-0.5" />
                        {formErrors?.password}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <ReCAPTCHA
                    className="w-full my-5 mb-8"
                    sitekey={`${import.meta.env.VITE_SITE_KEY}`} onChange={onCaptchaChange} />
                </div>
                <div className="flex justify-start">
                  <button className="font-semibold px-5 py-1.5 rounded-lg border-violet-600  text-white bg-violet-600 hover:bg-violet-800 border"
                    type="submit">Login</button>
                  <Link to={'/'} className="font-semibold px-5 py-1.5 rounded-lg text-violet-600 border-violet-600 hover:bg-violet-600 border hover:text-white mx-3" >
                    Cancel</Link>
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