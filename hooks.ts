/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useEffect, useState } from "react";
import { GraphQueryResult, Message } from "./types";

/**
 * Returns the last message received.
 *
 * Component rerenders on receiving a new message.
 */
function useMessage<T extends Message["type"], U extends Extract<Message, { type: T }>["data"]>(typeFilter: T): U | null {
  const [message, setMessage] = useState<U | null>(null);

  function updateMessage(e: MessageEvent<Message>) {
    const data = e.data;

    if (data.type === typeFilter) {
      setMessage(data.data as U);
    }
  }

  useEffect(() => {
    window.addEventListener("message", updateMessage);
    return () => window.removeEventListener("message", updateMessage);
  }, []);

  return message;
}

export function useGraphData() {
  return useMessage("GraphData");
}

export function useMLData() {
  return useMessage("MLData");
}