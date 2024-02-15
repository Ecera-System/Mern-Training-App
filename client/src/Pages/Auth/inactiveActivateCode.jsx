import React, { useState } from "react";
import axios from "axios";

const InactiveActivateCode = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [resendLoad, setResendLoad] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);

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
      } catch (err) {
        setError(
          err?.response?.data?.error ||
            "An error occurred while activating the account."
        );
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
        }
      } catch (err) {
        setError(
          err?.response?.data?.error ||
            "An error occurred while resending the code."
        );
      }
      setResendLoad(false);
    }
  };

  return (
    <div>
      <h2>Activate inactive account</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={emailDisabled} // Disable the input field when emailDisabled is true
      />
      <button onClick={handleResend} disabled={resendLoad || emailDisabled}>
        Resend Code
      </button>
      <br />
      <input
        type="text"
        placeholder="Enter activation code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        Activate Account
      </button>
      {resendSuccess && <p>{resendSuccess}</p>}
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default InactiveActivateCode;
