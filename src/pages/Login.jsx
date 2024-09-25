import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ListImg from "../assets/loademailid.png";
import TestimonialLink from "../assets/gettestimoniallink.png";
import HappyCustomer from "../assets/generateleads.png";
import Footer from "../components/User/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { clientAPI } from "../api/axios-api.js";
import { LOGIN_ROUTE } from "../api/constants.js";

const images = [ListImg, TestimonialLink, HappyCustomer];

const Login = () => {
  const [iconFont, setIconFont] = useState(false);

  const intiailData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(intiailData);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [alertForLogin, setAlertForLogin] = useState(false);

  const navigate = useNavigate();

  // Function to cycle through the images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Function to handle mouse enter and leave
  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginAPI = async () => {
    try {
      const response = await clientAPI.post(LOGIN_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        // success handling
        setAlertForLogin(true);
        alert("Logged in successfully");
        localStorage.setItem("auth_token", response.data.userId);
        navigate("/dashboard");
      } else {
        alert("Error Logging in please try again");
      }
      // success handling
    } catch (error) {
      console.log(error);
      // error handling
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginMail = formData.email || "";
    const validEmailDomains = [".com", ".in", ".org", ".dev"];
    const emailDomainValid = validEmailDomains.some((domain) =>
      loginMail.endsWith(domain)
    );

    if (!loginMail.includes("@") || !emailDomainValid) {
      setError("Enter a valid email");
      return;
    }

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(formData.password)) {
      setError(
        "Password must be at least 6 characters long and include letters and numbers."
      );
      return;
    }
    if (loginMail === "" || formData.password === "") {
      setError("Email or Password must not be empty.");
      return;
    } else {
      loginAPI();
      setFormData(intiailData);
      setError("");
    }
  };

  return (
    <>
      <div className="flex justify-between border w-screen h-24 md:h-32 bg-[#DBD9F7] fixed z-50 top-0">
        <div
          className="mt-5 md:p-1 md:ml-10 ml-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="text-4xl md:text-6xl text-red-950"
            style={{ fontFamily: "Abreviater", fontStyle: "bold" }}
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
      </div>

      {/* Mobile order change using flex and media queries */}
      <div
        className="bg-[#DBD9F7] md:h-[30rem] h-[100%] md:mt-32 mt-24 relative"
        style={{
          borderBottomLeftRadius: "80% 150px",
        }}
      >
        <div className="md:flex flex-col-reverse md:flex-row">
          <div className="lg:ml-60 md:mt-10 w-[30%]">
            <div className="md:text-3xl text-xl mt-2 ml-10">Log In</div>
            <form className="mt-10" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  className="p-2 rounded-xl ml-2 md:w-[80%] w-[screen]"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="p-2 rounded-xl ml-2 md:w-[80%] w-[screen]"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-5 ml-2">
                <motion.button
                  type="submit"
                  className="rounded-full p-2 bg-blue-900 text-white shadow-lg shadow-blue-900/50"
                  style={{ width: "80%" }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  Log In
                </motion.button>
              </div>
              <div className="lg:text-lg flex text-xs mt-5 ml-2">
                Not a User?{" "}
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="text-blue-800 hover:text-blue-500 hover:underline ml-2"
                  >
                    Create Your Account
                  </motion.button>
                </Link>
              </div>
              {alertForLogin && <div></div>}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="text-red-500"
                >
                  {error}
                </motion.div>
              )}
            </form>
          </div>

          <div className="lg:text-lg text-xs mt-5 lg:ml-10 ml-2 md:w-[20%]">
            <div>
              Smart Solutions for Customer Success: Update your customer email
              and phone number to the List and send.
            </div>
            <div>
              Accelerate Your Customer Journey: Generate your testimonial link
              and share it with your customer.
            </div>
            <div>Boost Engagement, Drive Results</div>
          </div>

          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={images[currentImage]}
              alt="Carousel Image"
              width={300}
              height={300}
              className="object-contain mt-5 md:ml-10 ml-2 rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
