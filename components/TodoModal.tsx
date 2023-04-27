import classes from "../styles/modules/modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "@/store/todoSlice";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";

const TodoModal: React.FC<{
  setModalOpen: (b: boolean) => void;
  type: string;
  todo: any;
}> = (props) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.type !== "add") {
      setTitle(props.todo.title);
      setStatus(props.todo.status);
    }
  }, [props.todo, props.type]);

  const titleChangeHandler = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTitle(event.target.value);
  };

  const statusChangeHandler = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setStatus(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (props.type === "add") {
      if (title && status) {
        dispatch(
          addTodo({
            id: uuid(),
            title: title,
            status: status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added Successfully!");
        props.setModalOpen(false);
      } else {
        toast.error("Task Failed To Add!");
      }
    } else {
      if (title && status) {
        dispatch(
          updateTodo({
            ...props.todo,
            title: title,
            status: status,
          })
        );
        toast.success("Task Updated Successfully!");
        props.setModalOpen(false);
      } else {
        toast.error("Task Failed To Update!");
      }
    }
  };

  const cancelToCloseModalHandler = () => {
    props.setModalOpen(false);
  };

  const xToCloseModalHandler = () => {
    props.setModalOpen(false);
  };

  const dummyClickHandler = () => {
    return;
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.closeButton} onClick={xToCloseModalHandler}>
          <MdOutlineClose />
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <h1 className={classes.formTitle}>
            {props.type === "add" ? "Add" : "Update"} Task
          </h1>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              value={title}
              onChange={titleChangeHandler}
            />
          </label>
          <label htmlFor="status">
            Status
            <select
              name="status"
              id="status"
              value={status}
              onChange={statusChangeHandler}
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </label>
          <div className={classes.buttonContainer}>
            <Button role="primary" type="submit" onClick={dummyClickHandler}>
              {props.type === "add" ? "Add" : "Update"} Task
            </Button>
            <Button
              role="secondary"
              type="button"
              onClick={cancelToCloseModalHandler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
