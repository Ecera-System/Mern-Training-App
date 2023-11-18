import { useState } from 'react';
import PageTitle from '../../Pages/Shared/PageTitle';
import RequestedCertificate from './RequestedCertificate';
import UploadCertificate from './UploadCertificate';

const Certificate = () => {
    const [state, setState] = useState("requested");

    return (<>
        <PageTitle title="Certificate" />
        <div className="my-5 w-full">
            <div className="mb-5 p-5 border-b bg-white text-gray-600 rounded-lg border">
                <h3 className="font-semibold text-xl mb-3">Certificate</h3>
                <p className="text-content text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                    mollitia, molestiae quas vel sint commodi repudiandae consequuntur
                    voluptatum laborum
                </p>
                <div className="flex flex-wrap items-center gap-5 mt-5">
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "requested" && "bg-violet-100"}`}
                        onClick={() => setState("requested")}
                    >
                        Requested Certificate
                    </button>
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "upload" && "bg-violet-100"}`}
                        onClick={() => setState("upload")}
                    >
                        Upload Certificate
                    </button>
                </div>
            </div>

            {state === "requested" && <RequestedCertificate />}

            {state === "upload" && <UploadCertificate setState={setState} />}
        </div>
    </>);
};

export default Certificate;