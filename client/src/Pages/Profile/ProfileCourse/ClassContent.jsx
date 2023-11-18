import React, { useState } from 'react';
import PageTitle from '../../Shared/PageTitle';
import { MdKeyboardArrowDown, MdOutlineArrowBackIos } from 'react-icons/md';

const ClassContent = ({ content, setContent }) => {
    const [moduleIndex, setModuleIndex] = useState(0);
    const [videoIndex, setVideoIndex] = useState(0);
    const [cntIndex, setCntIndex] = useState(0);

    // <!-- Next Video -->
    const handleNextVideo = () => {
        const moduleVideos = content.modules[moduleIndex]?.videos;
        if (videoIndex < moduleVideos.length - 1) {
            setVideoIndex(prev => prev + 1);
        }
        else if (moduleIndex < content.modules.length - 1) {
            setModuleIndex(prev => prev + 1);
            setCntIndex(moduleIndex + 1);
            setVideoIndex(0);
        }
    };

    // <!-- Previous Video -->
    const handlePreviousVideo = () => {
        if (videoIndex > 0) {
            setVideoIndex(prev => prev - 1);
        }
        else if (moduleIndex > 0) {
            setModuleIndex(prev => prev - 1);
            setCntIndex(moduleIndex - 1);
            setVideoIndex(content.modules[moduleIndex - 1].videos.length - 1);
        }
    };

    return (<>
        <PageTitle title="Course content" />
        <div className="mt-5 mb-28 w-full text-gray-600">
            <div className="p-5 bg-white border rounded-lg text-center relative">
                <button
                    onClick={() => setContent(null)}
                    className='absolute top-5 left-5 px-3 py-1 hover:bg-violet-100 duration-300 border rounded text-sm flex items-center gap-1'
                >
                    <MdOutlineArrowBackIos /> Back
                </button>
                <h1 className="text-xl font-semibold mb-3">
                    {content.title}
                </h1>
                <p className="font-medium text-sm">
                    Total Modules : {content.modules.length}
                </p>
            </div>
            {(content.modules.length !== 0) ? content.modules[0].videos.length !== 0 ?
                <div className='flex items-start justify-between gap-7 mt-5'>
                    <div className='w-2/3'>
                        <h1 className='text-2xl font-medium text-violet-600'>
                            {content.modules[moduleIndex].videos[videoIndex].title || 'Select a video'}
                        </h1>
                        <div className='pt-3'>
                            <video
                                title={content.modules[moduleIndex].videos[videoIndex].title}
                                src={content.modules[moduleIndex].videos[videoIndex].video}
                                className='w-full max-w-full h-[25rem] bg-black'
                                controls
                                autoPlay
                                allowFullScreen
                                controlsList="nodownload"
                            />
                            <div className='flex items-center justify-end gap-3 mt-2'>
                                <button
                                    onClick={handlePreviousVideo}
                                    disabled={videoIndex === 0 && moduleIndex === 0}
                                    className={`px-3 py-1 text-white rounded text-sm ${(videoIndex === 0 && moduleIndex === 0) ? 'bg-slate-400' : 'bg-slate-900'}`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextVideo}
                                    disabled={
                                        (videoIndex === content.modules[moduleIndex].videos.length - 1) &&
                                        (moduleIndex === content.modules.length - 1)
                                    }
                                    className={`px-5 py-1 text-white rounded text-sm ${(videoIndex === content.modules[moduleIndex].videos.length - 1) && (moduleIndex === content.modules.length - 1) ? 'bg-slate-400' : 'bg-slate-900'}`}
                                >
                                    Next
                                </button>
                            </div>
                            <p className='mt-1 text-sm'>{content.modules[moduleIndex].videos[videoIndex].description}</p>
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <ul className='list-none flex flex-col gap-4'>
                            <li>
                                <h2 className='text-lg font-medium text-gray-800 text-center'>Course Content</h2>
                            </li>
                            {
                                content.modules.map((item, mIndex) => <li
                                    key={mIndex}
                                    className='bg-white px-5 py-3 rounded border'
                                >
                                    <button
                                        onClick={() => setCntIndex(pre => pre !== mIndex ? mIndex : null)}
                                        className='w-full flex items-center justify-between'
                                    >
                                        <h3 className='text-base font-medium text-violet-600 capitalize'>{item.title}</h3>
                                        <MdKeyboardArrowDown
                                            className={`inline-block text-3xl duration-500 ${cntIndex === mIndex ? 'rotate-180' : 'rotate-0'}`}
                                        />
                                    </button>
                                    <ul className={`overflow-hidden flex flex-col gap-1 maxH-0 ${cntIndex === mIndex ? 'maxH-full mt-3' : ''}`}>
                                        {
                                            item.videos.map((video, vIndex) => <li key={video._id}>
                                                <button
                                                    className={`w-full pl-3 pr-5 py-3 rounded text-start flex gap-2 ${moduleIndex === mIndex && videoIndex === vIndex ? 'bg-violet-600 text-white' : 'bg-violet-50'}`}
                                                    onClick={() => {
                                                        setModuleIndex(mIndex)
                                                        setVideoIndex(vIndex)
                                                    }}
                                                >
                                                    <span className='w-max h-full'>{vIndex + 1}.</span>
                                                    {video.title}
                                                </button>
                                            </li>)
                                        }
                                    </ul>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
                : <div className='text-center py-20 bg-white border rounded-lg mt-6'>
                    <h4 className='md:text-3xl text-xl font-medium text-gray-500'>
                        The video is not cooked yet!
                    </h4>
                </div>
                : <div className='text-center py-20 bg-white border rounded-lg mt-6'>
                    <h4 className='md:text-3xl text-xl font-medium text-gray-500'>
                        The module is not cooked yet!
                    </h4>
                </div>
            }
        </div>
    </>);
};

export default ClassContent;