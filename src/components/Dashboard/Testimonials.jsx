import { useState } from "react";
import TestimonialList from "./Testimonial/TestimonialList";
import TestimonialsCreation from "./Testimonial/TestimonialsCreation";

const Testimonials = () => {
  const [createStrategy, setCreateStrategy] = useState(false);
  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="mx-5 lg:text-4xl text-2xl text-blue-950">
          Testimonials
        </div>
        <div className="mx-2 md:text-xl text-xs text-blue-950">
          <button
            className="hover:bg-[#9222fb] bg-[#b066f6] rounded-full p-2"
            onClick={() => setCreateStrategy(!createStrategy)}
          >
            {createStrategy ? "Back to Testimonials" : "Generate Link"}
          </button>
        </div>
      </div>
      <div className="mx-5 mt-5 lg:text-2xl text-xl">
        Generate Testimonial Link
      </div>
      {!createStrategy ? <TestimonialList /> : <TestimonialsCreation />}
    </>
  );
};

export default Testimonials;
