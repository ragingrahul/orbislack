import Head from 'next/head'
import { useContext } from 'react';
import { ConversationButtons } from '../components/ConversationButtons';
import { ConversationBox } from '../components/ConversationBox';
import { Header } from '../components/Header'
import { GlobalContext } from '../contexts/GlobalContext';
import styles from '../styles/Home.module.css'

export default function Home() {
  const { user, setUser, orbis } = useContext(GlobalContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>
      <hr />
      <main className={styles.main}>
        {user ?
          <div style={{ display: 'flex', gap: '20px' }}>
            <ConversationButtons />
            <ConversationBox />
          </div>
          :
          <div>Please connect your wallet!</div>
        }
      </main>
    </div>
  )
}
