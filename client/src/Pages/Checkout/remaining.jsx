// {/* <div className='w-full bg-violet-500 border rounded-lg'>
//                         <h1 className='text-xl font-bold text-black-700 p-5 border-b'>
//                             Billing Address
//                         </h1>
//                         <div className='w-full p-8 flex flex-col gap-6'>
//                             <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
//                                 <div className='w-full'>
//                                     <label htmlFor='firstName' className="px-1 font-semibold">First Name</label>
//                                     <input
//                                         onChange={handleChange}
//                                         placeholder=""
//                                         type="text" name='firstName' id='firstName'
//                                         className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                     />
//                                     {
//                                         formErrors?.firstName &&
//                                         <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
//                                             <BsExclamationCircleFill className="mt-0.5" />
//                                             {formErrors?.firstName}
//                                         </p>
//                                     }
//                                 </div>
//                                 <div className='w-full'>
//                                     <label htmlFor='lastName' className="px-1 font-semibold">Last Name</label>
//                                     <input
//                                         onChange={handleChange}
//                                         placeholder=""
//                                         type="text" name='lastName' id='lastName'
//                                         className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                     />
//                                     {
//                                         formErrors?.lastName &&
//                                         <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
//                                             <BsExclamationCircleFill className="mt-0.5" />
//                                             {formErrors?.lastName}
//                                         </p>
//                                     }
//                                 </div>
//                             </div>
//                             <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
//                                 <div className='w-full'>
//                                     <label htmlFor='contactNumber' className="px-1 font-semibold">Contact Number</label>
//                                     <input
//                                         onChange={handleChange}
//                                         placeholder=""
//                                         maxLength={10}
//                                         type="text" name='contactNumber' id='contactNumber'
//                                         className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                     />
//                                     {
//                                         formErrors?.contactNumber &&
//                                         <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
//                                             <BsExclamationCircleFill className="mt-0.5" />
//                                             {formErrors?.contactNumber}
//                                         </p>
//                                     }
//                                 </div>
//                                 <div className='w-full'>
//                                     <label htmlFor='startDate' className="px-1 font-semibold">Start Date</label>
//                                     <input
//                                         onChange={handleChange}
//                                         type="date" name='startDate' id='startDate'
//                                         className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                     />
//                                     {/* You can add error handling for this field similar to other fields *}
//                                     </div>
//                                     </div>
//                                     <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
//                                         <div className='w-full'>
//                                             <label htmlFor='address1' className="px-1 font-semibold">Address Line 1</label>
//                                             <input
//                                                 onChange={handleChange}
//                                                 placeholder=""
//                                                 type="text" name='address1' id='address1'
//                                                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                             />
//                                             {
//                                                 formErrors?.address1 &&
//                                                 <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
//                                                     <BsExclamationCircleFill className="mt-0.5" />
//                                                     {formErrors?.address1}
//                                                 </p>
//                                             }
//                                         </div>
//                                         <div className='w-full'>
//                                             <label htmlFor='address2' className="px-1 font-semibold">Address Line 2 (optional)</label>
//                                             <input
//                                                 onChange={handleChange}
//                                                 placeholder=""
//                                                 type="text" name='address2' id='address2'
//                                                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                             />
//                                             {
//                                                 formErrors?.address2 &&
//                                                 <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
//                                                     <BsExclamationCircleFill className="mt-0.5" />
//                                                     {formErrors?.address2}
//                                                 </p>
//                                             }
//                                         </div>
//                                     </div>
//                                     <div className='flex flex-col md:flex-row items-center justify-between md:gap-8 gap-6'>
//                                         <div className='w-full'>
//                                             <label htmlFor='country' className="px-1 font-semibold">Country</label>
//                                             <select
//                                                 name="country" id="country"
//                                                 onChange={handleChange}
//                                                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                             >
//                                                 <option value="">Select Country</option>
//                                                 <CountryList />
//                                             </select>
//                                             {
//                                                 formErrors?.country &&
//                                                 <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
//                                                     <BsExclamationCircleFill className="mt-0.5" />
//                                                     {formErrors?.country}
//                                                 </p>
//                                             }
//                                         </div>
//                                         <div className='w-full'>
//                                             <label htmlFor='city' className="px-1 font-semibold">City/State</label>
//                                             <input
//                                                 onChange={handleChange}
//                                                 placeholder=""
//                                                 type="text" name='city' id='city'
//                                                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                             />
//                                             {
//                                                 formErrors?.city &&
//                                                 <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
//                                                     <BsExclamationCircleFill className="mt-0.5" />
//                                                     {formErrors?.city}
//                                                 </p>
//                                             }
//                                         </div>
//                                         <div className='w-full'>
//                                             <label htmlFor='zip' className="px-1 font-semibold">Zip/Postal Code</label>
//                                             <input
//                                                 onChange={handleChange}
//                                                 placeholder=""
//                                                 type="text" name='zip' id='zip'
//                                                 className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:bg-white focus:border-violet-600 focus:outline-none"
//                                             />
//                                             {
//                                                 formErrors?.zip &&
//                                                 <p className='mt-2 text-sm text-red-500 flex gap-2 items-start'>
//                                                     <BsExclamationCircleFill className="mt-0.5" />
//                                                     {formErrors?.zip}
//                                                 </p>
//                                             }
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div> */}
