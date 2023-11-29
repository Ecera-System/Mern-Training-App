import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import RequireAuth from "./AuthHook/RequireAuth";
import Profile from "./Pages/Profile/Profile";
import RequireAdmin from "./AuthHook/RequireAdmin";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Dashboard/Dashboard";
import AllCourses from "./Admin/AllCourses/AllCourses";
import Students from "./Admin/Students/Students";
import Assignments from "./Admin/Assignments/Assignments";
import AddCourses from "./Admin/AddCourses/AddCourses";
import AssignmentDetails from "./Admin/Assignments/AssignmentDetails";
import Certificate from "./Admin/Certificate/Certificate";
import CouponCode from "./Admin/CouponCode/CouponCode";
import Settings from "./Admin/Settings/settings";
import MyProfile from "./Pages/Profile/MyProfile/MyProfile";
import Checkout from "./Pages/Checkout/Checkout";
import NotFound from "./Pages/NotFound/NotFound";
import StripeCheckoutMsg from "./Pages/Checkout/StripeCheckoutMsg";
import MyClasses from "./Pages/Profile/ProfileCourse/MyClasses";
import Placements from "./Pages/Placements/Placements";
import Projects from "./Pages/Projects/Projects";
import Programs from "./Pages/Programs/Programs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import BookCounselling from "./Admin/BookCounselling/BookCounselling";
import MERNStackWebDevelopment from "./Pages/Programs/MERNStackWebDevelopment";
import AllUsers from "./Admin/AllUsers/AllUsers";
import MernStackDetails from "./Pages/Projects/MernStackDetails";
import FrontendDetails from "./Pages/Projects/FrontendDetails";
import BackendDetails from "./Pages/Projects/BackendDetails";
import ReactJSDetails from "./Pages/Projects/ReactJSDetails";
import NodeJSDetails from "./Pages/Projects/NodeJSDetails";
import OrderHistory from "./Pages/Profile/OrderHistory/OrderHistory";
import MyReward from "./Pages/Profile/MyReward/MyReward";
import ProfileAssignments from "./Pages/Profile/Assignments/ProfileAssignments";
import '@fortawesome/fontawesome-free/css/all.css';
import BillingAddress from "./Pages/Profile/BillingAddress/BillingAddress.jsx";
import ActivateCode from "./Pages/Auth/ActivateCode";

const App = () => {
  return (<>
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/programs" element={<Programs />}></Route>
      <Route path="/programs/mern-stack-web-development" element={<MERNStackWebDevelopment />}></Route>
      <Route path="/activateCode" element={<ActivateCode />}></Route>
      

      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/projects/mern-stack" element={<MernStackDetails />}></Route>
      <Route path="/projects/frontend" element={<FrontendDetails />}></Route>
      <Route path="/projects/backend" element={<BackendDetails />}></Route>
      <Route path="/projects/react-js" element={<ReactJSDetails />}></Route>
      <Route path="/projects/node-js" element={<NodeJSDetails />}></Route>

      <Route path="/placements" element={<Placements />}></Route>
      <Route path="/course/checkout/:id" element={
        <RequireAuth>
          <Checkout />
        </RequireAuth>
      }></Route>
      <Route path="/stripe/checkout/course/:id" element={<StripeCheckoutMsg />}></Route>
      <Route path="/contact" element={<ContactUs />}></Route>

      <Route path="/profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      }>
        <Route path="/profile" element={<MyProfile />}></Route>
        <Route path="/profile/course" element={<MyClasses />}></Route>
        <Route path="/profile/assignments" element={<ProfileAssignments />}></Route>
        <Route path="/profile/address" element={<BillingAddress />}></Route>
        <Route path="/profile/my-reward" element={<MyReward />}></Route>
        <Route path="/profile/order-history" element={<OrderHistory />}></Route>
        <Route path="/profile/certificates" element={<Certificate/>}></Route>
      </Route>


      {/* <!== === === === Admin === === === === */}
      <Route path="/admin" element={
        <RequireAdmin>
          <Admin />
        </RequireAdmin>
      }>
        <Route path="/admin" element={<Dashboard />}></Route>
        <Route path="/admin/add-course" element={<AddCourses />}></Route>
        <Route path="/admin/all-courses" element={<AllCourses />}></Route>
        <Route path="/admin/students" element={<Students />}></Route>
        <Route path="/admin/assignments" element={<Assignments />}></Route>
        <Route path="/admin/assignments/:id" element={<AssignmentDetails />}></Route>
        <Route path="/admin/coupon-code" element={<CouponCode />}></Route>
        <Route path="/admin/certificate" element={<Certificate />}></Route>
        <Route path="/admin/book-counselling" element={<BookCounselling />}></Route>
        <Route path="/admin/all-users" element={<AllUsers />}></Route>
        <Route path="/admin/Settings/settings" element={<Settings/>}></Route>
      </Route>

      <Route path="/*" element={<NotFound />}></Route>

    </Routes>
  </>);
}

export default App;
