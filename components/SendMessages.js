import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


export function SendMessages() {
  const { orbis, currentConversationDetails } = useContext(GlobalContext);

  const [newMessage, setNewMessage] = useState("");

  const sendNewMessage = async () => {
    try {
      let res = await orbis.sendMessage({
        conversation_id: currentConversationDetails.stream_id,
        body: newMessage
      });
      setNewMessage("");
      console.log("New message sent!:", res);
      getOrbisMessages();
    } catch (error) {
      setNewMessage("");
      console.log("Unable to send new message:", error.message);
    }
  }
  return (
    <form style={newMessageFlex}>
      <input
        type='text'
        id='new-message'
        name='new-message'
        placeholder='Send Message'
        style={newMessageInput}
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)} />
      <button type='submit' onClick={() => sendNewMessage()} style={newMessageSubmit} >
        Send
      </button>
    </form>
  )
}

const newMessageFlex = {
  display: 'flex',
  gap: '10px',
}

const newMessageInput = {
  backgroundColor: '#fff',
  color: '#555',
  padding: '10px',
  borderRadius: '10px',
  border: '1px solid #000',
  flexGrow: '1',
}

const newMessageSubmit = {
  padding: '10px 15px',
  backgroundColor: '#2b77ff',
  border: '0',
  borderRadius: '10px',
  fontWeight: '500',
  boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)',
}