import { useState } from "react";
import { motion } from "framer-motion";
import RegisterFace from "../assets/register1.jpg";
import Footer from "../components/Footer";
import { clientAPI } from "../api/axios-api.js";
import { REGISTER_ROUTE } from "../api/constants.js";

const Register = () => {
  const [iconFont, setIconFont] = useState(false);
  const intialData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(intialData);
  const [error, setError] = useState();
  // Function to handle mouse enter and leave
  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerAPI = async () => {
    try {
      const response = await clientAPI.post(REGISTER_ROUTE, formData);
      console.log(response);
    } catch (error) {
      console.log(error);
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

    if (
      loginMail === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      setError("All Fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password and Conform Password does not match");
    } else {
      registerAPI();
      console.log(formData);
      // setFormData(intialData);
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
      <div
        className="bg-[#DBD9F7] md:h-[30rem] h-[100%] md:mt-32 mt-24 relative"
        style={{
          borderBottomLeftRadius: "80% 150px",
        }}
      >
        <div className="md:flex grid grid-cols-2">
          <div className="border-2 border-[#968ff3] w-0 h-[18rem] lg:ml-20 ml-5 md:flex hidden"></div>
          <div
            className="ml-1 mt-5 overflow-hidden"
            style={{
              borderTopRightRadius: "40%",
            }}
          >
            <img src={RegisterFace} width={150} className="rounded-xl" />
          </div>
          <div className="md:w-[30%] md:ml-10 md:mt-20 ml-2 mt-2 col-span-2">
            <strong>TROI:</strong>Simplify Your Marketing, Amplify Your Impact.
            Empower your business with targeted campaigns, authentic feedback,
            and high-quality lead generation all in one place.
            <br />
            <br /> Get Your True ROI For Free
          </div>
          <div className="mt-5 mb-10 lg:ml-36 ml-10 col-span-2">
            <div className="md:text-2xl text-lg">Register Here</div>
            <div className="mt-3">
              <form>
                <div className="mt-3">
                  <div>
                    <label>
                      Name<span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    className="p-2 rounded-xl ml-2 mt-1 lg:w-[150%] md:w-[screen] "
                    type="text"
                    placeholder="Enter Your Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-3">
                  <div>
                    <label>
                      Email<span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    className="p-2 rounded-xl ml-2 mt-1 lg:w-[150%] md:w-[screen]"
                    type="email"
                    placeholder="john@yourmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-3">
                  <div>
                    <label>
                      Password<span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    className="p-2 rounded-xl ml-2 mt-1 lg:w-[150%] md:w-[screen]"
                    type="password"
                    placeholder="Enter Your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-3">
                  <div>
                    <label>
                      Confirm Password<span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    className="p-2 rounded-xl ml-2 mt-1 lg:w-[150%] md:w-[screen]"
                    type="password"
                    placeholder="Enter Your password again"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-5 ml-10">
                  <motion.button
                    type="submit"
                    className="rounded-full p-2 bg-blue-900 text-white shadow-lg shadow-blue-900/50"
                    style={{ width: "80%" }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={handleSubmit}
                  >
                    Register
                  </motion.button>
                </div>
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
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default Register;
