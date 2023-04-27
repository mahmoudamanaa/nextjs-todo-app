import Button from "./Button";
import SelectButton from "./SelectButton";
import classes from "../styles/modules/app.module.css";
import TodoModal from "./TodoModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "@/store/todoSlice";
import React from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../store/store";

const AppHeader = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const initialFilter = useAppSelector((state) => state.todo.filter);

  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const addTaskToShowModalHandler = () => {
    setModalOpen(true);
  };

  const filterHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    dispatch(updateFilter(event.target.value));
  };

  return (
    <div className={classes.appHeader}>
      <Button role="primary" type="button" onClick={addTaskToShowModalHandler}>
        Add Task
      </Button>
      <SelectButton
        role="secondary"
        id="status"
        onChange={filterHandler}
        value={initialFilter}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">complete</option>
      </SelectButton>
      {modalOpen && (
        <TodoModal setModalOpen={setModalOpen} type="add" todo={{}} />
      )}
    </div>
  );
};

export default AppHeader;
