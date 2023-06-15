import { motion } from "framer-motion";
import type { MotionProps } from "./index.props";

const FadeIn = (props: MotionProps) => (
  <motion.div
    initial={{
      opacity: 0,
      x: props.initialX ?? 0,
      y: props.initialY ?? -30
    }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{
      duration: props.duration,
      type: "spring",
      delay: props.delay ?? 0.3
    }}
    {...props}
  >
    {props.children}
  </motion.div>
);

FadeIn.displayName = "FadeIn";
export { FadeIn };
