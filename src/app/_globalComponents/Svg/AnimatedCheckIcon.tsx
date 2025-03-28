import { motion } from "framer-motion";

const AnimatedCheckIcon = () => {
  return (
    <svg
      viewBox="0 0 512 512"
      height="4em"
      width="4em"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient
          id="checkmarkGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>

      <motion.path
        d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"
        stroke="url(#checkmarkGradient)"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "linear" }}
      />
    </svg>
  );
};

export default AnimatedCheckIcon;
