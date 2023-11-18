import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import Sidebar from './Sidebar';

const Profile = () => {
    return (<>
        <Header profile={true} />
        <div className="w-full h-auto bg-violet-50">
            <div className="2xl:max-w-7xl w-full h-full mx-auto flex items-start lg:gap-8 gap-4">
                <div className='sticky top-[72px] left-0 lg:w-72 w-max h-full border bg-white'>
                    <Sidebar />
                </div>
                <div className='lg:w-[calc(100%-18rem)] w-full lg:pr-8 pr-4'>
                    <Outlet />
                </div>
            </div>
        </div>
        <Footer />
    </>);
};

export default Profile;