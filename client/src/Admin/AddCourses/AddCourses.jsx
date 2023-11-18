import React, { useState } from 'react';
import PageTitle from '../../Pages/Shared/PageTitle';
import CreateACourse from './CreateACourse';
import UploadVideos from './UploadVideos';

const AddCourses = () => {
    const [upload, setUpload] = useState('video');

    return (<>
        <PageTitle title={''} />
        <div className="my-5 w-full">
            <div className="mb-5 p-5 border-b bg-white text-gray-600 rounded-lg border">
                <h3 className="font-semibold text-xl mb-3">Add Course</h3>
                <p className="text-content text-sm">
                    Add here course or course videos.
                </p>
                <div className="flex items-center gap-5 mt-5">
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${upload === "video" && "bg-violet-100"}`}
                        onClick={() => setUpload("video")}
                    >
                        Upload videos
                    </button>
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${upload === "course" && "bg-violet-100"}`}
                        onClick={() => setUpload("course")}
                    >
                        Create a Course
                    </button>
                </div>
            </div>

            {upload === "course" && <CreateACourse setUpload={setUpload}/>}
            {upload === "video" && <UploadVideos />}
        </div>
    </>);
};

export default AddCourses;