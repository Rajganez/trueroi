import { useState } from "react";
import Video from "../../assets/demo.mp4";
import { clientAPI } from "../../api/axios-api.js";
import { DEMO_DETAILS_ROUTE } from "../../api/constants.js";

const Demo = () => {
  const initialData = {
    name: "",
    email: "",
    number: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");

  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form inputs
  const validateForm = () => {
    const { name, email, number } = formData;

    if (!name && !email && !number) {
      setError("All fields are required");
      return false;
    }

    const validEmailDomains = [".com", ".in", ".org", ".dev"];
    const emailDomainValid = validEmailDomains.some((domain) =>
      email.endsWith(domain)
    );

    if (!email.includes("@") || !emailDomainValid) {
      setError("Enter a valid email.");
      return false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(number)) {
      setError("Phone number must be a valid 10-digit number.");
      return false;
    }
    return true;
  };

  const demoDetails = async () => {
    try {
      const response = await clientAPI.post(DEMO_DETAILS_ROUTE, formData);
      if (response.status === 200) {
        alert("You will get a callback");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      demoDetails();
      setError("");
      setFormData(initialData);
    }
  };

  return (
    <div
      className="bg-[#f6bea0] h-[30rem] relative"
      style={{
        borderTopLeftRadius: "80% 80px",
      }}
    >
      <div className="md:flex justify-center">
        <video
          src={Video}
          width="500px"
          height="500px"
          controls
          className="mt-16 md:ml-5"
        />
        <div className="lg:text-4xl text-gray-700 text-2xl md:ml-15 ml-7 md:pt-10 pt-5">
          <span>Book for a Demo</span>
          <div className="md:mt-10 mt-3">
            <form onSubmit={handleSubmit}>
              <div className="lg:text-2xl text-xs p-1 m-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border rounded-2xl p-3 m-1 bg-transparent text-black"
                />
              </div>
              <div className="lg:text-2xl text-xs p-1 m-1 ">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border rounded-2xl p-3 m-1 bg-transparent text-black"
                />
              </div>
              <div className="lg:text-2xl text-xs p-1 m-1">
                <input
                  type="text"
                  name="number"
                  placeholder="Enter Your Number"
                  value={formData.number}
                  onChange={handleInputChange}
                  maxLength={10}
                  required
                  className="border rounded-2xl p-3 m-1 bg-transparent text-black"
                />
              </div>
              <div className="mt-2 ml-7 lg:ml-20 md:mt-3">
                <button
                  type="submit"
                  className="border lg:text-2xl text-xs rounded-full hover:bg-[white] 
                hover:text-black text-white bg-[#f65b07] border-black px-10 p-1"
                >
                  Submit
                </button>
              </div>
              {error && (
                <div className="text-red-500 mt-3 ml-7 lg:ml-20">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
