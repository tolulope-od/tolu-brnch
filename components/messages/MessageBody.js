import * as React from "react";
import axios from "axios";
import { useMessages } from "../../hooks/useMessages";
import useToggle from "../../hooks/useToggle";
import MessagesBodyLoading from "./MessagesBodyLoading";

function MessageBody() {
  let userId;
  if (typeof localStorage === "object" && localStorage?.userId) {
    userId = localStorage.userId;
  }
  const { state, dispatch } = useMessages();
  const [messagesLoading, { toggle: toggleMessagesLoading }] = useToggle();

  const fetchRoomMessages = async () => {
    toggleMessagesLoading();
    try {
      const request = await axios.get(`/api/v1/messages/${state.messageRoomId}`);

      console.log(request.data);
      dispatch({
        type: 'viewingRoomMessages',
        payload: request.data.data,
      })
    } catch (error) {
      console.log(error);
    } finally {
      toggleMessagesLoading();
    }
  }
  React.useEffect(() => {
    fetchRoomMessages();
  }, [state.messageRoomId]);
  return (
    <React.Fragment>
      {
        !state.viewingSingleUserMessages ? (
          <div className="h-[32rem] flex justify-center items-center align-center">
            <h2 className="text-center text-2xl font-bold">Click on a message to view more</h2>
          </div>
        ) : (
          <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
            <ul className="space-y-2">
              {
                !messagesLoading && state.roomMessages.map((message) => (
                  <li className={`flex ${message.senderId._id === userId ? 'justify-end' : 'justify-start'}`} key={message._id}>
                    <div className={`relative max-w-xl px-4 py-2 text-gray-700 ${message.senderId._id === userId ? 'bg-gray-100' : ''} rounded shadow`}>
                      <span className="block">{message.messageBody}</span>
                    </div>
                  </li>
                ))
              }
              {
                messagesLoading && (
                  <MessagesBodyLoading />
                )
              }
            </ul>
          </div>
        )
      }
    </React.Fragment>
  )
}

export default MessageBody