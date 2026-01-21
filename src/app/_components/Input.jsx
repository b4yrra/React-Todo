"use client";
import { useState } from "react";

export const Input = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const changeValue = (event) => {
    setValue(event.target.value);
  };

  const renderTasks = () => {
    if (value === "") {
      return;
    } else {
      const newTask = { task: value, id: Date.now(), isCompleted: false };

      setTasks([...tasks, newTask]);
    }

    setValue("");
  };

  const isCheck = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        } else {
          return task;
        }
      }),
    );
  };

  const deleteBtn = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filterValue = (filter) => {
    setFilter(filter);
  };

  const render = tasks.filter((task) => {
    if (filter === "all") {
      return task;
    }
    return filter === "active" ? !task.isCompleted : task.isCompleted;
  });

  const completedCount = tasks.filter((task) => task.isCompleted).length;

  const clearComplete = () => {
    setTasks((prev) => prev.filter((task) => !task.isCompleted));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new tasks..."
          className="border border-slate-300 w-2xs p-2 rounded-xl"
          value={value}
          onChange={changeValue}
        />
        <button
          className="bg-blue-400 text-xs p-3 text-white font-bold rounded-xl cursor-pointer"
          onClick={renderTasks}
        >
          Add
        </button>
      </div>
      <div className="flex gap-3">
        <button
          className={`p-3 text-xs cursor-pointer rounded-xl ${
            filter === "all"
              ? "bg-blue-600 text-white "
              : "bg-slate-200 text-black"
          }`}
          onClick={() => filterValue("all")}
        >
          All
        </button>
        <button
          className={`p-3 text-xs cursor-pointer rounded-xl ${
            filter === "active"
              ? "bg-blue-600 text-white "
              : "bg-slate-200 text-black"
          }`}
          onClick={() => filterValue("active")}
        >
          Active
        </button>
        <button
          className={`p-3 text-xs cursor-pointer rounded-xl ${
            filter === "complete"
              ? "bg-blue-600 text-white "
              : "bg-slate-200 text-black"
          }`}
          onClick={() => filterValue("complete")}
        >
          Completed
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {render.length === 0 ? (
          <p className="text-gray-500 text-center p-10">
            No tasks yet. Add one above!
          </p>
        ) : (
          render.map((task, index) => {
            return (
              <div
                key={index}
                className="flex justify-between bg-slate-100 p-3 rounded-xl items-center h-fit text-black min-h-15"
              >
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-5"
                    checked={task.isCompleted}
                    onChange={() => isCheck(task.id)}
                  />
                  <div className="w-50 h-fit wrap-break-word">
                    <p
                      className={
                        task.isCompleted
                          ? "line-through text-gray-500 w-50"
                          : ""
                      }
                    >
                      {task.task}
                    </p>
                  </div>
                </div>
                {task.isCompleted && (
                  <button
                    className="text-red-500 bg-red-100 p-2 rounded-2xl cursor-pointer"
                    onClick={() => deleteBtn(task.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
      {render.length === 0 ? (
        <p></p>
      ) : (
        <div className="flex justify-between">
          <div className="text-gray-500">
            {completedCount} of {render.length} tasks completed
          </div>
          <button
            className="text-red-500 cursor-pointer"
            onClick={clearComplete}
          >
            Clear complete
          </button>
        </div>
      )}
    </div>
  );
};
