import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  let localTodoList;
  if (typeof window !== "undefined") {
    localTodoList = localStorage.getItem("todoList");
  }
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  return [];
};

const initialValue = {
  todoList: getInitialTodo(),
  filter: "all",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      let todoList;
      if (typeof window !== "undefined") {
        todoList = localStorage.getItem("todoList");
      }
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({ ...action.payload });
        if (typeof window !== "undefined") {
          localStorage.setItem("todoList", JSON.stringify(todoListArr));
        }
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "todoList",
            JSON.stringify([{ ...action.payload }])
          );
        }
      }
    },
    deleteTodo: (state, action) => {
      let todoList;
      if (typeof window !== "undefined") {
        todoList = localStorage.getItem("todoList");
      }
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo: { id: any }, index: any) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("todoList", JSON.stringify(todoListArr));
        }
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      let todoList;
      if (typeof window !== "undefined") {
        todoList = localStorage.getItem("todoList");
      }
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo: any, index: any) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("todoList", JSON.stringify(todoListArr));
        }
        state.todoList = todoListArr;
      }
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
