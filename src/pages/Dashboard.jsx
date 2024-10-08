import { lazy, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { IoHomeOutline } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";
import { MdOutlineMailOutline, MdOutlineEditCalendar } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { VscFeedback } from "react-icons/vsc";
import { LuListTodo } from "react-icons/lu";
import { CgBrowser } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { LOGOUT_ROUTE } from "../api/constants";
import { clientAPI } from "../api/axios-api";
import { useBlocker, useNavigate } from "react-router-dom";
// import { LiaCrownSolid } from "react-icons/lia";
const LandingPage = lazy(() => import("../components/Dashboard/LandingPage"));
const Todo = lazy(() => import("../components/Dashboard/Todo"));
const MessageCampaign = lazy(() =>
  import("../components/Dashboard/MessageCampaign/MessageCampaign")
);
const Testimonials = lazy(() => import("../components/Dashboard/Testimonials"));
const Contacts = lazy(() => import("../components/Dashboard/Contacts"));
const CustomModal = lazy(() => import("../components/User/CustomModal"));
const EmailCampaign = lazy(() =>
  import("../components/Dashboard/EmailCampaign")
);
const UserDashboard = lazy(() =>
  import("../components/Dashboard/UserDashboard")
);
const Calendar = lazy(() => import("../components/Dashboard/Calendar"));

// Reusable Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, onClick }) => (
  <div
    className="lg:mx-3 md:mx-2 md:p-1 lg:p-3 flex hover:bg-[#bde6a9] lg:rounded-full 
    cursor-pointer md:rounded-2xl"
    type="button"
    onClick={onClick} // Added onClick handler
  >
    <Icon className="mx-2" />
    {label}
  </div>
);

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, 
};

const Dashboard = () => {
  const [iconFont, setIconFont] = useState(false);
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);

  const navigate = useNavigate();
  // Function to handle mouse enter and leave
  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);

  // Function to render content based on active sidebar item
  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return <UserDashboard />;
      case "Contacts":
        return <Contacts />;
      case "Calendar":
        return <Calendar />;
      case "Email Campaign":
        return <EmailCampaign />;
      case "Message Campaign":
        return <MessageCampaign />;
      case "Testimonial Campaign":
        return <Testimonials />;
      case "Todo":
        return <Todo />;
      case "Landing Page":
        return <LandingPage />;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  const isAuthenticated = () => {
    return localStorage.getItem("auth_token");
  };

  //To prevent the user to return to the login without closing the session
  let blocker = useBlocker(
    ({ nextLocation }) =>
      isAuthenticated() &&
      (nextLocation.pathname === "/login" ||
        nextLocation.pathname === "/home" ||
        nextLocation.pathname === "/")
  );
  const handleStay = () => {
    blocker.reset();
  };

  const logoutAPI = async () => {
    try {
      const response = await clientAPI.post(LOGOUT_ROUTE);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/home");
      }
      blocker.proceed();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    logoutAPI();
  };

  return (
    <div className="md:flex h-screen">
      {blocker.state === "blocked" ? (
        <CustomModal
          message={"Do You want to Leave this Page"}
          onConfirm={handleLogout}
          onCancel={handleStay}
        />
      ) : null}
      {/* Sidebar */}
      <div className="md:w-[20%] bg-[#F9FFF6]">
        <div
          className="mt-2 md:p-1 ml-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="text-4xl md:text-6xl text-red-950 font-bold"
            style={{ fontFamily: "Abreviater" }}
          >
            T
          </span>
          {iconFont && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-xl md:text-3xl text-blue-900"
            >
              rue
            </motion.span>
          )}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 1 }}
            className="text-3xl md:text-5xl text-blue-950"
          >
            ROI
          </motion.span>
          <motion.hr
            style={{ width: iconFont ? "50%" : "20%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="ml-1 border-black"
          />
          <div className="ml-5 md:ml-10 text-xs font-thin mt-1 text-black">
            Get yours
          </div>
        </div>
        <hr className="my-2" />

        {/* Sidebar Navigation */}
        <div className="mt-5 lg:text-xl hidden md:block">
          <SidebarItem
            icon={IoHomeOutline}
            label="Dashboard"
            onClick={() => setActiveContent("Dashboard")}
          />
          <SidebarItem
            icon={RiContactsLine}
            label="Contacts"
            onClick={() => setActiveContent("Contacts")}
          />
          <SidebarItem
            icon={MdOutlineEditCalendar}
            label="Calendar"
            onClick={() => setActiveContent("Calendar")}
          />
          <SidebarItem
            icon={MdOutlineMailOutline}
            label="Email Campaign"
            onClick={() => setActiveContent("Email Campaign")}
          />
          <SidebarItem
            icon={TiMessages}
            label="Message Campaign"
            onClick={() => setActiveContent("Message Campaign")}
          />
          <SidebarItem
            icon={VscFeedback}
            label="Testimonial Campaign"
            onClick={() => setActiveContent("Testimonial Campaign")}
          />
          <SidebarItem
            icon={LuListTodo}
            label="Todo"
            onClick={() => setActiveContent("Todo")}
          />
          <SidebarItem
            icon={CgBrowser}
            label="Landing Page"
            onClick={() => setActiveContent("Landing Page")}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="md:w-[80%] h-screen md:p-4 p-1">
        <div className="h-20 flex justify-end">
          <RxHamburgerMenu
            className="md:hidden text-4xl cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div>
            <CgProfile
              className="lg:text-6xl text-4xl ml-5 text-green-800"
              type="button"
              onClick={() => setShowLogoutOptions(!showLogoutOptions)}
              style={{ cursor: "pointer" }}
            />
            {showLogoutOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {isSidebarOpen && (
          <div className="md:hidden bg-[#F9FFF6] p-4">
            <SidebarItem
              icon={IoHomeOutline}
              label="Dashboard"
              onClick={() => {
                setActiveContent("Dashboard");
                setIsSidebarOpen(false); // Close sidebar after clicking
              }}
            />
            <SidebarItem
              icon={RiContactsLine}
              label="Contacts"
              onClick={() => {
                setActiveContent("Contacts");
                setIsSidebarOpen(false);
              }}
            />
            <SidebarItem
              icon={MdOutlineEditCalendar}
              label="Calendar"
              onClick={() => {
                setActiveContent("Calendar");
                setIsSidebarOpen(false);
              }}
            />
            <SidebarItem
              icon={MdOutlineMailOutline}
              label="Email Campaign"
              onClick={() => {
                setActiveContent("Email Campaign");
                setIsSidebarOpen(false);
              }}
            />
            <SidebarItem
              icon={TiMessages}
              label="Message Campaign"
              onClick={() => {
                setActiveContent("Message Campaign");
                setIsSidebarOpen(false);
              }}
            />
            <SidebarItem
              icon={VscFeedback}
              label="Testimonial Campaign"
              onClick={() => {
                setActiveContent("Testimonial Campaign");
                setIsSidebarOpen(false);
              }}
            />
            <SidebarItem
              icon={LuListTodo}
              label="Todo"
              onClick={() => {
                setActiveContent("Todo");
                setIsSidebarOpen(false);
              }}
            />
            <SidebarItem
              icon={CgBrowser}
              label="Landing Page"
              onClick={() => {
                setActiveContent("Landing Page");
                setIsSidebarOpen(false);
              }}
            />
          </div>
        )}
        {/* Main dashboard content based on selected sidebar item */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
