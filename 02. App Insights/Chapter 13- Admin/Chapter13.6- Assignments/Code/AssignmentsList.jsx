import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGetAllAssignments from '../../API/useGetAllAssignments';
import PageTitle from '../../Pages/Shared/PageTitle';
import TableLoadingSkeleton from '../../Pages/Shared/Spinner/TableLoadingSkeleton';

const AssignmentsList = () => {
    const [assData, loading] = useGetAllAssignments();
    const navigate = useNavigate();

    return (<>
        <PageTitle title="" />
        <div className="mt-5 bg-white text-gray-600 border rounded-lg overflow-x-auto">
            <table className="table-auto w-full">
                <thead className="bg-violet-100 text-left uppercase">
                    <tr>
                        <th className="text-sm py-3 px-5">Assignment</th>
                        <th className="text-sm py-3 pr-5">Course</th>
                        <th className="text-sm py-3 pr-5">Participants</th>
                        <th className="text-sm py-3 pr-5">Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <TableLoadingSkeleton td_count={4} /> :
                        assData?.map((data) =>
                            <tr key={data?._id} className="border-b">
                                <td className='py-3 px-5'>
                                    <button
                                        onClick={() => navigate(`/admin/assignments/${data?._id}`, { state: data })}
                                        className="w-max text-base text-start text-violet-600 font-semibold"
                                    >
                                        {data?.name}
                                    </button>
                                </td>
                                <td className="py-3 pr-5 text-emerald-500">
                                    <button
                                        onClick={() => navigate(`/course/${data?.courseId?._id}`, { state: data.courseId })}
                                        className='w-96 text-sm text-start font-semibold'
                                    >
                                        {data?.courseId?.title}
                                    </button>
                                </td>
                                <td className="py-3 pr-5 text-emerald-500">
                                    <span className='text-sm font-semibold'>
                                        {data?.submitAssignments.length}
                                    </span>
                                </td>
                                <td className="py-3 pr-5 text-sm">
                                    <p className='w-max'>
                                        {data?.deadline}
                                    </p>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
            {
                (!loading && assData.length === 0) &&
                <div className='text-center py-20'>
                    <h4 className='md:text-3xl text-xl font-medium text-gray-500'>
                        No Assignment has been created yet!
                    </h4>
                </div>
            }
        </div>
    </>);
};

export default AssignmentsList;