import { motion } from "framer-motion";
import { Link } from "react-router";
import type { Transition } from "framer-motion";

const Home = () => {
  // Subtle shake variants for different cards
  const shakeVariants: Array<{
    x: number[];
    y: number[];
    transition: Transition;
  }> = [
    {
      x: [0, -1, 1, -0.5, 0.5, 0],
      y: [0, 0.5, -0.5, 1, -1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    {
      x: [0, 0.8, -0.8, 0.5, -0.5, 0],
      y: [0, -1, 1, -0.8, 0.8, 0],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
    {
      x: [0, -0.7, 0.7, -1, 1, 0],
      y: [0, 0.7, -0.7, 0.5, -0.5, 0],
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      },
    },
    {
      x: [0, 1, -1, 0.8, -0.8, 0],
      y: [0, -0.8, 0.8, -1, 1, 0],
      transition: {
        duration: 3.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6,
      },
    },
    {
      x: [0, -0.9, 0.9, -0.6, 0.6, 0],
      y: [0, 0.9, -0.9, 0.7, -0.7, 0],
      transition: {
        duration: 3.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8,
      },
    },
    {
      x: [0, 0.6, -0.6, 0.9, -0.9, 0],
      y: [0, -0.7, 0.7, -0.9, 0.9, 0],
      transition: {
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      },
    },
  ];

  return (
    <main className="min-h-screen bg-[#D9D9D9] relative flex flex-col">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <Link to="/howto">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black flex items-center justify-center text-lg sm:text-xl font-bold hover:bg-black hover:text-white transition-colors cursor-pointer">
            ?
          </div>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
          <h1 className="font-custom font-light text-4xl sm:text-5xl lg:text-[60px] text-[#1C1C1E] leading-[100%] tracking-tight text-center">
            Get in the <span className="font-black">ARK</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-[20px] leading-tight font-light text-center max-w-2xl">
            A securely designed payment method that actually sails.
          </p>
          <Link to="/waitlist">
            <button className="bg-[#1C1C1E] font-light text-white text-base sm:text-lg lg:text-[20px] rounded-[11.25px] mt-2 sm:mt-4 hover:bg-[#2C2C2E] transition-colors lg:w-[500px] w-[250px] px-4 cursor-pointer h-[50px] sm:w-auto">
              GET YOURS  
            </button>
          </Link>
        </div>
      </div>

      <div className="relative w-full h-48 sm:h-64 lg:h-40 overflow-hidden">
        <motion.img
          src="/Bigshot-Card-back-one.svg"
          alt="Card-one"
          animate={shakeVariants[0]}
          className="absolute bottom-0 left-[10%] sm:left-[2%] w-32 sm:w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(-15deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-front-two.svg"
          alt="Card-two"
          animate={shakeVariants[1]}
          className="absolute bottom-0 left-[50%] sm:left-[15%] w-32 sm:w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(-8deg)" }}
        />

        <motion.img
          src="/Bigshot-Card-back-three.svg"
          alt="Card-three"
          animate={shakeVariants[2]}
          className="hidden sm:block absolute bottom-0 left-[32%] lg:left-[32%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(5deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-frontfour.svg"
          alt="Card-four"
          animate={shakeVariants[3]}
          className="hidden sm:block absolute bottom-0 left-[48%] lg:left-[48%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(-3deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-front-five.svg"
          alt="Card-five"
          animate={shakeVariants[4]}
          className="hidden sm:block absolute bottom-0 left-[65%] lg:left-[65%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(8deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-back-six.svg"
          alt="Card-six"
          animate={shakeVariants[5]}
          className="hidden sm:block absolute bottom-0 left-[78%] lg:left-[78%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(-12deg)" }}
        />
      </div>
    </main>
  );
};

export default Home;
