import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../Pages/Shared/PageTitle';

const SubmittedAssignments = () => {
    return (<>
        <PageTitle title="Submitted Assignments" />
        <div className="mt-5 bg-white border rounded-lg w-full">
            <div className='p-5'>
                <label
                    className="font-semibold block mb-1 text-content text-base"
                    htmlFor="assignment"
                >
                    Select Assignment
                </label>
                <select
                    className="block w-full border rounded outline-none py-2 px-3 text-sm focus:border-violet-600"
                    name="assignment"
                    id="assignment"
                >
                    <option value="">Select Assignment</option>
                    <option value={'_id'}> {'name'} </option>
                </select>
            </div>
            <div className="">
                <table className="table-auto w-full">
                    <thead className="bg-violet-100 text-left uppercase">
                        <tr>
                            <th className="text-sm py-3 pl-5">Student</th>
                            <th className="text-sm py-3">Number</th>
                            <th className="text-sm py-3">Submit Time</th>
                            <th className="text-sm py-3">Deadline</th>
                            <th className="text-sm py-3 pr-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b'>
                            <td className='py-3 pl-5'>
                                <Link
                                    className="text-base text-violet-600"
                                    to={`/dashboard/students/${'studentId'}`}
                                >
                                    #{'studentId'}
                                </Link>
                            </td>
                            <td className='text-sm py-3'>
                                {/* {number === 0 ? "Pending" : number} / {assignmentNumber} */}
                                Pending
                            </td>
                            <td className='text-sm py-3'>
                                {'submitDate'}
                            </td>
                            <td className='text-sm py-3'>
                                {'deadline'}
                            </td>
                            <td className='text-sm py-3 pr-5'>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="py-1 px-3 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
                                    // onClick={() => controlModal(_id)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="py-1 px-3 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm"
                                    // onClick={() => assignModalControl(_id)}
                                    >
                                        Mark
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>);
};

export default SubmittedAssignments;