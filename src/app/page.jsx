"use client";

import { Input } from "./_components/Input";

export default function Home() {
  return (
    <div className="flex justify-center mt-40">
      <div className="flex flex-col gap-5 items-center shadow-2xl w-10xs min-h-56 h-fit p-5 rounded-xl">
        <h1 className="text-2xl font-bold text-black">To-Do Lists</h1>
        <Input />
      </div>
    </div>
  );
}
