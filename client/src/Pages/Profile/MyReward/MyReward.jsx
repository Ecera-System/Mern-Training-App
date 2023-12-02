import React, { useState, useContext } from "react";
import rewardImage from "/images/reward.jpg"; // Import your reward image

import { contextProvider } from "../../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

import useGetRewards from "../../../API/useGetReward";
//
import axios from "axios";

const MyReward = () => {
  const { showToast } = useContext(contextProvider);
  // const { rewardBalance, setRewardBalance } = useContext(contextProvider);
  const [rewardData, loading, fetchRewardData] = useGetRewards();

  const navigate = useNavigate();
  console.log(rewardData, "rewardData");
  //temporary
  const [rewardInput, setRewardInput] = useState("");
  const handleAddReward = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_V1_URL}/reward`,
        { dollarsSpent: rewardInput },
        {
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );

      showToast({
        success: response?.data?.success,
        error: response?.data?.error,
      });

      // Fetch updated reward data after adding reward
      fetchRewardData();
    } catch (err) {
      showToast({
        success: "",
        error: err?.response?.data?.error,
      });
    }
  };
  //
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h2 style={styles.header}>My Balance</h2>
          <div style={styles.rewardContainer}>
            {/* <p style={styles.rewardText}> {rewardBalance} points </p> */}
            {/* <p style={styles.rewardText}> {rewardData.points} points </p> */}
            <p style={styles.rewardText}>
              {rewardData && rewardData.points !== undefined
                ? `${rewardData.points} points`
                : "0 points"}
            </p>
          </div>
          <button style={styles.button}>Redeem</button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <button
            style={styles.button}
            onClick={() => {
              navigate("/profile/course");
            }}
          >
            Explore More
          </button>
          {/* temporary just to test */}
          <p>
            $value:{" "}
            <input
              type="text"
              value={rewardInput}
              onChange={(e) => setRewardInput(e.target.value)}
            />
            <button onClick={handleAddReward}>Add reward</button>
          </p>
          {/*  */}
        </div>
      </div>
      <p style={styles.earnText}>Don't just spend,Earn!</p>
      <div style={styles.imageContainer}>
        {/* <img
          src={additionalImage} // Use the imported image variable
          alt="Additional Image"
          style={styles.additionalImage}
        /> */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh", // Set minimum height to fill the viewport
    backgroundImage: `url(${rewardImage})`,
    backgroundColor: "#f5f5f5",
    backgroundSize: "100% auto", // Set background size to cover the container
    backgroundPosition: "center", // Center the background image
    backgroundRepeat: "no-repeat", // Ensure the background image does not repeat
    position: "relative", // Make the container relative for absolute positioning of the earnText
  },
  overlay: {},
  content: {
    position: "absolute",
    top: "10px", // Adjust the distance from the top as needed
    right: "20px", // Adjust the distance from the right as needed
  },
  header: {
    fontSize: "21px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  rewardContainer: {
    position: "relative",
  },
  rewardText: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "10px",
  },
  button: {
    transition: "background-color 0.3s ease",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  earnText: {
    position: "absolute",
    top: "0px", // Adjust the distance from the top as needed
    left: "26%",
    transform: "translateX(-50%)",
    fontSize: "50px",
    fontWeight: "bold",
    color: "#004d40",
    // Set the color to white
  },

  imageContainer: {
    marginTop: "20px", // Adjust the margin as needed
    display: "flex",
    justifyContent: "center",
  },

  additionalImage: {
    top: "100px",
    width: "200px", // Adjust the width as needed
    height: "auto", // Adjust the height as needed or remove to maintain the aspect ratio
    borderRadius: "5px", // Optional: Add border radius to the image
  },
};

export default MyReward;
