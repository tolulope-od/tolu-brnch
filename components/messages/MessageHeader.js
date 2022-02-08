import * as React from "react";
import { useMessages } from "../../hooks/useMessages";

function MessageHeader() {
  const { state } = useMessages();
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      {
        !state.viewingSingleUserMessages ? (
          <div />
        ) : (
          <React.Fragment>
            <img className="object-cover w-10 h-10 rounded-full"
              src="https://www.clipartmax.com/png/full/97-978328_avatar-icon-free-fa-user-circle-o.png" alt="username" />
            <div className="flex flex-col">
              <span className="block ml-2 font-bold">{
                state.roomMessages[0]?.senderId?.firstName
              } {
                  state.roomMessages[0]?.senderId?.lastName
                }</span>

              <p className="ml-2 text-xs block text-italic text-gray-600">{`   `}@{
                state.roomMessages[0]?.senderId?.username
              }</p>
            </div>

          </React.Fragment>
        )
      }
    </div>
  )
}

export default MessageHeader;