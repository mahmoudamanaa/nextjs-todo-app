import PageTitle from "@/components/PageTitle";
import Head from "next/head";
import { Fragment } from "react";
import classes from "../styles/modules/app.module.css";
import AppHeader from "@/components/AppHeader";
import AppContent from "@/components/AppContent";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Todo App</title>
      </Head>
      <PageTitle>Todo List</PageTitle>
      <div className={classes.app__wrapper}>
        <AppHeader />
        <AppContent />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </Fragment>
  );
}
