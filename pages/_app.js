import React, { useEffect, useState } from 'react';

import '../styles/globals.css';

/** Import Context */
import { GlobalContext } from '../contexts/GlobalContext';

/** Import Orbis SDK */
import { Orbis } from "@orbisclub/orbis-sdk";

/** Initiate the Orbis class object */
let orbis = new Orbis();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [currentConversationDetails, setCurrentConversationDetails] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const checkConnection = async () => {
      //console.log("app",user);
      if (user == null) {
        
        let res = await orbis.isConnected();
        console.log('Connection status', res.status);
        if (res.status == 200) {
          setStatus(2);
          setUser(res.details);
        }
      }
    }
    checkConnection();
  })

  const getTruncatedDID = (did, length) => {
    if (!did) {
      return '';
    }
    return `${did.slice(0, length + 2)}...${did.slice(
      did.length - length
    )}`;
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        currentConversationDetails,
        setCurrentConversationDetails,
        status,
        setStatus,
        getTruncatedDID,
        orbis
      }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

export default MyApp
