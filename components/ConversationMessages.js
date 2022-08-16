import Image from "next/image";
import { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


export function ConversationMessages() {
  const { user, orbis, currentConversationDetails } = useContext(GlobalContext);
  const [currentDecryptedMessages, setCurrentDecryptedMessages] = useState([]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  useEffect(() => {
    getOrbisMessages();
  }, [currentConversationDetails]);

  const getOrbisMessages = async () => {
    try {
      let { data, error } = await orbis.getMessages(currentConversationDetails.stream_id);
      if (data) {
        let decryptMessages = [];
        for (const message of data) {
          console.log("This is the outcome of encrypyted message", message);
          let { status, result } = await orbis.decryptMessage(message.content);
          if (status == 200) {
            let messageObject = {
              content: result,
              creator_details: message.creator_details,
              timestamp: message.timestamp
            }
            console.log("This is the outcome of decrypted message", result);
            decryptMessages.push(messageObject);
          } else {
            setCurrentDecryptedMessages([]);
            console.log("Unable to decrypt message:", result);
          }
        }
        console.log("These are the decrypted messages:", decryptMessages);
        setCurrentDecryptedMessages(decryptMessages.reverse());
      }
    } catch (error) {
      setCurrentDecryptedMessages([]);
      console.log("Could not decrypt messages:", error);
    }
  }
  return (
    <div style={messagesBox}>
      <div style={messagesFlex}>
        {!currentDecryptedMessages.length && <div>No messages yet!</div>}
        {currentDecryptedMessages && currentDecryptedMessages.map((message, index) => {
          return (
            <div key={index} style={messageBoxStyle}>
              {message.creator_details.profile?.username &&
                <div style={messageSender}>{message.creator_details.profile.username}</div>}
              <div>{message.content}</div>
            </div>
          )
        })}
        <AlwaysScrollToBottom />
      </div>
    </div>
  )
}

const messagesBox = {
  flexGrow: '1',
  overflow: 'auto',
  padding: '5px',
  border: '1px solid #000',
  borderRadius: '10px',
}

const messagesFlex = {
  display: 'flex',
  flexDirection: 'column',
}

const messageBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  margin: '10px',
  borderRadius: '16px',
  color: '#000',
  alignItems: 'flex-start',
  gap: '5px',
  boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)',
}

const messageSender = {
  fontSize: '12px',
  color: '#666'
}