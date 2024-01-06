import React, { useState, useContext } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Pages/Shared/Spinner/Spinner";
import { contextProvider } from "../../Context/ContextProvider";
import PageTitle from "../../Pages/Shared/PageTitle";


const StoreEnvVariables = ({ showInfo }) => {

  const { showToast } = useContext(contextProvider);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    smtpUser: "",
    smtpPassword: "",
    senderEmail: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.smtpUser) {
      errors.smtpUser = "SMTP User is required!";
    }
    if (!data.smtpPassword) {
      errors.smtpPassword = "SMTP Password is required!";
    }
    if (!data.senderEmail) {
      errors.senderEmail = "Sender Email is required!";
    }

    return errors;
  };

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {

        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_V1_URL}/admin/add-env-variables`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("auth_token"),
            },
          }
        );

        // Check if the update was successful
        if (response.data.success) {

          showToast({
            error: '', success: 'Env Variable stored successfully'
          })

          showInfo(true)
        } else {
          // Handle the case where the update was not successful
          showToast({
            success: '', error: 'Env Variable has not stored please try again'
          })

        }
      } catch (error) {

        showToast({
          success: '', error: error.response.data.error
        })
      }
    } else {
      setFormErrors(errors);
    }
    setLoading(false);
  };


  return (
    <div className="my-5 w-full bg-white text-gray-600">
      <PageTitle title='Env variables' />
      <form className="w-full border rounded-lg">
        <h1 className="text-xl font-bold text-black-700 p-5 border-b">
          Environment Variables
        </h1>

        <div className="w-full p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6">
            <div className="w-full">
              <label htmlFor="smtp-user" className="px-1 font-bold">
                SMTP User
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter SMTP User"
                type="text"
                name="smtpUser"
                id="smtp-user"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.smtpUser && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.smtpUser}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="smtp-password" className="px-1 font-bold">
                SMTP Password
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter SMTP Password"
                type="text"
                name="smtpPassword"
                id="smtp-password"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.smtpPassword && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.smtpPassword}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="sender-email" className="px-1 font-bold">
                Sender Email
              </label>
              <input
                onChange={handleChange}
                placeholder="Enter sender email"
                type="text"
                name="senderEmail"
                id="sender-email"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.senderEmail && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.senderEmail}
                </p>
              )}
            </div>
          </div>
        </ div>
        <div className="w-full flex justify-end items-end gap-6 my-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-max mx-8 px-10 py-3 mb-3 text-base font-medium bg-white border border-violet-500 hover:bg-violet-500 duration-300 hover:text-white text-violet-800 flex items-center gap-2 rounded"
          >
            Proceed
          </button>
        </div>
      </form>
      {
        loading &&
        <Spinner />
      }
    </div>
  );
};

export default StoreEnvVariables;