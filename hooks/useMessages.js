import { useContext } from "react";
import MessagesContext from "../context/MessagesContext";

export function useMessages() {
  const messagesContext = useContext(MessagesContext);

  if (messagesContext === undefined) {
    return Error("useMessages must be used within a Messages Provider");
  }

  return messagesContext;
}