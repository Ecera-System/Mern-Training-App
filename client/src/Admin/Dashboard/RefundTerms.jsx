import React, { useState } from "react";
import useGetRefundTerms from "../../API/useGetRefundTerms";
import axios from "axios";

const RefundTerms = () => {
  const [refundTermsData, setRefundTermsData] = useGetRefundTerms();
  const [newReturnWindow, setNewReturnWindow] = useState("");
  const [newRegistrationFees, setNewRegistrationFees] = useState("");

  //   console.log(newReturnWindow, "newReturnWindow");
  //   console.log(newRegistrationFees, "newRegistrationFees");

  //   console.log(localStorage.getItem("auth_token"));

  const handleUpdateReturnWindow = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_V1_URL}/refund-terms`,
        { returnWindow: newReturnWindow },
        {
          method: "PATCH",
          //   returnWindow: newReturnWindow,
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );
      // Refresh refund terms data after update
      //   setRefundTermsData((prevData) => ({
      //     ...prevData,
      //     returnWindow: newReturnWindow,
      //   }));
    } catch (error) {
      console.error("Error updating return window:", error);
    }
  };

  const handleUpdateRegistrationFees = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_V1_URL}/refund-terms`,
        { registrationFees: newRegistrationFees },
        {
          //   registrationFees: newRegistrationFees,
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );
      // Refresh refund terms data after update
      //   setRefundTermsData((prevData) => ({
      //     ...prevData,
      //     registrationFees: newRegistrationFees,
      //   }));
    } catch (error) {
      console.error("Error updating registration fees:", error);
    }
  };

  return (
    <div className="p-5 border rounded-lg bg-white mt-8">
      <h2 className="text-2xl font-semibold mb-4">Refund Terms</h2>

      {/* Render refund terms data */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Return Window:
        </label>
        <p className="text-lg font-semibold">
          {refundTermsData.returnWindow} days
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Registration Fee:
        </label>
        <p className="text-lg font-semibold">
          {refundTermsData.registrationFees}%
        </p>
      </div>

      {/* Input fields for updating refund terms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Update Return Window:
        </label>
        <input
          type="number"
          value={newReturnWindow}
          onChange={(e) => setNewReturnWindow(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />
        <button
          onClick={handleUpdateReturnWindow}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Return Window
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Update Registration Fee:
        </label>
        <input
          type="number"
          value={newRegistrationFees}
          onChange={(e) => setNewRegistrationFees(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />
        <button
          onClick={handleUpdateRegistrationFees}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Registration Fee
        </button>
      </div>
    </div>
  );
};

export default RefundTerms;
