import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contextProvider } from "../Context/ContextProvider";

const useGetAllUserReward = () => {
  const { showToast } = useContext(contextProvider);
  const [userRewards, setUserRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_V1_URL}/reward/allUserRewardList`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => {
        setUserRewards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // Handle error and show toast if needed
        setLoading(false);
        if (err?.response?.data?.notExist) {
          localStorage.removeItem("auth_token");
          return navigate("/sign-in");
        }
      });
  }, [navigate]);

  return [userRewards, loading];
};

export default useGetAllUserReward;
