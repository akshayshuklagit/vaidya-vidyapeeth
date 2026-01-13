import { motion } from "framer-motion";

const GradientBackground = ({ children, className = "", variant = "warm" }) => {
  const isBlue = variant === "blue";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient blobs (themeable) */}
      <motion.div
        className={
          isBlue
            ? "absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-600/30 rounded-full filter blur-3xl"
            : "absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400/30 to-amber-600/30 rounded-full filter blur-3xl"
        }
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={
          isBlue
            ? "absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-sky-600/30 rounded-full filter blur-3xl"
            : "absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-600/30 rounded-full filter blur-3xl"
        }
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={
          isBlue
            ? "absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full filter blur-3xl"
            : "absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-amber-500/20 rounded-full filter blur-3xl"
        }
        animate={{
          x: [-50, 50, -50],
          y: [-50, 50, -50],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Herb SVG overlays (subtle) */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="herbs"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M50,50 Q60,30 70,50 T90,50"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
                className={isBlue ? "text-sky-700" : "text-green-800"}
              />
              <circle
                cx="50"
                cy="50"
                r="3"
                fill="currentColor"
                className={isBlue ? "text-indigo-700" : "text-amber-800"}
              />
              <path
                d="M150,150 Q160,130 170,150 T190,150"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
                className={isBlue ? "text-sky-700" : "text-green-800"}
              />
              <circle
                cx="150"
                cy="150"
                r="3"
                fill="currentColor"
                className={isBlue ? "text-indigo-700" : "text-amber-800"}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#herbs)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientBackground;
