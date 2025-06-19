// import React, { useEffect, useState } from "react";
// import socketIO from "socket.io-client";

// import classes from "./ChatWindow.module.css";
// import { Button, Card } from "react-bootstrap";
// import CardHeader from "react-bootstrap/esm/CardHeader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
// const SERVER_HOST = import.meta.env.VITE_SERVER;

// // Initialize socket io client on load
// let socket;
// if (!socket) {
//   socket = socketIO(SERVER_HOST, { transports: ["websocket"] });
// }

// export default function ChatWindow() {
//   const [inputMessage, setInputMessage] = useState("");
//   const [roomId, setRoomId] = useState(null);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     //This is for load chat history when the chat window reopen
//     // Chekc if there is roomId in local storage or not, then emit action to server
//     setRoomId(localStorage.getItem("roomId") || null);
//     if (roomId) {
//       socket.emit("getChats", {
//         roomId,
//       });
//     }
//   }, [roomId]);

//   useEffect(() => {
//     // Make scroll behavior of chat window always at the bottom
//     const chatBody = document.querySelector("#chatBody");
//     if (chatBody) {
//       chatBody.scrollTop = chatBody.scrollHeight;
//     }
//   }, [messages]);

//   const listenforEnter = (e) => {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   };

//   // SocketIO sendMsg emit
//   const sendMessage = () => {
//     if (inputMessage.trim() === "") {
//       return; // If the message is empty, do nothing
//     }
//     if (inputMessage.trim() === "/end") {
//       // Listen for "end" command
//       socket.emit("endChat", {
//         roomId,
//       });
//       localStorage.removeItem("roomId"); // Set all states to default
//       setMessages([]);
//       setRoomId(null);
//       return setInputMessage("");
//     }

//     if (roomId && messages.length <= 0) {
//       socket.emit("joinRoom", {
//         // If there is roomId => had old chat history => emit joinRoom
//         roomId,
//         msg: { message: inputMessage, from: "customer" },
//       });
//       setRoomId(roomId);
//     } else if (roomId && messages.length > 0) {
//       // Having roomId and also haveing messages => customer is chatting atm => emit sendMsg
//       socket.emit("sendMsg", {
//         roomId,
//         msg: { message: inputMessage, from: "customer" },
//       });
//     } else {
//       socket.emit("createRoom", {
//         // no roomId , no messages => new chat => emit createRoom
//         from: "customer",
//         message: inputMessage,
//       });
//     }

//     setInputMessage("");
//   };

//   // SocketIO event listeners from the server. //

//   socket.on("receiveChat", (chatData) => {
//     chatData && setMessages(chatData.messages);
//   });

//   socket.on("receiveRoom", (data) => {
//     localStorage.setItem("roomId", data.roomId);
//     setRoomId(data.roomId);
//   });

//   socket.on("receiveMsg", (port) => {
//     setMessages([...messages, port]);
//   });

//   socket.on("endChat", () => {
//     // This listener is to clean up the state when "staff" end the chat
//     localStorage.removeItem("roomId");
//     setMessages([]);
//     setRoomId(null);
//     return setInputMessage("");
//   });

//   return (
//     <div className={classes.chat_windowWrapper}>
//       <Card className={classes.chat_chatWindow}>
//         <CardHeader className={classes.chat_chatHeader}>
//           Customer Support
//         </CardHeader>

//         <div className={classes.chat_Body} id="chatBody">
//           {messages.length > 0 &&
//             messages.map((msg, index) => {
//               if (msg.from === "system") {
//                 return (
//                   <div key={index} className={classes.chat_systemMsg}>
//                     {msg.message}
//                   </div>
//                 );
//               }
//               return (
//                 <div
//                   key={messages._id}
//                   className={`${
//                     msg.from === "customer"
//                       ? classes.chat_sendMsg
//                       : classes.chat_receiveMsg
//                   }`}
//                 >
//                   <p>{msg.message}</p>
//                   <span
//                     className={
//                       msg.from === "customer"
//                         ? classes.chat_sendMsgIcon
//                         : classes.chat_receiveMsgIcon
//                     }
//                   >
//                     <FontAwesomeIcon icon={faUser} />
//                   </span>
//                 </div>
//               );
//             })}
//           {/* <div className={classes.chat_sendMsg}>
//             <p>Hi shop</p>
//             <span className={classes.chat_sendMsgIcon}>
//               <FontAwesomeIcon icon={faUser} />
//             </span>
//           </div>
//           <div className={classes.chat_receiveMsg}>
//             <p>Chào bạn!</p>
//             <span className={classes.chat_receiveMsgIcon}>
//               <FontAwesomeIcon icon={faHeadset} />
//             </span>
//           </div> */}
//         </div>
//         <div className={`${classes.chat_chatFooter} card-footer`}>
//           <div className={classes.chat_chatFooterInputWrapper}>
//             <span className={classes.chat_chatFooterIcon}>
//               <FontAwesomeIcon icon={faUser} />
//             </span>
//             <input
//               className={classes.chat_chatFooterInput}
//               type="text"
//               placeholder="Enter here to chat, type /end to end chat."
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyDown={listenforEnter}
//             />
//           </div>
//           <div
//             className={`${classes.chat_chatFooterActions} d-flex align-items-center`}
//           >
//             <Button onClick={sendMessage}>
//               <FontAwesomeIcon icon={faPaperPlane} /> Send
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";

