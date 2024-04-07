/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useEffect, useState } from "react";
import { Message } from "./message";

/**
 * Returns the last message received,
 * or `null` if no message has been sent  yet.
 *
 * Component rerenders on receiving a new message.
 *
 * @param typeFilter The type of messages to listen for.
 */
function useMessage<
  T extends Message["type"],
  U extends Extract<Message, { type: T }>["data"]
>(typeFilter: T): U | null {
  const [message, setMessage] = useState<U | null>(null);

  function updateMessage(e: MessageEvent<Message>) {
    const data = e.data;

    if (data.type === typeFilter) {
      setMessage(data.data as U);
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps -- dependency cannot change */
  useEffect(() => {
    window.addEventListener("message", updateMessage);
    return () => window.removeEventListener("message", updateMessage);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return message;
}

/**
 * Returns the last message containing graph data
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 */
export function useGraphData() {
  return useMessage("GraphData");
}

/**
 * Returns the last message containing machine learning data
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 */
export function useMLData() {
  return useMessage("MLData");
}

/**
 * Returns the last message containing visualization settings
 * that has been sent, or `null` if no such message has been sent.
 *
 * Component rerenders on receiving a new message.
 */
export function useSettings() {
  return useMessage("MLData");
}
