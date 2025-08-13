import type { Transition } from "framer-motion";
import { easeOut } from "framer-motion";

type MotionDirection = "left" | "right" | "up" | "down";
type TransitionType = Exclude<NonNullable<Transition["type"]>, undefined> | "spring" | "tween" | "inertia";

// Text Variant motion
export const textVariant = (delay?: number) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

// FadeIn motion
export const fadeIn = (
  direction: MotionDirection | undefined,
  type: TransitionType,
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type as TransitionType,
        delay: delay,
        duration: duration,
        ease: easeOut,
      },
    },
  };
};

// zoom in motion
export const zoomIn = (delay: number, duration: number) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween" as const,
        delay: delay,
        duration: duration,
        ease: easeOut,
      },
    },
  };
};

// slide in motion
export const slideIn = (
  direction: MotionDirection | undefined,
  type: TransitionType,
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type as TransitionType,
        delay: delay,
        duration: duration,
        ease: easeOut,
      },
    },
  };
};

// staggered container motion
export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number,
) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
