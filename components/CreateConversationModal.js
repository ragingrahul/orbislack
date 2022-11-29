import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


export function CreateConversationModal(props) {

  const { orbis } = useContext(GlobalContext);

  const [conversationName, setConversationName] = useState("");
  const [conversationDescription, setConversationDescription] = useState("");
  const [conversationContext, setConversationContext] = useState("");
  const [conversationRecipients, setConversationRecipients] = useState([]);

  const newOrbisConversation = async () => {
    try {
      let res = await orbis.createConversation({
        recipients: conversationRecipients,
        name: conversationName,
        description: conversationDescription,
        context: conversationContext,
      });
      console.log(res.status)
      if (res.status == 200) {
        console.log("Result from new conversation:", res);
        setConversationName("");
        setConversationDescription("");
        setConversationContext("");
        setConversationRecipients([]);
      }
      await props.getOrbisConversations();
      props.onClose();
    } catch (error) {
      setConversationName("");
      setConversationDescription("");
      setConversationContext("");
      setConversationRecipients([]);
      console.log("Could not create a new conversation:", error.message);
      props.onClose();
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  if (props.show) {
    return (
      <div style={modal}>
        <div style={modalContent}>
          <h2>Create New Conversation</h2>
          <form style={conversationForm} onSubmit={onSubmit}>
            <div style={modalBody}>
              <div style={conversationFormElement}>
                <label htmlFor='conversation-name'>Conversation Name:</label>
                <input
                  type='text'
                  id='conversation-name'
                  name='conversation-name'
                  placeholder='Name'
                  style={conversationFormInput}
                  value={conversationName}
                  onChange={e => setConversationName(e.target.value)} />
              </div>
              <div style={conversationFormElement}>
                <label htmlFor='conversation-description'>Conversation Description:</label>
                <input
                  type='text'
                  id='conversation-description'
                  name='conversation-description'
                  placeholder='Description'
                  style={conversationFormInput}
                  value={conversationDescription}
                  onChange={e => setConversationDescription(e.target.value)} />
              </div>
              <div style={conversationFormElement}>
                <label htmlFor='conversation-context'>Conversation Context:</label>
                <input
                  type='text'
                  id='conversation-context'
                  name='conversation-context'
                  placeholder='Context'
                  style={conversationFormInput}
                  value={conversationContext}
                  onChange={e => setConversationContext(e.target.value)} />
              </div>
              <div style={conversationFormElement}>
                <label htmlFor='conversation-recipients'>Conversation Description:</label>
                <input
                  type='text'
                  id='conversation-recipients'
                  name='conversation-recipients'
                  placeholder='List of Recipient DIDs (for eg. did1,did2,... No Spaces between DIDs)'
                  style={conversationFormInput}
                  value={conversationRecipients}
                  onChange={e => setConversationRecipients(e.target.value.split(","))} />
              </div>
            </div>
            <div style={modalFooter}>
              <button type='submit' onClick={() => newOrbisConversation()} style={conversationFormSubmit} >
                Create New Conversation
              </button>
              <button onClick={props.onClose} style={modalClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const modal = {
  position: 'fixed',
  left: '0',
  top: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '1',
}

const modalContent = {
  backgroundColor: '#fff',
  padding: '10px 30px',
  borderRadius: '16px',
}

const modalBody = {
  padding: '20px',
  borderTop: '1px solid #eee',
  borderBottom: '1px solid #eee',
}

const conversationForm = {
  display: 'flex',
  flexDirection: 'column',
}

const conversationFormElement = {
  display: 'flex',
  flexDirection: 'column',
}

const conversationFormInput = {
  backgroundColor: '#fff',
  color: '#555',
  padding: '10px',
  borderRadius: '10px',
  border: '2px solid #000',
  marginTop: '10px',
  marginBottom: '10px',
  width: '500px',
}

const modalFooter = {
  display: 'flex',
  padding: '20px',
  justifyContent: 'space-evenly'
}

const conversationFormSubmit = {
  padding: '10px 25px',
  backgroundColor: '#2b77ff',
  border: '0',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)',
}

const modalClose = {
  padding: '10px 20px',
  backgroundColor: '#fff',
  color: '#666',
  border: '0',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: '700',
  boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)',
}