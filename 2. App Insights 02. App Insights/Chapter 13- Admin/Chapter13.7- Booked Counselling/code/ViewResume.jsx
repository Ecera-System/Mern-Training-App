// import React from 'react';

// const ViewResume = ({ isResume, setIsResume }) => {
//     return (
//         <div className='fixed inset-0 bg-black/70 flex items-start justify-center overflow-auto'>
//             <div
//                 onClick={() => setIsResume(null)}
//                 className='absolute top-5 left-5 p-1 text-white hover:text-gray-600 hover:bg-blue-50 duration-300 cursor-pointer rounded-full'
//             >
//                 <svg className="w-8 h-8"
//                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                     strokeWidth={2} stroke="currentColor"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>

//             </div>
//             <object
//                 data={import.meta.env.VITE_API_V1_URL + isResume}
//                 className='2xl:w-[1280px] xl:w-[80%] w-11/12 h-full'
//                 download=''
//             >
//             </object>
//         </div>
//     );
// };

// export default ViewResume;