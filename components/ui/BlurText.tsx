"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, type Easing } from "motion/react";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom" | "left" | "right";
  onAnimationComplete?: () => void;
  className?: string;
}

export default function BlurText({
  text,
  delay = 100,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
}: BlurTextProps) {
  const controls = useAnimation();
  const hasStarted = useRef(false);

  const items = animateBy === "words" ? text.split(" ") : text.split("");

  const getDirectionOffset = () => {
    switch (direction) {
      case "top":
        return { y: -20, x: 0 };
      case "bottom":
        return { y: 20, x: 0 };
      case "left":
        return { x: -20, y: 0 };
      case "right":
        return { x: 20, y: 0 };
      default:
        return { y: -20, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      controls.start("visible").then(() => {
        onAnimationComplete?.();
      });
    }
  }, [controls, onAnimationComplete]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      ...offset,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as Easing,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{ marginRight: animateBy === "words" ? "0.3em" : "0" }}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}
