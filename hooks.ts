/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useEffect, useState } from "react";

/**
 * Returns the last message received.
 *
 * Component rerenders on receiving a new message.
 */
export function useMessage() {
  const [message, setMessage] = useState<object | null>(null);

  function updateMessage(e: MessageEvent) {
    setMessage(e.data);
  }

  useEffect(() => {
    window.addEventListener("message", updateMessage);
    return () => window.removeEventListener("message", updateMessage);
  }, []);

  return message;
}
