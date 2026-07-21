"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function AnimatedButton({ children, onClick }: ButtonProps) {
  return (
    <motion.button
      // Tap (Click) micro-interaction
      whileTap={{ scale: 0.95 }}
      // Hover spring animation
      whileHover={{ 
        scale: 1.05,
        backgroundColor: "#1e40af" // Smoothly fades to dark blue
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }}
      onClick={onClick}
      // Tailwind handling layout and fluid responsiveness
      className="w-full sm:w-auto px-6 py-3 font-medium text-white bg-black rounded-xl shadow-lg transition-colors duration-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      {children}
    </motion.button>
  );
}
