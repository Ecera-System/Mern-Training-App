import axios from 'axios';
import React from 'react';
import PageTitle from '../../Pages/Shared/PageTitle';

const RequestedCertificate = () => {

    // const handleDownload = async () => {
    //     try {
    //         const res = await axios.get(`${import.meta.env.VITE_API_V1_URL}/certificate/64042c7ff861b5f1d8bf619e`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': localStorage.getItem('auth_token')
    //             },
    //             responseType: 'blob' // set the response type to blob
    //         });
    //         console.log(res);
    //         // create a URL for the blob and create a link with the URL
    //         const blob = await res.data;
    //         const url = URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = `mmf-certificate.png`;
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (<>
        <PageTitle title="Requested Certificate" />
        <div className="border-b bg-white text-gray-600 rounded-lg border">
            {/* <button
                onClick={handleDownload}
                className='px-8 py-3 text-base font-medium bg-violet-600 hover:bg-violet-700 duration-300 text-white flex items-center gap-2 rounded'
            >
                Download
            </button> */}
            <table className="table-auto w-full">
                <thead className="bg-violet-100 text-left uppercase">
                    <tr>
                        <th className="text-sm py-3 px-5">Student Name</th>
                        <th className="text-sm py-3 pr-5">Course Name</th>
                        <th className="text-sm py-3 pr-5">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr key={data._id} className="border-b">
                        <td className='py-3 px-5'>
                            <h2>
                                <button
                                    className="text-base text-start text-violet-600 font-semibold"
                                    onClick={() => navigate(`/admin/assignments/${data._id}`, { state: data })}
                                >
                                    {data.name}
                                </button>
                            </h2>
                        </td>
                        <td className="py-3 pr-5 text-emerald-500">
                            <button
                                onClick={() => navigate(`/course/${data.courseId._id}`, { state: data.courseId })}
                                className='text-sm text-start font-semibold'
                            >
                                {data.courseId.title}
                            </button>
                        </td>
                        <td className="py-3 pr-5 text-emerald-500">
                            <span className='text-sm font-semibold'>
                                {data.submitAssignments.length}
                            </span>
                        </td>
                        <td className="py-3 pr-5 text-sm">
                            <p className='w-max'>
                                {data.deadline}
                            </p>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    </>);
};

export default RequestedCertificate;