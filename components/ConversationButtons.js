import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { CreateConversationModal } from "./CreateConversationModal";


export function ConversationButtons() {
  const { user, orbis, setCurrentConversationDetails, getTruncatedDID } = useContext(GlobalContext);

  const [conversationsList, setConversationsList] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getOrbisConversations();
  }, [user])

  const getOrbisConversations = async () => {
    if (user) {
      let { data, error } = await orbis.getConversations(
        {
          did: user.did,
        }
      );
      setConversationsList(data);
      // console.log("These are your conversations:", data);
      console.log("These are your conversations:", data);
      if (data.length != 0) {
        setCurrentConversationDetails(data[0]);
        // setCurrentConversationID(data[0].stream_id);
        console.log("This is current conversation id:", data[0].stream_id);
      } else {
        setConversationsList(null);
        setCurrentConversationDetails(null);
        // setCurrentConversationID("");
        //console.log("Could not load conversations:", error);
      }
    }
  }

  return (
    <div style={conversationButtons}>
      {conversationsList && conversationsList.map((conversation, index) => {
        return (
          <button
            key={index}
            style={loadConversationButton}
            onClick={() => { setCurrentConversationDetails(conversationsList[index]) }}>
            {conversation.content.name ?
              conversation.content.name
              :
              getTruncatedDID(conversation.content.recipients[0], 5)}
          </button>
        )
      })}
      <button style={createConversationButton} onClick={() => setShow(true)} >
        Create New Conversation
      </button>
      <CreateConversationModal getOrbisConversations={() => getOrbisConversations()} onClose={() => setShow(false)} show={show} />
    </div>
  )
}

const conversationButtons = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}

const loadConversationButton = {
  padding: '10px 20px',
  backgroundColor: '#fff',
  color: '#666',
  border: '0',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: '700',
  boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)',
}

const createConversationButton = {
  padding: '10px 20px',
  backgroundColor: '#2b77ff',
  border: '0',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)',
}