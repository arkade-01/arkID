import { motion } from "framer-motion";

const Home = () => {
  // Subtle shake variants for different cards
  const shakeVariants = [
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
      {/* Question mark icon */}
      <div className="absolute top-8 right-8">
        <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-xl font-bold">
          ?
        </div>
      </div>
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="font-custom font-light text-5xl lg:text-[100px] text-[#1C1C1E] leading-[100%] tracking-tight text-center">
            Get in the <span className="font-black">ARK</span>
          </h1>
          <p className="text-base lg:text-[30px] leading-tight font-light text-center">
            A securely designed payment method that actually sails.
          </p>
          <button className="bg-[#1C1C1E] font-light text-white text-lg lg:text-[20px] px-8 py-4 rounded-lg mt-4 hover:bg-[#2C2C2E] transition-colors">
            JOIN THE WAITLIST
          </button>
        </div>
      </div>

      <div className="relative w-full h-64 lg:h-50 overflow-hidden">
        <motion.img
          src="/Bigshot-Card-back-one.svg"
          alt="Card-one"
          animate={shakeVariants[0]}
          className="absolute bottom-0 left-[2%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(-15deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-front-two.svg"
          alt="Card-two"
          animate={shakeVariants[1]}
          className="absolute bottom-0 left-[15%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(-8deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-back-three.svg"
          alt="Card-three"
          animate={shakeVariants[2]}
          className="absolute bottom-0 left-[32%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(5deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-frontfour.svg"
          alt="Card-four"
          animate={shakeVariants[3]}
          className="absolute bottom-0 left-[48%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(-3deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-front-five.svg"
          alt="Card-five"
          animate={shakeVariants[4]}
          className="absolute bottom-0 left-[65%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(8deg)" }}
        />
        <motion.img
          src="/Bigshot-Card-back-six.svg"
          alt="Card-six"
          animate={shakeVariants[5]}
          className="absolute bottom-0 left-[78%] w-48 lg:w-64 h-auto"
          style={{ transform: "rotate(-12deg)" }}
        />
      </div>
    </main>
  );
};

export default Home;
