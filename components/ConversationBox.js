import { ConversationHeader } from "./ConversationHeader";
import { ConversationMessages } from "./ConversationMessages";
import { SendMessages } from "./SendMessages";

export function ConversationBox() {

  return (
    <div style={conversationBox}>
      <ConversationHeader />
      <hr width='100%' />
      <ConversationMessages />
      <hr width='100%' />
      <SendMessages />
    </div>
  )
}

const conversationBox = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 25px',
  border: '1px solid #000',
  borderRadius: '10px',
  flexGrow: '1',
  height: '80vh',
  width: '70%'
}