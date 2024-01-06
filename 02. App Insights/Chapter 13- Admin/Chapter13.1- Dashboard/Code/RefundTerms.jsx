import React, { useState, useContext } from "react";
import useGetRefundTerms from "../../API/useGetRefundTerms";
import axios from "axios";
import { contextProvider } from "../../Context/ContextProvider";
const RefundTerms = () => {
  const [
    refundTermsData,
    setRefundTermsData,
    fetchRefundTermsData,
  ] = useGetRefundTerms();
  const [newReturnWindow, setNewReturnWindow] = useState("");
  const [newRegistrationFees, setNewRegistrationFees] = useState("");
  const { showToast } = useContext(contextProvider);

  const handleUpdateReturnWindow = async () => {
    if (!newReturnWindow) {
      showToast({
        success: "",
        error: "Please enter a value for Return Window.",
      });
      return;
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_V1_URL}/refund-terms`,
        { returnWindow: newReturnWindow },
        {
          method: "PATCH",
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );

      await fetchRefundTermsData();

      showToast({
        success: "Return window updated successfully!",
        error: "",
      });
    } catch (error) {
      console.error("Error updating return window:", error);
      showToast({
        success: "",
        error: "Failed to update return window. Please try again.",
      });
    }
  };

  const handleUpdateRegistrationFees = async () => {
    if (!newRegistrationFees) {
      showToast({
        success: "",
        error: "Please enter a value for Registration Fee.",
      });
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_V1_URL}/refund-terms`,
        { registrationFees: newRegistrationFees },
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );

      await fetchRefundTermsData();

      showToast({
        success: "Registration fees updated successfully!",
        error: "",
      });
    } catch (error) {
      console.error("Error updating registration fees:", error);
      showToast({
        success: "",
        error: "Failed to update registration fees. Please try again.",
      });
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
