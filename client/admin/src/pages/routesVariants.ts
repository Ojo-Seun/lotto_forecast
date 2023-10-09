import { AnimationProps } from "framer-motion";

export const RoutesVariants: AnimationProps["variants"] = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.2 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};
