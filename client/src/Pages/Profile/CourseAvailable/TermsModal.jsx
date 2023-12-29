import React from "react";

const TermsModal = ({
  isOpen,
  toggleModal,
  onCheckboxChange,
  isChecked,
  refundTermsData,
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
          {/* <p>Your terms and conditions go here...</p> */}
          <p>
            Non refundable regestration fees {refundTermsData.registrationFees}%
            of the amount. Refund window closes in{" "}
            {refundTermsData.returnWindow} days{" "}
          </p>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={onCheckboxChange}
                className="mr-2"
              />
              I accept the terms and conditions
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={toggleModal}
              className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md mr-2"
            >
              Close
            </button>
            <button
              onClick={toggleModal}
              className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md"
              disabled={!isChecked}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TermsModal;
