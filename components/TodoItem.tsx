import React from "react";
import classes from "../styles/modules/todoItem.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "@/store/todoSlice";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";

const TodoItem: React.FC<{ todo: any }> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [props.todo.status]);

  let classesApplied = [];
  if (props.todo.status === "complete") {
    classesApplied = [classes.todoText, classes["todoText--completed"]];
  } else {
    classesApplied = [classes.todoText];
  }

  const deleteHandler = () => {
    dispatch(deleteTodo(props.todo.id));
    toast.success("Task Deleted Successfully!");
  };

  const editHandler = () => {
    setModalOpen(true);
  };

  const checkBoxClickHandler = () => {
    setChecked((prev) => !prev);
    dispatch(
      updateTodo({
        ...props.todo,
        status: !checked ? "complete" : "incomplete",
      })
    );
  };

  return (
    <React.Fragment>
      <div className={classes.item}>
        <div className={classes.todoDetails}>
          <CheckButton checked={checked} onCheck={checkBoxClickHandler} />
          <div className={classes.texts}>
            <p className={classesApplied.join(" ")}>{props.todo.title}</p>
            <p className={classes.time}>{props.todo.time}</p>
          </div>
        </div>
        <div className={classes.todoActions}>
          <div className={classes.icon} onClick={deleteHandler}>
            <MdDelete />
          </div>
          <div className={classes.icon} onClick={editHandler}>
            <MdEdit />
          </div>
        </div>
      </div>
      {modalOpen && (
        <TodoModal
          setModalOpen={setModalOpen}
          type="update"
          todo={props.todo}
        />
      )}
    </React.Fragment>
  );
};

export default TodoItem;
