import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


export function ConversationHeader() {
  const { user, currentConversationDetails, getTruncatedDID, orbis } = useContext(GlobalContext);

  console.log("This is the current loaded conversation:", currentConversationDetails);

  return (
    <div style={conversationHeaderFlex}>
      {currentConversationDetails && (
        <h2>
          {currentConversationDetails.content.name ? currentConversationDetails.content.name : getTruncatedDID(currentConversationDetails.content.recipients[0], 5)}
        </h2>
      )}
      <div style={{ display: 'flex', gap: '10px' }}>
        {currentConversationDetails && currentConversationDetails.recipients_details.map((recipient, index) => {
          return (
            <div
              key={index}
              style={conversationRecipients}>
              {recipient.profile.pfp ? <Image
                width='20px'
                height='20px'
                style={{ borderRadius: '50%' }}
                src={recipient.profile.pfp}
                alt="profile picture" />
                :
                <Image
                  width='20px'
                  height='20px'
                  style={{ borderRadius: '50%' }}
                  src="/defaultPFP.jpeg" alt="profile picture" />
              }
              <div>
                {recipient.profile?.username ?
                  recipient.profile.username
                  :
                  getTruncatedDID(recipient.did, 3)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const conversationHeaderFlex = {
  display: 'flex',
  flexDirection: 'column'
}

const conversationRecipients = {
  display: 'flex',
  gap: '5px'
}