import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import TodoItem from "./TodoItem";
import classes from "../styles/modules/app.module.css";
import { useEffect, useState } from "react";

const AppContent = () => {
  const [content, setContent] = useState<any>();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const todoList = useAppSelector((state) => state.todo.todoList);
  const filter = useAppSelector((state) => state.todo.filter);

  const filteredItems = todoList.filter((item: { status: string }) => {
    if (filter === "all") {
      return true;
    }
    return item.status === filter;
  });

  useEffect(() => {
    if (filteredItems.length > 0) {
      setContent(
        filteredItems.map((todo: any) => <TodoItem todo={todo} key={todo.id} />)
      );
    } else {
      setContent(<div className={classes.emptyText}>No Todos</div>);
    }
  }, [filteredItems]);

  return <div>{content}</div>;
};

{
  /* <div className={classes["content__wrapper"]}>
  {filteredItems.length > 0 &&
    filteredItems.map((todo: any) => <TodoItem todo={todo} key={todo.id} />)}
  {!(filteredItems.length > 0) && (
    <div className={classes.emptyText}>No Todos</div>
  )}
</div>; */
}

export default AppContent;
