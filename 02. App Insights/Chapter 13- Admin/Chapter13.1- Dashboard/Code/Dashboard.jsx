import PageTitle from "../../Pages/Shared/PageTitle";
import OrderList from "./OrderList";
import TopSaleCourse from "./TopSaleCourse";
import RefundTerms from "./RefundTerms";

const Dashboard = () => {
  return (
    <>
      <PageTitle title="Admin Dashboard" />
      <div className="mt-5 mb-20">
        {/* <!-- Top Sale Courses area --> */}
        <TopSaleCourse />

        {/* <!-- Recent Order list area --> */}
        <OrderList />
        {/*  */}
        <RefundTerms />
      </div>
    </>
  );
};

export default Dashboard;
