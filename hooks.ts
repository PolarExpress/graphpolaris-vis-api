import { useEffect, useState } from "react"

/**
 * Returns the last message received.
 * 
 * Component rerenders on receiving a new message.
 */
export function useMessage() {
    const [message, setMessage] = useState("");

    function updateMessage(e: MessageEvent) {
        setMessage(e.data);
    }

    useEffect(() => {
        window.addEventListener("message", updateMessage);
        return () => window.removeEventListener("message", updateMessage);
    }, []);

    return message;
}