import Video from "../assets/demo.mp4";

const Demo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
            <form>
              <div className="lg:text-2xl text-xs p-1 m-1">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="border rounded-2xl p-3 m-1 bg-transparent text-black"
                />
              </div>
              <div className="lg:text-2xl text-xs p-1 m-1 ">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="border rounded-2xl p-3 m-1 bg-transparent text-black"
                />
              </div>
              <div className="lg:text-2xl text-xs p-1 m-1">
                <input
                  type="text"
                  placeholder="Enter Your Number"
                  className="border rounded-2xl p-3 m-1 bg-transparent text-black"
                />
              </div>
              <div className="mt-2 ml-7 lg:ml-20 md:mt-3">
                <button
                  className="border lg:text-2xl text-xs rounded-full hover:bg-[white] 
                hover:text-black text-white bg-[#f65b07] border-black px-10 p-1"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
