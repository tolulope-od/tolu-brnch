import * as React from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useToggle from "../../hooks/useToggle";
import { useMessages } from "../../hooks/useMessages";
import SideMenuMessagesLoading from "./SideMenuMessagesLoading";
import { truncateText } from "../../utils/truncateText";

dayjs.extend(relativeTime);

function SideMenuMessages() {
  let userId;
  if (typeof localStorage === "object" && localStorage?.userId) {
    userId = localStorage.userId;
  }
  const [messagesLoading, { toggle: toggleMessagesLoading }] = useToggle();
  const { state, dispatch } = useMessages();
  const fetchMessages = async () => {
    toggleMessagesLoading()
    try {
      const request = await axios.get('/api/v1/messages', {
        headers: {
          userId
        }
      });
      const messages = request.data.data;

      const mappedMessages = messages
        .filter((message) => message.senderId.userType !== 'agent')
        .reduce((accumulator, message) => {
          if (!accumulator[message.senderId.username]) {
            accumulator[message.senderId.username] = {
              user: message.senderId,
              messages: [],
            };
          }

          accumulator[message.senderId.username].messages.push(message);
          return accumulator;
        }, {});
      dispatch({
        type: 'setMessages',
        payload: Object.values(mappedMessages),
      });
    } catch (error) {
      console.log(error);
    } finally {
      toggleMessagesLoading();
    }
  }

  React.useEffect(() => {
    if (userId) {
      fetchMessages();
    }
  }, []);
  return (
    <ul className="overflow-auto h-[32rem]">
      <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
      {
        messagesLoading ? (
          <SideMenuMessagesLoading />
        ) : (
          <li>
            {
              state.messages.map((message) => (
                <a
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch({
                      type: 'viewRoom',
                      payload: message.messages[0].roomId,
                    })
                  }}
                  key={message.user._id}
                  className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <img className="object-cover w-10 h-10 rounded-full"
                    src="https://www.clipartmax.com/png/full/97-978328_avatar-icon-free-fa-user-circle-o.png" alt={message?.user?.username} />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">{message.user.username}</span>
                      <span className="block ml-2 text-sm text-gray-600">
                        {dayjs(message.messages[message.messages.length - 1]?.timestamp).fromNow()}
                      </span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">{
                      truncateText(message.messages[message.messages.length - 1]?.messageBody, 50, '...')
                    }</span>
                  </div>
                </a>
              ))
            }
          </li>
        )
      }
    </ul>
  )
}

export default SideMenuMessages;