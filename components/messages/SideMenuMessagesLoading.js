import * as React from "react";

const loaders = [1, 2, 3, 4, 5]

function SideMenuMessagesLoading() {
  return (
    <li>
      {
        loaders.map((loader) => (
          <a
            key={loader.toString()}
            className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
            <span style={{ alignSelf: 'normal' }} className="w-10 mr-3 h-10 rounded-full align-center animate-pulse bg-gray-300"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <h2 className="bg-gray-200 animate-pulse h-4 w-1/4 mb-2"></h2>
                <span className="block ml-2 text-sm animate-pulse h-4 w-1/6 bg-gray-300" />
              </div>
              <span className="block text-sm bg-gray-200 animate-pulse h-4 w-1/2 mb-2" />
            </div>
          </a>
        ))
      }
    </li>
  )
}

export default SideMenuMessagesLoading;