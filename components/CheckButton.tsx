import classes from "../styles/modules/todoItem.module.css";
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const checkVariants = {
  initial: {
    color: "#fff",
  },
  checked: {
    pathLength: 1,
  },
  unchecked: {
    pathLength: 0,
  },
};

const boxVariants = {
  checked: {
    background: "#646ff0",
    transition: { duration: 0.1 },
  },
  unchecked: {
    background: "#eee",
    transition: { duration: 0.1 },
  },
};

const CheckButton: React.FC<{
  checked: boolean;
  onCheck: () => void;
}> = (props) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      className={classes.svgBox}
      variants={boxVariants}
      animate={props.checked ? "checked" : "unchecked"}
      onClick={props.onCheck}
    >
      <motion.svg
        className={classes.svg}
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          style={{ pathLength, opacity }}
          animate={props.checked ? "checked" : "unchecked"}
          variants={checkVariants}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></motion.path>
      </motion.svg>
    </motion.div>
  );
};

export default CheckButton;
