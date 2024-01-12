import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetEnrolledCourse from "../../../API/useGetEnrolledCourse";
// import useGetEnrolledAndNotRefund from "../../../API/useGetEnrolledAndNotRefund";

import PageTitle from "../../Shared/PageTitle";
import Spinner from "../../Shared/Spinner/Spinner";
import ClassContent from "./ClassContent";
import useGetAllCourses from "../../../API/useGetAllCourses";
import TermsModal from "../CourseAvailable/TermsModal";
import useGetRefundTerms from "../../../API/useGetRefundTerms";

const MyClasses = () => {
  // const [enrolledData, loading] = useGetEnrolledAndNotRefund();
  const [enrolledData, loading] = useGetEnrolledCourse();
  const [coursesData] = useGetAllCourses();
  const [content, setContent] = useState();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const [refundTermsData] = useGetRefundTerms();
  // console.log(refundTermsData, "refundTermsData");
  //
  // console.log(coursesData, "coursesData");
  // console.log(enrolledData, "enrolledData");
  // console.log(content);
  //
  // <!-- Check exist course -->
  const courses = enrolledData?.filter((f) => f.courseId);
  //
  // const handleCheckoutButtonClick = (data) => {
  //   if (data?.refundRequest) {
  //     setShowTermsModal(true);
  //   } else {
  //     navigate(`/course/checkout/${data?.courseId._id}`);
  //   }
  // };
  //
  const handleAcceptTerms = () => {
    setShowTermsModal(false);
    //
    // console.log(content);
    navigate(`/course/checkout/${content?._id}`);
  };
  //
  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };
  //
  // Function to handle checkout button click
  const handleCheckoutButtonClick = (data) => {
    if (termsAccepted) {
      navigate(`/course/checkout/${data?.courseId._id}`);
    } else {
      setShowTermsModal(true);
    }
  };

  if (loading) return <Spinner />;

  return content ? (
    <ClassContent content={content} setContent={setContent} />
  ) : (
    <>
      <PageTitle title="Course" />
      <div className="my-5 mb-28 w-full text-gray-600">
        <div className="p-5 border rounded-lg bg-white">
          <h1 className="text-xl text-content-secondary font-semibold">
            My Classes
          </h1>
          <p className="mt-1">
            Acquire skills to broaden your horizons and shape your future.
          </p>
        </div>
        <div>
          {courses?.length !== 0 ? (
            <div className="lg:w-full md:w-[38rem] w-[19rem] mx-auto grid xl:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-8">
              {courses.map((data) => (
                <div
                  key={data._id}
                  className="bg-white rounded-lg shadow-[0_5px_25px_-5px_rgb(0,0,0,0.1)] overflow-hidden flex xl:flex-row flex-col items-start p-5 gap-6"
                >
                  <div className="xl:w-2/5 w-full">
                    <img
                      className="object-cover w-full h-32 rounded-lg"
                      loading="lazy"
                      src={import.meta.env.VITE_API_V1_URL + data?.cover_photo}
                      alt={data?.title}
                    />
                  </div>
                  <div className="xl:w-3/5 w-full">
                    <h2 className="xl:text-xl text-lg font-semibold">
                      {data?.courseId?.title}
                    </h2>
                    {data?.refundRequest ? (
                      // <button
                      //   onClick={() =>
                      //     navigate(`/course/checkout/${data?.courseId._id}`)
                      //   }
                      //   className="bg-violet-600 hover:bg-violet-700 duration-300 text-white py-2.5 px-5 rounded-md mt-5"
                      // >
                      //   Refund Requested, buy again to access
                      // </button>
                      <button
                        onClick={() => handleCheckoutButtonClick(data)}
                        className="bg-violet-600 hover:bg-violet-700 duration-300 text-white py-2.5 px-5 rounded-md mt-5"
                      >
                        Refund Requested, buy again to access
                      </button>
                    ) : (
                      <button
                        onClick={() => setContent(data?.courseId)}
                        className="bg-violet-600 hover:bg-violet-700 duration-300 text-white py-2.5 px-5 rounded-md mt-5"
                      >
                        Continue Learning
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="text-center py-28 px-5">
                <p className="text-xl text-gray-500 sm:w-[25rem] w-full mx-auto mb-6">
                  No course enrolled yet!
                </p>
                {/* <Link
                                    to='/programs/mern-stack-web-development'
                                    className='inline-block px-6 py-2.5 text-base font-medium bg-violet-600 hover:bg-violet-700 text-white duration-300 rounded'
                                >
                                    See Course
                                </Link> */}
              </div>
              {coursesData.length !== 0 && (
                <div>
                  <h2 className="text-2xl font-semibold md:text-start text-center">
                    Available For You
                  </h2>
                  <div className="xl:w-full lg:w-[44rem] md:w-[40rem] w-[19rem] max-md:mx-auto grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
                    {coursesData?.slice(0, 4).map((data) => (
                      <div
                        key={data._id}
                        className="w-full h-auto bg-white rounded-lg shadow-[0_5px_25px_-5px_rgb(0,0,0,0.1)] overflow-hidden"
                      >
                        <div className="w-full p-5 pb-0">
                          <img
                            className="object-cover w-full h-40 rounded-lg"
                            loading="lazy"
                            src={
                              import.meta.env.VITE_API_V1_URL +
                              data?.cover_photo
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
                            <p className="text-xl font-semibold">
                              ${data?.price}
                            </p>
                            <button
                              onClick={() =>
                                navigate(`/course/checkout/${data?._id}`)
                              }
                              className="bg-violet-600 hover:bg-violet-700 duration-300 text-white py-2.5 px-5 rounded-md"
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Render TermsModal with necessary props */}
      <TermsModal
        isOpen={showTermsModal}
        toggleModal={() => setShowTermsModal(!showTermsModal)}
        onCheckboxChange={handleCheckboxChange}
        isChecked={termsAccepted}
        // onAccept={handleAcceptTerms}
        refundTermsData={refundTermsData}
      />
    </>
  );
};

export default MyClasses;
