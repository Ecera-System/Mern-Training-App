import React from 'react';
import useGetEnrolledCourse from '../../../API/useGetEnrolledCourse';
import PageTitle from '../../Shared/PageTitle';
import moment from 'moment';
import TableLoadingSkeleton from '../../Shared/Spinner/TableLoadingSkeleton';

const OrderHistory = () => {
    const [enrolledData, loading] = useGetEnrolledCourse();
    const course = enrolledData?.filter(f => f.courseId);

    return (<>
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
                            <th className="text-sm py-3 pr-5">Price</th>
                            <th className="text-sm py-3 pr-5">Payment Status</th>
                            <th className="text-sm py-3 pr-5">Enroll Date</th>
                            <th className="text-sm py-3 pr-5">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <TableLoadingSkeleton td_count={5} /> :
                            course?.map((data) =>
                                <tr className='border-b'>
                                    <td className='py-3 px-5'>
                                        <div className='w-[25rem] flex items-center gap-5'>
                                            <h2 className="text-base text-start font-medium text-gray-800 duration-300">
                                                {data?.courseId?.title}
                                            </h2>
                                        </div>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <span className="w-max text-sm font-semibold">
                                            ${data?.price}
                                        </span>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <span className="w-max text-sm font-medium capitalize text-emerald-500">
                                            {data?.paymentStatus}
                                        </span>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <span className="w-max text-sm font-medium">
                                            {moment(data?.courseId?.createdAt).format("DD-MMM-YYYY")}
                                        </span>
                                    </td>
                                    <td className='py-3 pr-5'>
                                        <span className="w-max inline-block py-1.5 px-6 bg-violet-200 text-sm font-medium capitalize rounded">
                                            Enrolled
                                        </span>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
                {
                    (!loading && course.length === 0) &&
                    <div className='text-center py-20'>
                        <h4 className='md:text-3xl text-xl font-medium text-gray-500'>
                            No course has been created yet!
                        </h4>
                    </div>
                }
            </div>
        </div>
    </>);
};

export default OrderHistory;