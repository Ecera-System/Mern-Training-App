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

      // console.log(response, "response");

      // Set default values if returnWindow is not present in the response
      const defaultRefundTermsData = {
        returnWindow: 6, // Set your default value here
        registrationFees: 20,
        ...response.data,
      };

      setRefundTermsData(defaultRefundTermsData);
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
