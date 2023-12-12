import React, { useState, useContext } from "react";

import PageTitle from "../../Shared/PageTitle";
import { contextProvider } from "../../../Context/ContextProvider";

//
import axios from "axios";

const CourseAvailable = () => {
  const { showToast } = useContext(contextProvider);

  //
  return (
    <div>
      <PageTitle title="Course Available" />
      CourseAvailable
    </div>
  );
};

export default CourseAvailable;
