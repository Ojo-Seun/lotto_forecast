import { AnimationProps } from "framer-motion";

export const RoutesVariants: AnimationProps["variants"] = {
  initial: { opacity: 0, x: 1000 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: -1000, transition: { duration: 0.5 } },
};
