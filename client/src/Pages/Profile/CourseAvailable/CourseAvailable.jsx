import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageTitle from "../../Shared/PageTitle";
import Spinner from "../../Shared/Spinner/Spinner";
import { contextProvider } from "../../../Context/ContextProvider";
import useGetEnrolledCourse from "../../../API/useGetEnrolledCourse";
import useGetAllCourses from "../../../API/useGetAllCourses";
//
import axios from "axios";

const CourseAvailable = () => {
  const [enrolledData, loading] = useGetEnrolledCourse();
  const { showToast } = useContext(contextProvider);
  const [coursesData] = useGetAllCourses();
  const navigate = useNavigate();
  //
  // console.log(coursesData, "coursesData");
  // console.log(enrolledData, "enrolledData");
  //
  return (
    <div>
      {/* <PageTitle title="Course Available" />
      CourseAvailable */}
      <>
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
                      src={import.meta.env.VITE_API_V1_URL + data?.cover_photo}
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
                      <p className="text-xl font-semibold">${data?.price}</p>
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
    </div>
  );
};

export default CourseAvailable;
