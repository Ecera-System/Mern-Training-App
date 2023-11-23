import React, { useState, useEffect } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CountryList from "../../Shared/CountryList"; // Update the path here
import { Country, State, City } from "country-state-city";
import axios from "axios";
import useGetProfile from "../../../API/useGetProfile"; // Import the useGetProfile hook

const BillingAddress = () => {
  //
  const [profileData, loading, fetchProfileData] = useGetProfile(); // Use the hook

  useEffect(() => {
    console.log("Profile Data:", profileData);
  }, [profileData]);
  //
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zip: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [countryData, setCountryData] = useState({
    country: "",
    state: "",
    city: "",
  });
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
    if (!data.firstName) {
      errors.firstName = "First-name is required!";
    }
    if (!data.lastName) {
      errors.lastName = "Last-name is required!";
    }
    if (!data.contactNumber) {
      errors.contactNumber = "Contact Number is required!";
    } else if (!/^-?\d+\.?\d*$/.test(data.contactNumber)) {
      errors.contactNumber = "Invalid contact number!";
    }
    if (!data.address1) {
      errors.address1 = "Address is required!";
    }
    if (!data.country) {
      errors.country = "Please select a country!";
    }
    if (!data.state) {
      errors.state = "Please select a state!";
    }
    if (!data.city) {
      errors.city = "City is required!";
    }
    if (!data.zip) {
      errors.zip = "Zip is required!";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        // Assuming your API endpoint for updating the billing address is '/profile/:id'
        const response = await axios.patch(
          `${import.meta.env.VITE_API_V1_URL}/profile/${profileData._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: localStorage.getItem("auth_token"),
            },
          },
          {
            update: "address", // Indicates that we are updating the address
            country: formData.country,
            city: formData.city,
            address1: formData.address1,
            zip: formData.zip,
          }
        );

        // Check if the update was successful
        if (response.data.success) {
          // Optionally, you can do something after a successful update, such as navigating to another page
          console.log("Billing address updated successfully!");
          navigate(`/profile/course`);
        } else {
          // Handle the case where the update was not successful
          console.error("Failed to update billing address");
        }
      } catch (error) {
        console.error("Error updating billing address:", error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="my-5 w-full bg-white text-gray-600">
      <form className="w-full border rounded-lg">
        <h1 className="text-xl font-bold text-black-700 p-5 border-b">
          Billing Address
        </h1>

        <div className="w-full p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6">
            <div className="w-full">
              <label htmlFor="first-name" className="px-1 font-bold">
                First Name
              </label>
              <input
                onChange={handleChange}
                placeholder=""
                type="text"
                name="firstName"
                id="first-name"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.firstName && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.firstName}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="contactNumber" className="px-1 font-bold">
                Last Name
              </label>
              <input
                onChange={handleChange}
                placeholder=""
                type="text"
                name="lastName"
                id="last-name"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.lastName && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6">
            <div className="w-full">
              <label htmlFor="address1" className="px-1 font-bold">
                Address Line 1
              </label>
              <input
                onChange={handleChange}
                placeholder=""
                type="text"
                name="address1"
                id="address1"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.address1 && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.address1}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="address2" className="px-1 font-bold">
                Address Line 2 (optional)
              </label>
              <input
                onChange={handleChange}
                placeholder=""
                type="text"
                name="address2"
                id="address2"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.address2 && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.address2}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6">
            <div className="w-full">
              <label htmlFor="country" className="px-1 font-bold">
                Country
              </label>
              <select
                required
                name="country"
                value={countryData.country}
                onChange={(e) => {
                  handleChange(e);
                  setCountryData({ ...countryData, country: e.target.value });
                }}
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              >
                <option value={""}>Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {formErrors?.country && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.country}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="state" className="px-1 font-bold">
                State
              </label>
              <select
                required
                name="state"
                value={countryData.state}
                onChange={(e) => {
                  handleChange(e);
                  setCountryData({ ...countryData, state: e.target.value });
                }}
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              >
                <option key={""} value={""}>
                  State
                </option>
                {State &&
                  State.getStatesOfCountry(countryData.country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {formErrors?.state && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.state}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="city" className="px-1 font-bold">
                City
              </label>
              <select
                required
                name="city"
                value={countryData.city}
                onChange={(e) => {
                  handleChange(e);
                  setCountryData({ ...countryData, city: e.target.value });
                }}
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              >
                <option key={""} value={""}>
                  City
                </option>
                {City &&
                  City.getCitiesOfState(
                    countryData.country,
                    countryData.state
                  ).map((item, i) => (
                    <option key={i} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {formErrors?.city && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.city}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6">
            <div className="w-full">
              <label htmlFor="zip" className="px-1 font-bold">
                Zip/Postal Code
              </label>
              <input
                onChange={handleChange}
                placeholder=""
                type="text"
                name="zip"
                id="zip"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.zip && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.zip}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="contactNumber" className="px-1 font-bold">
                Contact Number
              </label>
              <input
                onChange={handleChange}
                placeholder=""
                type="text"
                name="contactNumber"
                id="contactNumber"
                className="block mt-2 px-3 py-2 rounded-sm w-full bg-transparent text-gray-600 border border-violet-300 focus:shadow-[2px_2px_5pxpx_rgb(0, 0, 0, 0.3)] focus:border-violet-600 focus:outline-none"
              />
              {formErrors?.contactNumber && (
                <p className="mt-2 text-sm text-red-500 flex gap-2 items-start">
                  <BsExclamationCircleFill className="mt-0.5" />
                  {formErrors?.contactNumber}
                </p>
              )}
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default BillingAddress;
