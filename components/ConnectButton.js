import React, { useState, useContext } from 'react';
import { sleep } from "../utils";

/** Import Context */
import { GlobalContext } from "../contexts/GlobalContext";
import Image from 'next/image';

export function ConnectButton() {
  const { user, setUser, getTruncatedDID, orbis, status, setStatus } = useContext(GlobalContext);

  /** Call the Orbis SDK to connect to Ceramic */
  const connect = async () => {
    /** Show loading state */
    setStatus(1);

    let res = await orbis.connect();

    /** Parse result and update status */
    switch (res.status) {
      case 200:
        setStatus(2);

        /** Save user details returned by the connect function in state */
        console.log("Connected to Ceramic: ", res);
        setUser(res.details);

        break;
      default:
        console.log("Couldn't connect to Ceramic: ", res.error.message);
        setStatus(3);

        /** Wait for 2 seconds before resetting the button */
        await sleep(2000);
        setStatus(0);
    }
  }

  const logout = async () => {
    setStatus(1);

    let res = await orbis.logout()

    switch (res.status) {
      case 200:
        setStatus(0)

        console.log(res.result)
        setUser("")

        break

      default:
        console.log("Couldn't logout", res.error.message);
        setStatus(3);

        /** Wait for 2 seconds before resetting the button */
        await sleep(2000);
        setStatus(2);

    }
  }

  // const getUserDetails = async (did) => {
  //   let { data, error, status } = await orbis.getProfile(did);

  //   /** Returns error if any */
  //   if (error) {
  //     return {
  //       status: status,
  //       result: "Error retrieving user details.",
  //       error: error
  //     }
  //   }

  //   /** Returns user details */
  //   return {
  //     status: status,
  //     result: data
  //   }
  // }

  /** Display button according to its status */
  switch (status) {
    case 0:
      return <button style={connectButton} onClick={() => connect()}>Connect</button>;
    case 1:
      return <button style={connectingButton}>Loading...</button>;
    case 2:
      console.log("user", user)
      return (
        <div>
          <button style={connectingButton}>{user.profile?.username ?
            <div style={profileFlex}>
              {
                user.profile.pfp ?
                  <Image src={user.profile.pfp} width='21px' height='20px' style={{ borderRadius: '50%' }} alt="profile picture" />
                  :
                  <Image src='/defaultPFP.jpeg' width='21px' height='20px' style={{ borderRadius: '50%' }} alt="profile picture" />
              }
              <div>{user.profile.username}</div>
              
            </div>

            :
            <div style={profileFlex}>
              <Image src='/defaultPFP.jpeg' width='21px' height='20px' style={{ borderRadius: '50%' }} alt="profile picture" />
              <div>{getTruncatedDID(user.did, 5)}</div>
            </div>}
          </button>
          <button style={connectButton} onClick={() => logout()}>Logout</button>
        </div>
      )
    case 3:
      return <button style={connectingButton}>Error</button>

  }

}

const connectButton = {
  padding: '10px 25px',
  backgroundColor: '#2b77ff',
  border: '0',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)'
}

const connectingButton = {
  padding: '10px 25px',
  backgroundColor: '#fff',
  color: '#000',
  border: '0',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)'
}

const profileFlex = {
  display: 'flex',
  gap: '10px'
}
