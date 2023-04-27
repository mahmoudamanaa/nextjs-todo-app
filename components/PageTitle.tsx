import React from "react";
import classes from "../styles/modules/title.module.css";

const PageTitle = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return <p className={classes.title}>{props.children}</p>;
};

export default PageTitle;
