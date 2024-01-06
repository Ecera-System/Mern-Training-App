import React from 'react';
import { useLocation } from 'react-router-dom';
import PageTitle from '../../Pages/Shared/PageTitle';

const AssignmentDetails = () => {
    const location = useLocation();
    const { name, mark, deadline, createdAt, hints, brief } = location?.state;
    
    return (<>
        <PageTitle title="Assignment Details" />
        <div className="my-5 p-8 bg-white border rounded-lg ">
            <div className="pb-5">
                <h2 className="font-semibold text-2xl text-gray-700">{name}</h2>
                <p className='text-sm font-medium my-2 text-gray-500'>({mark}) mark</p>
                <div className='text-sm font-medium text-gray-500 flex items-center gap-5'>
                    <span>
                        Created at :- <span className='font-semibold'>{createdAt.split('T')[0]}</span>
                    </span>
                    <span>
                        Deadline :- <span className='font-semibold'>{deadline}</span>
                    </span>
                </div>
            </div>
            <hr />
            <div className='mt-5'>
                {hints &&
                    <div className="border rounded">
                        <h2 className="font-semibold border-b py-2 px-3 text-gray-700 bg-violet-100">
                            Assignment Hints/Resource
                        </h2>
                        <div className="p-5">{hints}</div>
                    </div>
                }
                <div className="mt-10 border rounded">
                    <h2 className="font-semibold border-b py-2 px-3 text-gray-700 bg-violet-100">
                        Assignment Brief
                    </h2>
                    <div className='p-5' dangerouslySetInnerHTML={{ __html: brief }}></div>
                </div>
            </div>
        </div>
    </>);
};

export default AssignmentDetails;