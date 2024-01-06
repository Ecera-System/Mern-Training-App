import React, { useState } from 'react';
import PageTitle from '../../Pages/Shared/PageTitle';
import AddAssignment from './AddAssignment';
import AssignmentsList from './AssignmentsList';
import SubmittedAssignments from './SubmittedAssignments';

const Assignments = () => {
    const [state, setState] = useState("show");

    return (<>
        <PageTitle title="Assignments" />
        <div className='w-full my-5 text-gray-600'>
            <div className="p-5 border-b bg-white rounded-lg border">
                <h3 className="font-semibold text-xl mb-3">Assignments</h3>
                <p className="text-content text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                    mollitia, molestiae quas vel sint commodi repudiandae consequuntur
                    voluptatum laborum
                </p>
                <div className="flex flex-wrap items-center gap-5 mt-5">
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "show" && "bg-violet-100"}`}
                        onClick={() => setState("show")}
                    >
                        All Assignments
                    </button>
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "add" && "bg-violet-100"}`}
                        onClick={() => setState("add")}
                    >
                        Add Assignments
                    </button>
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "submit" && "bg-violet-100"}`}
                        onClick={() => setState("submit")}
                    >
                        Submitted Assignments
                    </button>
                </div>
            </div>

            {state === "show" && <AssignmentsList />}

            {state === "add" && <AddAssignment setState={setState} />}

            {state === "submit" && <SubmittedAssignments />}
        </div>
    </>);
};

export default Assignments;