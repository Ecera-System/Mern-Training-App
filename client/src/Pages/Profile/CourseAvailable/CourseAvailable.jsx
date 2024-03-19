import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageTitle from "../../Shared/PageTitle";
import Spinner from "../../Shared/Spinner/Spinner";
import { contextProvider } from "../../../Context/ContextProvider";
import useGetEnrolledAndNotRefund from "../../../API/useGetEnrolledAndNotRefund";
import useGetAllCourses from "../../../API/useGetAllCourses";
import TermsModal from "./TermsModal"; // Import the TermsModal component
import useGetRefundTerms from "../../../API/useGetRefundTerms";

const CourseAvailable = () => {
  const [enrolledData] = useGetEnrolledAndNotRefund();
  const { showToast } = useContext(contextProvider);
  const [coursesData] = useGetAllCourses();
  const navigate = useNavigate();
  //
  const [refundTermsData] = useGetRefundTerms();
  // console.log(refundTermsData, "refundTermsData");

  // State variables for TermsModal
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Function to handle checkbox change in TermsModal
  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  // Function to handle checkout button click
  const handleCheckoutButtonClick = (data) => {
    if (termsAccepted) {
      navigate(`/course/checkout/${data?._id}`);
    } else {
      setShowTermsModal(true);
    }
  };

  return (
    <div>
      <PageTitle title="Course Available" />

      <>
        {coursesData.length !== 0 && (
          <div>
            <h2 className="text-2xl font-semibold md:text-start text-center">
              All Courses
            </h2>
            <div className="xl:w-full lg:w-[44rem] md:w-[40rem] w-[19rem] max-md:mx-auto grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
              {coursesData?.slice(0, 4).map((data) => {
                const isEnrolled = enrolledData.some(
                  (enrolledCourse) => enrolledCourse.courseId._id === data._id
                );

                return (
                  <div
                    key={data._id}
                    className="w-full h-auto bg-white rounded-lg shadow-[0_5px_25px_-5px_rgb(0,0,0,0.1)] overflow-hidden"
                  >
                    <div className="w-full p-5 pb-0">
                      <img
                        className="object-cover w-full h-40 rounded-lg"
                        loading="lazy"
                        src={
                          import.meta.env.VITE_API_V1_URL + data?.cover_photo
                        }
                        alt={data?.title}
                      />
                    </div>
                    <div className="w-full p-5">
                      <Link
                        to={data?.src_path}
                        className="text-lg text-emerald-500 hover:text-emerald-600 duration-300 font-medium title_line_2"
                        title={data?.title}
                      >
                        {data?.title}
                      </Link>
                      <div className="flex items-center justify-between mt-5">
                        <p className="text-xl font-semibold">₹{data?.price}</p>
                        {isEnrolled ? (
                          <button
                            onClick={() => navigate("/profile/course")}
                            className="bg-violet-600 hover:bg-violet-700 duration-300 text-white py-2.5 px-5 rounded-md"
                          >
                            Continue Learning
                          </button>
                        ) : (
                          <div className="mt-5">
                            {/* Render TermsModal as a button when not enrolled */}
                            <button
                              onClick={() => handleCheckoutButtonClick(data)}
                              className="bg-violet-600 hover:bg-violet-700 duration-300 text-white py-2.5 px-5 rounded-md"
                            >
                              Checkout
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>

      {/* Render TermsModal with necessary props */}
      <TermsModal
        isOpen={showTermsModal}
        toggleModal={() => setShowTermsModal(!showTermsModal)}
        onCheckboxChange={handleCheckboxChange}
        isChecked={termsAccepted}
        refundTermsData={refundTermsData}
      />
    </div>
  );
};

export default CourseAvailable;
