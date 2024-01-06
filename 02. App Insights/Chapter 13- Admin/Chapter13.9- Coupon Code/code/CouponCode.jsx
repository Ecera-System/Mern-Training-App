import React, { useState } from 'react';
import PageTitle from '../../Pages/Shared/PageTitle';
import CreateCouponCode from './CreateCouponCode';
import CouponCodeList from './CouponCodeList';

const CouponCode = () => {
    const [state, setState] = useState("list");

    return (<>
        <PageTitle title="Coupon Code" />
        <div className="my-5 w-full">
            <div className="mb-5 p-5 border-b bg-white text-gray-600 rounded-lg border">
                <h3 className="font-semibold text-xl mb-3">Coupon Code</h3>
                <p className="text-content text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                    mollitia, molestiae quas vel sint commodi repudiandae consequuntur
                    voluptatum laborum
                </p>
                <div className="flex flex-wrap items-center gap-5 mt-5">
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "list" && "bg-violet-100"}`}
                        onClick={() => setState("list")}
                    >
                        All Coupon Code
                    </button>
                    <button
                        className={`py-3 px-4 border hover:bg-violet-100 ${state === "create" && "bg-violet-100"}`}
                        onClick={() => setState("create")}
                    >
                        Create Coupon Code
                    </button>
                </div>
            </div>

            {state === "list" && <CouponCodeList />}

            {state === "create" && <CreateCouponCode setState={setState} />}
        </div>
    </>);
};

export default CouponCode;