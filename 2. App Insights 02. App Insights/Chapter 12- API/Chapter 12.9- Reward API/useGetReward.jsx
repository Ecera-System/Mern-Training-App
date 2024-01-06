import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Context/ContextProvider";

const useGetRewards = () => {
  const { showToast } = useContext(contextProvider);
  const [rewardData, setRewardData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchRewardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_V1_URL}/reward`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );

      setRewardData(response.data);
      setLoading(false);
    } catch (err) {
      showToast({
        success: "",
        error: err?.response?.data?.error,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardData();
  }, [showToast]);

  return [rewardData, loading, fetchRewardData];
};

export default useGetRewards;
