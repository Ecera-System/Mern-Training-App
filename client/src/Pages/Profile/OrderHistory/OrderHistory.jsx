import React, { useState } from "react";
import useGetEnrolledCourse from "../../../API/useGetEnrolledCourse";
import PageTitle from "../../Shared/PageTitle";
import moment from "moment";
import TableLoadingSkeleton from "../../Shared/Spinner/TableLoadingSkeleton";
import axios from "axios";

const OrderHistory = () => {
  const [enrolledData, loading, refetchEnrolledData] = useGetEnrolledCourse();
  const course = enrolledData?.filter((f) => f.courseId);
  const [refundButtonDisabled, setRefundButtonDisabled] = useState(false);

  //

  //   console.log(localStorage.getItem("auth_token"));

  //

  const handleRefundRequest = async (id) => {
    try {
      console.log(id);

      // Disable the refund button to prevent multiple requests
      setRefundButtonDisabled(true);

      // Check if the token exists
      const authToken = localStorage.getItem("auth_token");
      if (!authToken) {
        console.error("No bearer token found");
        // Handle the absence of a token (e.g., redirect to login)
        return;
      }

      // Make the API call to update the refund request
      await axios.patch(
        `${
          import.meta.env.VITE_API_V1_URL
        }/course-enroll/update-refund-request/${id}`,
        {
          // Remove the "method" property, if not needed
        },
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      // Refetch the enrolled data after a successful update
      refetchEnrolledData();
    } catch (error) {
      console.error("Error updating refund request:", error);
    } finally {
      // Enable the refund button after the API call, you can set a timeout if needed
      setRefundButtonDisabled(false);
    }
  };

  return (
    <>
      <PageTitle title={`Order History`} />
      <div className="my-5 mb-20 w-full bg-white text-gray-600 rounded-lg border">
        <div className="p-5 border-b">
          <h1 className="text-xl text-content-secondary font-semibold">
            Order History
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-violet-50 uppercase text-left">
              <tr>
                <th className="text-sm py-3 px-5">COURSES</th>
                <th className="text-sm py-3 pr-5">Amount Paid</th>
                <th className="text-sm py-3 pr-5">Reward Used</th>
                <th className="text-sm py-3 pr-5">Payment Status</th>
                <th className="text-sm py-3 pr-5">Enroll Date</th>
                <th className="text-sm py-3 pr-5">ACTION</th>
                <th className="text-sm py-3 pr-5">Refund Status</th>
                <th className="text-sm py-3 pr-5">Refund</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableLoadingSkeleton td_count={5} />
              ) : (
                course?.map((data) => {
                  const isRefundButtonDisabled =
                    moment().diff(moment(data?.createdAt), "days") > 7;

                  return (
                    <tr key={data.id} className="border-b">
                      <td className="py-3 px-5">
                        <div className="w-[25rem] flex items-center gap-5">
                          <h2 className="text-base text-start font-medium text-gray-800 duration-300">
                            {data?.courseId?.title}
                          </h2>
                        </div>
                      </td>
                      <td className="py-3 pr-5">
                        <span className="w-max text-sm font-semibold">
                          ${data?.price}
                        </span>
                      </td>
                      <td className="py-3 pr-5">
                        <span className="w-max text-sm font-semibold">
                          ${data?.rewardDiscount ?? "0"}
                        </span>
                      </td>
                      <td className="py-3 pr-5">
                        <span className="w-max text-sm font-medium capitalize text-emerald-500">
                          {data?.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 pr-5">
                        <span className="w-max text-sm font-medium">
                          {moment(data?.createdAt).format("DD-MMM-YYYY")}
                        </span>
                      </td>
                      <td className="py-3 pr-5">
                        <span className="w-max inline-block py-1.5 px-6 bg-violet-200 text-sm font-medium capitalize rounded">
                          Enrolled
                        </span>
                      </td>
                      <td className="py-3 pr-5">
                        {isRefundButtonDisabled ? (
                          <span className="w-max text-sm font-medium capitalize text-red-500">
                            {data?.refundRequest === "Yes"
                              ? "Refunded"
                              : "Window Over"}
                          </span>
                        ) : (
                          <span className="w-max text-sm font-medium capitalize text-emerald-500">
                            {data?.refundRequest || "Not Requested"}
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-5">
                        <button
                          className={`w-max inline-block py-1.5 px-6 ${
                            isRefundButtonDisabled || refundButtonDisabled
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600"
                          } text-sm font-medium text-white capitalize rounded focus:outline-none focus:ring focus:border-red-700`}
                          onClick={() => handleRefundRequest(data._id)}
                          disabled={
                            isRefundButtonDisabled || refundButtonDisabled
                          }
                        >
                          Request refund
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {!loading && course.length === 0 && (
            <div className="text-center py-20">
              <h4 className="md:text-3xl text-xl font-medium text-gray-500">
                No course has been created yet!
              </h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
