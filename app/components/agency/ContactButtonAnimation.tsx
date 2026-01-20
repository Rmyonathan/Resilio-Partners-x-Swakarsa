"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactButtonAnimation() {
  return (
    <div className="flex items-center justify-center gap-2">
      <motion.div
        animate={{
          x: [0, 4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center"
      >
        <Send size={18} className="text-white" />
      </motion.div>
      <motion.span
        animate={{
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-white font-semibold text-sm whitespace-nowrap"
      >
        Get in touch
      </motion.span>
    </div>
  );
}
