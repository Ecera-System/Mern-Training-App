import PageTitle from '../../Pages/Shared/PageTitle';
import OrderList from './OrderList';
import TopSaleCourse from './TopSaleCourse';

const Dashboard = () => {
    return (<>
        <PageTitle title="Admin Dashboard" />
        <div className='mt-5 mb-20'>
        {/* <!-- Top Sale Courses area --> */}
            <TopSaleCourse />

        {/* <!-- Recent Order list area --> */}
            <OrderList />
        </div>
    </>);
};

export default Dashboard;