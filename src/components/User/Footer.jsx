import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handlePrivacy = () => {
    navigate("/privacy");
  };
  const handleSupport = () => {
    navigate("/support");
  };
  return (
    <div
      className="w-screen md:h-20 h-12 mt-2"
      style={{
        borderTopRightRadius: "80% 10px",
        borderTopLeftRadius: "80% 10px",
      }}
    >
      <div className="flex justify-center">
        <button
          className="md:text-lg md:px-6 text-xs px-3"
          onClick={handlePrivacy}
        >
          Privacy{" "}
        </button>
        <button
          className="md:text-lg md:px-6 text-xs px-3"
          onClick={handleSupport}
        >
          Support{" "}
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <hr style={{ width: "20%" }} className="border" />
      </div>
      <div className="flex justify-center mt-2 text-xs">
        &copy; {new Date().getFullYear()} TrueROI. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
