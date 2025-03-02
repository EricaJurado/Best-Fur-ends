import { useEffect, useState } from "react";
import { DevvitMessage, BlocksToWebviewMessage } from "../shared";

/**
 * Triggers re-renders when a message is received from the Devvit webview.
 *
 */
export const useDevvitListener = <T extends BlocksToWebviewMessage["type"]>(
  eventType: T
) => {
  type Event = Extract<BlocksToWebviewMessage, { type: T }>;
  const [data, setData] = useState<Event["payload"] | undefined>();

  useEffect(() => {
    const messageHandler = (ev: MessageEvent<DevvitMessage>) => {
      if (ev.data.type !== "devvit-message") {
        console.warn(
          `Received message with type ${ev.data.type} but expected 'devvit-message'`
        );
        return;
      }

      const message = ev.data.data.message;
      if (message.type === eventType) {
        setData(message.payload as any);
      }
    };

    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  }, [eventType]);

  return data;
};
