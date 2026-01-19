"use client";
import { useState } from "react";

export const Input = () => {
  const [value, setValue] = useState("");
  const [render, setRender] = useState([]);

  const changeValue = (event) => {
    setValue(event.target.value);
  };

  const renderTasks = () => {
    if (value === "") {
      return null;
    } else {
      setRender((prev) => [
        ...prev,
        { task: value, id: Date.now(), isCompleted: false },
      ]);
    }

    setValue("");
  };

  const isCheck = (id) => {
    setRender((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        } else {
          return task;
        }
      }),
    );
  };

  const DeleteBtn = (id) => {
    setRender((prev) => prev.filter((task) => task.id !== id));
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
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <div className="flex flex-col gap-2">
        {render.map((task, index) => {
          return (
            <div
              key={index}
              className="flex justify-between bg-slate-100 p-3 rounded-xl items-center h-15"
            >
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  checked={task.isCompleted}
                  onChange={() => isCheck(task.id)}
                />
              </div>
              {task.isCompleted && (
                <button
                  className="text-red-500 bg-red-100 p-2 rounded-2xl cursor-pointer"
                  onClick={() => DeleteBtn(task.id)}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
