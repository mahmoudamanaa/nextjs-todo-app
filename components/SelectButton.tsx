import React, {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import classes from "../styles/modules/button.module.css";

const SelectButton: React.FC<{
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
  id: string;
  onChange: any;
  value: any;
}> = (props) => {
  let classesApplied = [];
  if (props.role === "primary") {
    classesApplied = [classes.button, classes["button--primary"]];
  } else {
    classesApplied = [classes.button, classes["button--secondary"]];
  }

  return (
    <select
      className={classesApplied.join(" ")}
      onChange={props.onChange}
      value={props.value}
    >
      {props.children}
    </select>
  );
};

export default SelectButton;
