import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSound } from "../context/SoundContext";


const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(
    "Initializing Server 604 Terminal...",
  );
  const { playSound } = useSound();
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    playSound("startup");

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onCompleteRef.current?.(), 1000);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    const statusUpdates = [
      "Securing presidential channel...",
      "Connecting to NAP management...",
      "Calibrating season 1 metrics...",
      "Preparing neural handshake...",
      "Ready for submission.",
    ];

    let currentStatus = 0;
    const statusInterval = setInterval(() => {
      if (currentStatus < statusUpdates.length) {
        setStatus(statusUpdates[currentStatus]);
        currentStatus++;
      } else {
        clearInterval(statusInterval);
      }
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(statusInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-darkSlate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="relative mb-12">
        <motion.div
          className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/logo.jpg" alt="Server 604" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute -inset-6 border-2 border-white/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="w-64 md:w-96 relative">
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div
            className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex justify-between items-center font-orbitron text-[10px] tracking-widest text-blueGray">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {status}
          </motion.span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Futuristic Grid background for loader */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
