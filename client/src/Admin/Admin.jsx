import { Outlet } from 'react-router-dom';
import PageTitle from '../Pages/Shared/PageTitle';
import Sidebar from './Sidebar';

const Admin = () => {
    return (<>
        <PageTitle title="Admin Dashboard" />
        <div className="w-full h-auto bg-violet-50">
            <div className="2xl:w-[1280px] w-full h-full mx-auto flex items-start lg:gap-8 gap-4">
                <div className='sticky top-0 left-0 lg:w-72 w-max h-full border bg-white'>
                    <Sidebar />
                </div>
                <div className='lg:w-[calc(100%-18rem)] w-full lg:pr-8 pr-4 overflow-hidden'>
                    <Outlet />
                </div>
            </div>
        </div>
    </>);
};

export default Admin;