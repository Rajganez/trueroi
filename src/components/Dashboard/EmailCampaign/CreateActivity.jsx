const CreateActivity = () => {
  return (
    <>
      <div className="w-[50%] flex">
        <div>
          <div className="lg:text-2xl text-lg mx-5 lg:mt-10 mt-5">
            Activity Name
          </div>
          <div className="lg:text-2xl text-lg mx-5 lg:mt-10 mt-5">
            Recipient
          </div>
          <div className="lg:text-2xl text-lg mx-5 lg:mt-10 mt-5">Subject</div>
          <div className="lg:text-2xl text-lg mx-5 lg:mt-10 mt-5">Message</div>
          <div className="lg:text-2xl text-lg mx-5 lg:mt-10 mt-5">
            Signature
          </div>
        </div>
        <div className="w-1 mt-5 bg-gray-200 rounded-full lg:h-[22rem] h-64 dark:bg-gray-700">
          <div className="bg-blue-600 h-52 rounded-full">`</div>
        </div>
        <div className="w-[50%] mt-5">
          <div className="lg:mt-5 mt-2">
            <div className="ml-5 lg:flex lg:justify-between">
              <div>
                <input
                  type="text"
                  placeholder="Enter Acitivity Name"
                  className="p-2 border rounded-2xl border-orange-600"
                />
              </div>
              <div className="">
                <button
                  className="ml-10 px-5 p-2 border rounded-3xl bg-orange-500 
                hover:bg-orange-700 hover:text-gray-100"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="lg:mt-8 mt-2">
            <div className=" w-screen">
              <button className="p-2 border mx-10 px-10 bg-orange-500 rounded-3xl">
                Select From List
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateActivity;
