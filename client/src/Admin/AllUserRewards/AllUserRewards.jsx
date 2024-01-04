import React, { useState, useEffect, useContext } from "react";
import PageTitle from "../../Pages/Shared/PageTitle";
import { contextProvider } from "../../Context/ContextProvider";
import useGetAllUserReward from "../../API/useGetAllUserReward";
import UserRewardList from "./UserRewardList";
import axios from "axios";

const AllUserRewards = () => {
  const [userRewards, loading, fetchUserRewards] = useGetAllUserReward();
  const { showToast } = useContext(contextProvider);
  const [formData, setFormData] = useState({
    email: "",
    points: 0,
  });
  //
  useEffect(() => {
    // Fetch user rewards when the component mounts or when the form is submitted
    fetchUserRewards();
  }, [fetchUserRewards]);
  //

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Perform the PATCH request to update rewards using axios
      const response = await axios.post(
        `${import.meta.env.VITE_API_V1_URL}/reward/findByEmailAndAddPoint`,
        formData, // Pass formData directly as the data payload
        {
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );

      if (response.status === 200) {
        // If the request is successful, you may want to fetch the updated rewards list
        // or update the existing state to reflect the changes
        // Example: Call your getAllUserReward function or update state accordingly
        showToast({
          success: response.data.success,
          error: "",
        });
      } else {
        console.log("else");
        console.error("Error updating rewards:", response.data);
        // Handle errors if needed
        showToast({
          success: "",
          error: response.data.error,
        });
      }
    } catch (error) {
      console.log("Error updating rewards:", error);
      if (error.response.status === 403) {
        showToast({
          success: "",
          error: "User not found with the provided email",
        });
      } else {
        showToast({
          success: "",
          error: "An error occurred while updating rewards. Please try again.", // Generic error message
        });
      }
      console.log("Full error response:", error.response);
    }
  };

  return (
    <>
      <PageTitle title="All User Rewards" />
      <div className="my-5 w-full bg-white text-gray-600 rounded-lg border">
        <div className="p-5 border-b">
          <h1 className="text-xl font-semibold">
            Update Rewards Count with Email
          </h1>
        </div>
        {/* Add your input form here */}
        <form onSubmit={handleFormSubmit} className="p-5">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="points"
              className="block text-sm font-medium text-gray-700"
            >
              Points
            </label>
            <input
              type="number"
              id="points"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update Rewards
          </button>
        </form>
      </div>
      {/* Place the UserRewardList component here */}
      <div className="my-5 w-full bg-white text-gray-600 rounded-lg border">
        <div className="p-5 border-b">
          <h3 className="text-xl font-semibold">All User Rewards List</h3>
        </div>
        <UserRewardList userRewards={userRewards} loading={loading} />
      </div>
    </>
  );
};

export default AllUserRewards;
