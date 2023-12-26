import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import PageTitle from "../../Shared/PageTitle";
// import Spinner from "../../Shared/Spinner/Spinner";
// import { contextProvider } from "../../../Context/ContextProvider";
// import useGetEnrolledAndNotRefund from "../../../API/useGetEnrolledAndNotRefund";
// import useGetAllCourses from "../../../API/useGetAllCourses";
// import useGetRefundTerms from "../../../API/useGetRefundTerms";

// New Component for Terms and Conditions Popup
const TermsPopup = ({ refundTermsData, onClose }) => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-md">
      <p>
        Terms and condition - return window {refundTermsData.returnWindow} days,
        registration fee {refundTermsData.registrationFees}%
      </p>
      <button
        onClick={onClose}
        className="mt-4 bg-gray-300 py-2 px-4 rounded-md"
      >
        Close
      </button>
    </div>
  </div>
);

export default TermsPopup;
