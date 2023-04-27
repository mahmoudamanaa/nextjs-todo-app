import React, {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import classes from "../styles/modules/button.module.css";

const Button: React.FC<{
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  role: string;
  type: string;
  onClick: () => void;
}> = (props) => {
  let classesApplied = [];
  if (props.role === "primary") {
    classesApplied = [classes.button, classes["button--primary"]];
  } else {
    classesApplied = [classes.button, classes["button--secondary"]];
  }

  return (
    <button
      className={classesApplied.join(" ")}
      type={props.type === "submit" ? "submit" : "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
