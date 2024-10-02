import { useState } from "react";
import TestimonialList from "./Testimonial/TestimonialList";
import TestimonialsCreation from "./Testimonial/TestimonialsCreation";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [createStrategy, setCreateStrategy] = useState(false);
  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="mx-5 lg:text-4xl text-2xl text-blue-950">
          Testimonials
        </div>
        <div className="mx-2 md:text-xl text-xs text-blue-950">
          <motion.button
            className="bg-blue-900 lg:text-xl hover:bg-blue-950 rounded-full 
          text-white p-3 shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCreateStrategy(!createStrategy)}
          >
            {createStrategy ? "Back to Testimonials" : "Generate Link"}
          </motion.button>
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
