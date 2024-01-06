import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Context/ContextProvider";

const useGetRefundTerms = () => {
  const { showToast } = useContext(contextProvider);
  const [refundTermsData, setRefundTermsData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchRefundTermsData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_V1_URL}/refund-terms`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        }
      );

      setRefundTermsData(response.data);
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
    fetchRefundTermsData();
  }, [showToast]);

  return [refundTermsData, loading, fetchRefundTermsData];
};

export default useGetRefundTerms;
