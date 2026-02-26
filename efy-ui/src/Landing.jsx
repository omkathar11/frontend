import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import topSection from "./assets/top-verification.png";
import trustedSection from "./assets/trusted-section.png";
import CreateAccount from "./CreateAccount";
import { useNavigate } from "react-router-dom";

// Advanced Reveal Component with Parallax and Stagger Effects
function Reveal({ children, className = "", delay = 0, direction = "up", duration = 0.6 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const directions = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
    rotate: { rotate: -10, opacity: 0, scale: 0.9 }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={directions[direction] || directions.up}
      animate={isVisible ? { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 } : directions[direction] || directions.up}
      transition={{ duration, delay, type: "spring", stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Magnetic Button Effect
function MagneticButton({ children, onClick, className = "" }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Parallax Background Effect
function ParallaxBackground({ children }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [0.3, 0.1]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-teal-400 rounded-full blur-3xl pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

// Animated Counter
function AnimatedCounter({ from = 0, to, duration = 2 }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(from + (to - from) * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// Floating Elements
function FloatingElement({ children, delay = 0, amplitude = 10, duration = 3 }) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Typewriter Effect
function TypewriterText({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isVisible, text]);

  return <span ref={ref}>{displayText}</span>;
}

// Staggered Children Animation
function StaggerContainer({ children, className = "", staggerDelay = 0.1 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("findEmail");
  const navigate = useNavigate();
  const orbRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${x * 2}px, ${y * 2}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const onHeroMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = py * -8;
    const ry = px * 8;
    if (heroRef.current) {
      heroRef.current.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(20px)`;
    }
  };
  const onHeroLeave = () => {
    if (heroRef.current) {
      heroRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
  };

  const tabs = [
    { id: "findEmail", label: "Find Email" },
    { id: "findDomain", label: "Find by Domain" },
    { id: "lookup", label: "Email Lookup" },
    { id: "verifier", label: "Email Verifier" },
  ];

  const getHeading = () => {
    switch (activeTab) {
      case "findDomain":
        return (
          <>
            Get{" "}
            <motion.span
              className="text-[#6ad8df] inline-block font-semibold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Decision-maker and Employee Emails
            </motion.span>{" "}
            by entering a company domain.
          </>
        );
      case "lookup":
        return (
          <>
            Easily{" "}
            <motion.span
              className="text-[#6ad8df] inline-block font-semibold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Find Lead Data by Email
            </motion.span>{" "}
            to reach out, personalize, and improve conversions.
          </>
        );
      case "verifier":
        return (
          <>
            Verify any{" "}
            <motion.span
              className="text-[#6ad8df] inline-block font-semibold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              email address
            </motion.span>{" "}
            with reliable email checker.
          </>
        );
      default:
        return (
          <>
            Get the{" "}
            <motion.span
              className="text-[#6ad8df] inline-block font-semibold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Email of a Professional
            </motion.span>{" "}
            with a simple search.
          </>
        );
    }
  };

  const getInputFields = () => {
    const inputVariants = {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }
    };

    if (activeTab === "findDomain") {
      return (
        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 flex items-center overflow-hidden rounded-bl-[3rem] rounded-br-[3rem] bg-white/90 shadow-xl"
        >
          <input
            type="text"
            placeholder="Enter Company Domain"
            className="flex-1 px-6 py-4 text-gray-700 outline-none"
          />
          <MagneticButton className="bg-[#2CA1AE] px-8 py-4 font-medium text-white transition hover:bg-[#238A95]">
            Find Email
          </MagneticButton>
        </motion.div>
      );
    }

    if (activeTab === "lookup") {
      return (
        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 flex items-center overflow-hidden rounded-bl-[3rem] rounded-br-[3rem] bg-white/90 shadow-xl"
        >
          <input
            type="email"
            placeholder="Enter Email Address"
            className="flex-1 px-6 py-4 text-gray-700 outline-none"
          />
          <MagneticButton className="bg-[#2CA1AE] px-8 py-4 font-medium text-white transition hover:bg-[#238A95]">
            Find Contact
          </MagneticButton>
        </motion.div>
      );
    }

    if (activeTab === "verifier") {
      return (
        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 flex items-center overflow-hidden rounded-bl-[3rem] rounded-br-[3rem] bg-white/90 shadow-xl"
        >
          <input
            type="email"
            placeholder="Enter Email Address"
            className="flex-1 px-6 py-4 text-gray-700 outline-none"
          />
          <MagneticButton className="bg-[#2CA1AE] px-8 py-4 font-medium text-white transition hover:bg-[#238A95]">
            Verify Email
          </MagneticButton>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        className="mt-12 flex items-center overflow-hidden rounded-bl-[3rem] rounded-br-[3rem] bg-white/90 shadow-xl"
      >
        <input
          type="text"
          placeholder="Full Name"
          className="flex-1 px-6 py-4 text-gray-700 outline-none"
        />
        <input
          type="text"
          placeholder="Domain"
          className="flex-1 px-6 py-4 text-gray-700 outline-none"
        />
        <MagneticButton className="bg-[#2CA1AE] px-8 py-4 font-medium text-white transition hover:bg-[#238A95]">
          Find Email
        </MagneticButton>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen overflow-hidden bg-[#023e56] text-white"
    >
      {/* Animated Background Elements */}
      <ParallaxBackground />
      <FloatingElement amplitude={20} duration={4}>
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
      </FloatingElement>
      <FloatingElement delay={1} amplitude={15} duration={5}>
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </FloatingElement>

      {/* Navbar */}
      <motion.nav
        variants={itemVariants}
        className="flex justify-between items-center px-12 py-6 relative z-10"
      >
        <motion.h1
          className="text-2xl font-bold tracking-wide"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          E-fy
        </motion.h1>

        <StaggerContainer className="flex gap-8 text-gray-300 font-medium" staggerDelay={0.05}>
          {["Home", "Pricing", "Integration", "API"].map((item) => (
            <StaggerItem key={item}>
              <motion.a
                href="#"
                className="hover:text-teal-300 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="flex gap-4 items-center">
          <MagneticButton
            onClick={() => navigate("/login")}
            className="text-gray-300 hover:text-teal-300 transition"
          >
            Login
          </MagneticButton>

          <MagneticButton
            onClick={() => navigate("/signup")}
            className="bg-white text-[#0f4c5c] px-5 py-2 rounded-xl font-medium shadow-md"
          >
            Create Account
          </MagneticButton>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="flex justify-center mt-10 relative z-10 pt-12 pb-40"
      >
        <motion.div
          ref={heroRef}
          onMouseMove={onHeroMove}
          onMouseLeave={onHeroLeave}
          variants={itemVariants}
          whileHover={{ boxShadow: "0 0 100px rgba(0,255,200,0.3)" }}
          className="w-[950px] rounded-3xl border-t border-t-[#1b7c8d] bg-white/5 backdrop-blur-xl py-24 px-16 shadow-[0_0_80px_rgba(0,255,200,0.15)] transition-transform duration-300 will-change-transform"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-semibold text-center leading-snug"
          >
            {getHeading()}
          </motion.h2>

          {/* Tabs */}
          <StaggerContainer className="flex justify-center gap-10 mt-10 text-gray-300 font-medium">
            {tabs.map((tab) => (
              <StaggerItem key={tab.id}>
                <motion.span
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer transition pb-1 ${activeTab === tab.id
                    ? "text-[#6ad8df] border-b-2 border-[#6ad8df]"
                    : "hover:text-[#6ad8df]"
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.span>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Dynamic Inputs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {getInputFields()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Trusted Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-[#f3f8f9]"
      >
        <Reveal direction="scale" duration={1}>
          <motion.img
            src={trustedSection}
            alt="Trusted Users Section"
            className="w-full object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          />
        </Reveal>
      </motion.section>

      {/* Top Email Verification Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white py-24"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl font-bold text-black"
          >
            Top Email Verification Service
          </motion.h2>
        </div>

        <div className="flex justify-center">
          <Reveal direction="scale" duration={1}>
            <motion.img
              src={topSection}
              alt="Top Email Verification"
              className="rounded-3xl shadow-2xl w-[700px]"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
              }}
              transition={{ duration: 0.3 }}
            />
          </Reveal>
        </div>
      </motion.section>

      {/* Bulk Email Verification Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white py-24"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <Reveal direction="left">
            <motion.p
              className="text-gray-600 text-lg leading-relaxed"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              Run our bulk email verification tool through your list of emails to remove
              hard bounces and keep your mailing list clean and engaged. Result
              includes deliverable, invalid, accept-all and other analysis. See how easy
              its to validate email list in bulk.
            </motion.p>

            <motion.a
              href="#"
              className="inline-block mt-8 text-blue-600 font-medium hover:underline"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              All Features →
            </motion.a>
          </Reveal>

          {/* Right Steps */}
          <div className="space-y-10">
            {[
              "Upload your email list",
              "Get free quality analysis of your list",
              "Our list cleaning tool verifies the emails",
              "Download the cleaned list & Send emails"
            ].map((text, index) => (
              <Reveal key={index} direction="right" delay={index * 0.1}>
                <motion.div
                  className="flex items-center gap-6"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#4182ED] text-white font-semibold text-lg shadow-md"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 10px 25px rgba(65,130,237,0.4)"
                    }}
                  >
                    {index + 1}
                  </motion.div>
                  <p className="text-gray-700 text-lg font-medium">{text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Calculator Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-[#f4f6f7] py-24 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-stretch">
          {/* LEFT CARD */}
          <Reveal direction="up">
            <motion.div
              className="bg-gradient-to-b from-white via-white to-[#abdbdf] rounded-[24px] rounded-br-none shadow-xl p-10 relative border-b-[8px] border-b-[#2da0ad] h-full flex flex-col justify-between"
              whileHover={{
                y: -10,
                boxShadow: "0 30px 60px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-center text-[#4a5f74]">
                How many emails do you have?
              </h3>

              <motion.div
                className="mt-6 border border-[#2da0ad] rounded-xl py-4 text-center text-xl font-bold text-[#4a5f74]"
              >
                <AnimatedCounter from={0} to={2000000} duration={2} />
              </motion.div>

              <div className="mt-8 relative pt-2">
                <input
                  type="range"
                  min="1000"
                  max="5000000"
                  defaultValue="2000000"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2da0ad]"
                />
                <div className="flex justify-between text-[#8b9cac] mt-2 text-xs font-medium">
                  <span>1000</span>
                  <span>5M</span>
                </div>
              </div>

              <p className="text-center mt-6 text-[#8b9cac] text-sm">
                or, select an amount...
              </p>

              <div className="grid grid-cols-4 gap-4 mt-6">
                {["5k", "50K", "100K", "250K", "500K", "1M", "2M", "5M"].map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-2xl py-5 text-xl font-bold shadow-sm transition border ${item === "2M"
                      ? "bg-[#2da0ad] text-white border-[#2da0ad]"
                      : "bg-white text-[#2a4563] border-gray-100 hover:border-[#2da0ad]"
                      }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </Reveal>

          {/* RIGHT CARD */}
          <Reveal direction="up" delay={0.2}>
            <motion.div
              className="bg-white rounded-[24px] rounded-br-[64px] shadow-xl pt-10 pb-6 px-10 relative overflow-hidden bg-gradient-to-b from-white via-white to-[#abdbdf] border border-white h-full flex flex-col justify-between"
              whileHover={{
                y: -10,
                boxShadow: "0 30px 60px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 text-sm text-[#4a5f74] font-medium justify-center whitespace-nowrap">
                <span>Pay-As-You-Go</span>
                <div className="w-10 h-5 bg-[#d8ebed] rounded-full relative cursor-pointer flex items-center px-1">
                  <motion.div className="w-3.5 h-3.5 bg-[#2da0ad] rounded-full absolute right-1" />
                </div>
                <span className="text-[#13324f] font-bold">Monthly</span>
              </div>

              <div className="text-center mt-6">
                <p className="line-through text-[#8b9cac] text-lg font-medium inline-block mr-2">
                  $800.00
                </p>
                <div className="flex flex-col items-center">
                  <motion.h2
                    className="text-6xl font-extrabold text-[#113250] tracking-tight -mt-1"
                  >
                    $736.00
                  </motion.h2>
                  <p className="text-center text-white bg-[#2da0ad] mt-2 text-sm px-3 rounded-full font-medium inline-block mx-auto border border-white">
                    Save $64.00
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center w-full mt-6 mb-4 text-[#13324f]">
                <div className="text-center pr-8 border-r border-[#8b9cac]/30">
                  <p className="text-sm font-semibold mb-1 uppercase text-[#8b9cac] text-xs tracking-wider">ANNUAL</p>
                  <p className="text-xl font-bold">$736.00</p>
                  <p className="text-[#8b9cac] text-xs">Credit</p>
                </div>
                <div className="text-center pl-8">
                  <p className="text-sm font-semibold mb-1 uppercase text-[#8b9cac] text-xs tracking-wider">MONTHLY</p>
                  <p className="text-xl font-bold">$0.0004</p>
                  <p className="text-[#8b9cac] text-xs">Cost per credit</p>
                </div>
              </div>

              <MagneticButton className="w-full mt-4 bg-[#113250] text-white py-4 rounded-3xl text-lg font-semibold shadow-lg hover:bg-[#0a233b]">
                Get Started Free!
              </MagneticButton>

              <p className="text-center text-xs text-[#4a5f74] mt-3 font-medium">
                Includes 100 free credits
              </p>

              <div className="w-full mt-6">
                <ul className="space-y-3 text-[#2da0ad] text-sm font-medium tracking-tight">
                  {[
                    "No Monthly Payments",
                    "Credits Never Expire",
                    "No Upfront Fee",
                    "All Prices Include Taxes And Fees."
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 text-center text-xs font-bold text-[#113250]">
                <p>We support</p>
                <div className="flex justify-center gap-2 mt-3 text-xs w-full max-w-[240px] mx-auto">
                  {["PayPal", "VISA", "stripe", "AMEX"].map((payment, index) => (
                    <motion.span
                      key={index}
                      className="flex-1 py-1.5 bg-white text-[#113250] rounded border border-gray-200 font-bold uppercase"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {payment}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </motion.section>

      {/* Enterprise FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white py-28 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl font-bold text-black"
          >
            Enterprise Email Validation — FAQ
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg mt-6 leading-relaxed max-w-3xl mx-auto"
          >
            Answers to the most common questions about scaling, securing, and integrating enterprise-grade email validation.
          </motion.p>
        </div>

        <Reveal direction="up" className="relative z-10">
          <FAQAccordion />
        </Reveal>

        {/* Footer Shapes & Background */}
        <div className="absolute -bottom-40 right-[-10%] w-[60%] h-[400px] bg-[#4caec4] rounded-tl-full opacity-60 pointer-events-none" style={{ transform: "rotate(15deg)" }} />
        <div className="absolute -bottom-20 right-[-5%] w-[40%] h-[300px] bg-[#0c596b] rounded-tl-full pointer-events-none" style={{ transform: "rotate(10deg)" }} />
      </motion.section>

      {/* Footer / Data Protection Area */}
      <motion.footer
        className="relative bg-gradient-to-b from-white via-[#eaf4f5] to-[#c7e5e8] py-20 overflow-hidden"
      >
        <div className="text-center text-[#115b6d] font-medium text-sm mt-10">
          <p>Data Protection Policy</p>
        </div>

        {/* Floating Chat Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 w-14 h-14 bg-[#0c596b] rounded-full shadow-2xl flex items-center justify-center z-50 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </motion.button>
      </motion.footer>
    </motion.div>
  );
}

function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What makes your email validation solution enterprise-grade?",
      answer:
        "Our platform uses advanced SMTP checks, AI-powered detection, and real-time verification infrastructure designed to handle millions of emails securely and efficiently.",
    },
    {
      question: "How secure is the data we upload?",
      answer:
        "We use enterprise-level encryption (SSL/TLS), secure servers, and strict data handling policies.",
    },
    {
      question: "Can we integrate email validation into our internal systems?",
      answer:
        "Yes, we provide REST APIs and integration support.",
    },
    {
      question: "Is onboarding and support included for enterprise clients?",
      answer:
        "Enterprise clients receive dedicated onboarding and priority support.",
    },
    {
      question: "How is pricing structured for enterprise volumes?",
      answer:
        "Pricing is flexible and volume-based with custom enterprise plans.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-16 px-6">
      <motion.div
        className="bg-white rounded-3xl shadow-xl divide-y"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            className="p-6"
          >
            <motion.button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.99 }}
            >
              <span
                className={`text-lg font-medium ${activeIndex === index ? "text-teal-700" : "text-gray-800"
                  }`}
              >
                {faq.question}
              </span>

              <motion.span
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-teal-600"
              >
                ▼
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 text-sm mt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}