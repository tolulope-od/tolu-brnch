import { createContext, useState, useReducer } from 'react';

const initialState = {
  messages: [],
  viewingSingleUserMessages: false,
  messageRoomId: '',
  roomMessages: [],
};

function init(initState) {
  return initState;
}

const MessagesContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "setMessages":
      return {
        ...state,
        messages: action.payload,
      }
    case "viewRoom":
      return {
        ...state,
        viewingSingleUserMessages: true,
        messageRoomId: action.payload,
      }
      case "viewingRoomMessages":
      return {
        ...state,
        roomMessages: action.payload,
      }
    case "reset":
      return init(initialState);
    default:
      return initialState
  }
}

export const MessagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <MessagesContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

export default MessagesContext;