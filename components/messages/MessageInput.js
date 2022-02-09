import * as React from "react";
import axios from 'axios';
import { useMessages } from "../../hooks/useMessages";

function MessageInput() {
  let userId;
  if (typeof localStorage === "object" && localStorage?.userId) {
    userId = localStorage.userId;
  }
  const [message, setMessage] = React.useState('');
  const { state, dispatch } = useMessages();
  const sendMessage = async (msg = null) => {
    try {
      const body = {
        messageBody: msg || message,
        roomId: state.messageRoomId,
        senderId: userId,
      };

      const request = await axios.post('/api/v1/messages', body);
      dispatch({
        type: 'viewingRoomMessages',
        payload: [...state.roomMessages, request.data.data],
      });
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  const searchData = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const result = state.messages.map((message) => message.messages.filter((msg) => 
    msg.messageBody.toLowerCase().includes(lowerCaseTerm)));
  }
  return (
    <div>
      {
        state.viewingSingleUserMessages && (
          <div className="flex flex-row justify-around p-2">
            <button
              onClick={async () => {
                await sendMessage('Thank you!');
              }}
              className="border border-2 rounded-full border-gray-400 px-3">
              Thank you!
            </button>
            <button
            onClick={async () => {
                await sendMessage('Have a great day!');
              }}
            className="border border-2 rounded-full border-gray-400 px-3">
              Have a great day!
            </button>
            <button
            onClick={async () => {
                await sendMessage('How may I help you today?');
              }}
            className="border border-2 rounded-full border-gray-400 px-3">
              How may I help you today?
            </button>
            <button
            onClick={async () => {
                await sendMessage('Would that be all?');
              }}
            className="border border-2 rounded-full border-gray-400 px-3">
              Would that be all?
            </button>
            <button
            onClick={async () => {
                await sendMessage("You're welcome");
              }}
            className="border border-2 rounded-full border-gray-400 px-3">
              You're welcome
            </button>
          </div>
        )
      }
      <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        <input type="text" placeholder="Type a message"
          value={message}
          onKeyPress={async (event) => {
            if (event.key === "Enter") {
              await sendMessage();
            }
          }}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message" required autoComplete="off" />
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
        <button type="submit" onClick={async (event) => {
          await sendMessage();
        }}>
          <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  )
};

export default MessageInput;