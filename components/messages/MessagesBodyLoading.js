import * as React from "react";

function MessagesBodyLoading() {
  return (
    <ul className="space-y-2">
      <li className="flex justify-start">
        <div className="relative bg-gray-200 h-10 w-1/2 animate-pulse max-w-xl px-4 py-2 text-gray-300 rounded shadow" />
      </li>
      <li className="flex justify-start">
        <div className="relative bg-gray-200 h-10 w-1/3 animate-pulse max-w-xl px-4 py-2 text-gray-300 rounded shadow" />
      </li>
      <li className="flex justify-end">
        <div className="relative bg-gray-200 h-10 w-1/3 animate-pulse max-w-xl px-4 py-2 text-gray-300 rounded shadow" />
      </li>
      <li className="flex justify-start">
        <div className="relative bg-gray-200 h-10 w-1/2 animate-pulse max-w-xl px-4 py-2 text-gray-300 rounded shadow" />
      </li>
      <li className="flex justify-end">
        <div className="relative bg-gray-200 h-10 w-1/3 animate-pulse max-w-xl px-4 py-2 text-gray-300 rounded shadow" />
      </li>
      <li className="flex justify-end">
        <div className="relative bg-gray-200 h-10 w-1/2 animate-pulse max-w-xl px-4 py-2 text-gray-300 rounded shadow" />
      </li>
      <li className="flex justify-start">
        <div className="relative bg-gray-200 h-10 w-1/4 animate-pulse max-w-xl px-4 py-2 text-gray-300 rounded shadow" />
      </li>
    </ul>
  )
}

export default MessagesBodyLoading;