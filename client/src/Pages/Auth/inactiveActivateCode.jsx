import React, { useState, useContext } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { contextProvider } from "../../Context/ContextProvider"; // Import the context provider

const InactiveActivateCode = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [resendLoad, setResendLoad] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const navigate = useNavigate(); // Add the useNavigate hook
  const { showToast, toast } = useContext(contextProvider); // Access showToast and toast from the context

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code && email) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_V1_URL}/user/activate-account`,
          {
            code,
            email,
          }
        );
        setSuccess(response.data.success);
        showToast({ success: response.data.success }); // Show success message using context
        // Redirect to the sign-in page upon successful submission
        navigate("/sign-in");
      } catch (err) {
        setError(
          err?.response?.data?.error ||
            "An error occurred while activating the account."
        );
        showToast({ error: error }); // Show error message using context
      }
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendLoad) return;
    if (email) {
      setResendLoad(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_V1_URL}/user/resend-code`,
          { email }
        );
        if (response.data.acknowledged) {
          setResendSuccess("Code has been sent!");
          setEmailDisabled(true); // Disable email input field
          showToast({ success: "Code has been sent!" }); // Show resend success message using context
        }
      } catch (err) {
        setError(
          err?.response?.data?.error ||
            "An error occurred while resending the code."
        );
        showToast({ error: error }); // Show error message using context
      }
      setResendLoad(false);
    }
  };

  const handleEmailChange = (e) => {
    if (!emailDisabled) {
      setEmail(e.target.value);
    }
  };

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="sm:w-[34rem] w-11/12 relative h-auto bg-white shadow-2xl border rounded-md p-6">
        {/*  */}
        <Link
          to={"/sign-up"}
          // onClick={() => setOpenModal('')}
          className="absolute top-2 left-2 rounded-full hover:bg-violet-100 duration-300 p-1"
        >
          <IoCloseSharp className="text-4xl text-gray-700" />
        </Link>
        {/*  */}
        <h2 className="text-4xl text-center text-gray-700 font-bold pb-4">
          Activate inactive account
        </h2>
        <hr />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              disabled={emailDisabled}
              className={`w-full px-3 py-2 rounded-lg bg-white text-gray-600 border-2 text-center text-2xl tracking-widest border-violet-400 focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none ${
                emailDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ marginLeft: "8px" }} // Add left margin to the input field
            />
            <button
              onClick={handleResend}
              disabled={resendLoad}
              className="w-full px-4 py-2 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center justify-center gap-2 rounded-md mt-2 max-w-[10rem]"
            >
              Resend Code
            </button>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter 5 digit activation code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white text-gray-600 border-2 text-center text-2xl tracking-widest border-violet-400 focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full px-4 py-2 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center justify-center gap-2 rounded-md mt-2 max-w-[10rem]"
            >
              Activate Account
            </button>
          </div>
        </div>
        {/* <div className="text-center">
        {resendSuccess && <p>{resendSuccess}</p>}
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </div> */}
      </div>
    </div>
  );
};

export default InactiveActivateCode;