import classes from "./ChatWindow.module.css";
import { Button, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";

const SERVER_HOST = import.meta.env.VITE_SERVER;

export default function ChatWindow() {
  const [inputMessage, setInputMessage] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  // Khởi tạo socket và các sự kiện
  useEffect(() => {
    const socket = socketIO(SERVER_HOST, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("receiveChat", (chatData) => {
      chatData && setMessages(chatData.messages);
    });

    socket.on("receiveRoom", (data) => {
      localStorage.setItem("roomId", data.roomId);
      setRoomId(data.roomId);
    });

    socket.on("receiveMsg", (port) => {
      setMessages((prev) => [...prev, port]);
    });

    socket.on("endChat", () => {
      localStorage.removeItem("roomId");
      setMessages([]);
      setRoomId(null);
      setInputMessage("");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Khi mở lại tab chat
  useEffect(() => {
    const existingRoom = localStorage.getItem("roomId");
    setRoomId(existingRoom);
    if (existingRoom && socketRef.current) {
      socketRef.current.emit("getChats", { roomId: existingRoom });
    }
  }, []);

  // Scroll to bottom khi có tin nhắn
  useEffect(() => {
    const chatBody = document.querySelector("#chatBody");
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [messages]);

  const listenforEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const sendMessage = () => {
    const message = inputMessage.trim();
    if (!message) return;

    if (!socketRef.current) return;

    if (message === "/end") {
      socketRef.current.emit("endChat", { roomId });
      localStorage.removeItem("roomId");
      setMessages([]);
      setRoomId(null);
      setInputMessage("");
      return;
    }

    const msgObj = { message, from: "customer" };

    if (roomId && messages.length === 0) {
      socketRef.current.emit("joinRoom", { roomId, msg: msgObj });
    } else if (roomId && messages.length > 0) {
      socketRef.current.emit("sendMsg", { roomId, msg: msgObj });
    } else {
      socketRef.current.emit("createRoom", { from: "customer", message });
    }

    setInputMessage("");
  };

  return (
    <div className={classes.chat_windowWrapper}>
      <Card className={classes.chat_chatWindow}>
        <CardHeader className={classes.chat_chatHeader}>
          Customer Support
        </CardHeader>

        <div className={classes.chat_Body} id="chatBody">
          {messages.map((msg, index) => {
            if (msg.from === "system") {
              return (
                <div key={index} className={classes.chat_systemMsg}>
                  {msg.message}
                </div>
              );
            }
            return (
              <div
                key={index}
                className={
                  msg.from === "customer"
                    ? classes.chat_sendMsg
                    : classes.chat_receiveMsg
                }
              >
                <p>{msg.message}</p>
                <span
                  className={
                    msg.from === "customer"
                      ? classes.chat_sendMsgIcon
                      : classes.chat_receiveMsgIcon
                  }
                >
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
            );
          })}
        </div>

        <div className={`${classes.chat_chatFooter} card-footer`}>
          <div className={classes.chat_chatFooterInputWrapper}>
            <span className={classes.chat_chatFooterIcon}>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              className={classes.chat_chatFooterInput}
              type="text"
              placeholder="Enter here to chat, type /end to end chat."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={listenforEnter}
            />
          </div>
          <div
            className={`${classes.chat_chatFooterActions} d-flex align-items-center`}
          >
            <Button onClick={sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} /> Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
