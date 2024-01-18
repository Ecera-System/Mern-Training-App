import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";
import { contextProvider } from "../../Context/ContextProvider";
import GoogleSignIn from "./GoogleSignIn";
import Spinner from "../Shared/Spinner/Spinner";
import autImage from "../../../public/images/auth/login-img.png";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignUp = () => {
  const { showToast } = useContext(contextProvider);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "",
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
    }

    if (!data.countryCode) {
      errors.contactNumber = "Country code is required!";
    }

    if (!data.password && !data.confirmPassword) {
      errors.password = "Password and confirm password is required!";
    } 
    else if (!data.password) {
      errors.password = "Password is required!";
    } else if (
      !/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{6,}$/.test(data.password)
    ) {
      errors.password = "Password must be strong or at least 6 characters!";
    } else if (!data.confirmPassword) {
      errors.password = "Confirm Password is required!";
    } else if (data.confirmPassword !== data.password) {
      errors.password = "Confirm Password does not match Password!";
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
          countryCode: formData.countryCode,
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          res.data && showToast({
            succuss: "Verification code sent to your mail successfully",
            error: "",
          });

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

  const handlePhoneChange = (phone, country) => {
    setFormData({...formData, contactNumber: phone, countryCode: country.dialCode})
  }

  return (
    <div
      // style={{backgroundImage: 'url(../../../public/images/auth/auth_bg.jpg)'}}
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
            <div className=" w-[95%] flex justify-end items-center ">
              <p className=" text-stone-500 ">
                Already have an Account?</p>
              <Link className=" w-[38%] md:w-fit text-sm font-semibold px-3 py-1 border rounded-2xl mx-3 hover:bg-violet-200 "
                to={"/sign-in"}>SIGN IN</Link>
            </div>
            <div className=" w-[80%] md:w-[60%] ">
              <h1 className=" text-2xl font-bold ">
                Welcome to Ecera Training</h1>
              <h3 className=" text-stone-400 ">
                Register your account</h3>
            </div>
            <div className=" w-[80%] md:w-[60%]">
              <form onSubmit={handleSubmit}>
                <div className=" " >
                  <input
                    className=" w-full border border-stone-500 rounded-3xl px-5 py-1.5 text-violet-600 outline-violet-500 "
                    type="text" onChange={handleChange} name="name" placeholder="Enter your Name" />
                  <div className="h-6" >
                    {formErrors?.name && (
                      <p className="relative top-0 text-sm font-semibold text-red-400 flex gap-2 items-start">
                        <AiOutlineWarning className="text-base mt-0.5" />
                        {formErrors?.name}
                      </p>
                    )}
                  </div>
                </div>
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
                <div>
                <ReactPhoneInput
                type='tel'
                defaultCountry='in'
                inputClass='phone-input'
                inputProps={{
                  required: true,
                  style: {
                    width: '100%',
                    color: '#5f07a3',
                    padding: '10px',
                    paddingLeft: "40px",
                    height: '38px',
                    borderColor: '#454441',
                    borderRadius: '50px',
                    outline: '#5f07a3'
                  },
                }}
                name='contactNumber'
                onChange={handlePhoneChange}
                containerClass='containerCl'
                buttonClass='btnCl'
                searchClass='searchCl'

                buttonStyle={{ backgroundColor: 'transparent', borderRight: 'none', borderColor: '#454441', borderRadius: '50px 0 0 50px' }}
                containerStyle={{ color: 'black', border: 'none'}}

                country={'in'}
                placeholder='Phone number'
              />
                  <div className="h-6" >
                    {formErrors?.contactNumber && (
                      <p className="relative top-0 text-sm font-semibold text-red-400 flex gap-2 items-start">
                        <AiOutlineWarning className="text-base mt-0.5" />
                        {formErrors?.contactNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex flex-col md:flex-row justify-between">
                    <input
                      onChange={handleChange} name="password"
                      className=" md:w-[47%] mb-2 md:mb-0 border border-stone-500 rounded-3xl px-5 py-1.5 text-violet-600 outline-violet-500 "
                      type="text" placeholder="Password" />
                    <input
                    onChange={handleChange} name="confirmPassword"
                      className=" md:w-[47%] border border-stone-500 rounded-3xl px-4 py-1.5 text-violet-600 outline-violet-500 "
                      type="text" placeholder="Confirm Password" />
                  </div>
                  <div className="h-6" >
                    {formErrors?.password && (
                      <p className="relative top-0 text-sm font-semibold text-red-400 flex gap-2 items-start">
                        <AiOutlineWarning className="text-base mt-0.5" />
                        {formErrors?.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-start">
                  <button className="font-semibold px-4 py-1.5 rounded-lg border-violet-600  text-white bg-violet-600 hover:bg-violet-800 border"
                   type="submit">Register</button>
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

export default SignUp;