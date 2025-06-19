import React, { useState } from "react";

import classes from "./Chat.module.css";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";

export default function Chat() {

  const [showChat, setShowChat] = useState(false);

  const showChatHandler = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  }

  return (
    <div className={classes.chatFloating}>
      {
        showChat && <ChatWindow/>
      }
      <ChatBubble onShowChat={showChatHandler} />
    </div>
  );
}
