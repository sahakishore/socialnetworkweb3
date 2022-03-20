// for next.js's <head> tag and rendering images
import Head from 'next/head'
import Image from 'next/image'

// import the web3 library with setup from lib/web3.js
import { web3 } from '../lib/web3';

// import react hooks
import { useState, useEffect, useReducer } from 'react';

// all from our components folder
import Account from '../components/Account'
import EthName from '../components/EthName'
import Answer from '../components/Answer'
import AnswerForm from '../components/AnswerForm'

const Home = () => {
  // todo:
  // 1. make the connect button work!
  // 2. get the answers from the API (see /api/answers.js file)
  // 3. add tipping like project 1
  // 4. make the user name look good
  // 5. let the user post their own reply

  // let account = "0x123456789"

  const [state, setState] = useReducer((state, newState) => ({...state, ...newState}), {
    user: "",
    isLoading: true,
    answers: [],

  })

  useEffect(() => {
    
  }, [state.user])

  const usersListCheck = async () => {
    let accounts = await window.ethereum.request({ method: "eth_accounts" })
    
    setState({user: accounts})
    
  }
  useEffect(() => {

    usersListCheck()
    
      window.ethereum.on("accountsChanged", (accnt) => {
        setState({ user: accnt })
         localStorage.removeItem("user")
      })
    
    fetch("/api/answers")
      .then(resp => {resp.json(); console.log("resp: ", resp)})
      .then(data=> setState({answers: data.answers}))
  },[])
  
  // let account 

  const accountConnectOnClick = async () => {
    const connected = await window.ethereum.request({ method: "eth_requestAccounts" })
    
    console.log("Connected account: ", connected)

    if (connected) {
      setState({ user: connected })
      
      localStorage.setItem("user", connected)
    
    }
  }

  const onLogout = () => {
    setState({ user: "" }, () => {
      localStorage.removeItem("user")
    })

  }

  return (
    <main>
      <header>
        <h1>Potstop</h1>

        <form>
          <input type="text" placeholder="Search" />
        </form>

        <Account account={state.user} accountConnectOnClick={accountConnectOnClick }/>
        {/* <button>Connect</button> */}
      </header>

      <section className="question">
        <div className="main">
          <h3>Feedback forum</h3>
          <h2>Looking for feedback as a beginner</h2>
          <p>Hey everyone, I&apos;m a new potter, just 4 weeks into my journey, and I&apos;m looking to get some feedback on what I&apos;ve made so far. I&apos;m particularly interested in how to make rustic looking bowls and pots, and I&apos;d love to know what the best tools to use would be!</p>

          <div className="slides">
            <Image src="/image-1.jpg" width="600" height="800" />
            <Image src="/image-2.jpg" width="600" height="800" />
            <Image src="/image-3.jpg" width="600" height="800" />
            <Image src="/image-4.jpg" width="600" height="800" />
          </div>
        </div>
        <div className="meta">
          
          {/* EthName */}
          <div className="eth-name">
            <img src="https://ipfs.io/ipfs/QmbctVN8tPaDLiLysVDwThf7JTJhMejbSypZ4a3v5H2G3a" alt="Avatar of riklomas.eth" />
            <div className="name">
              <span className="primary">riklomas.eth</span>
              <span className="secondary">0xb25bf3...aaf4</span>
            </div>
          </div>
          {/* end EthName */}

        </div>
      </section>

      <section className="answers">
        {/* <div className="loading">Loading answers...</div> */}
        <div className="loading">Answers List:</div>
        {
          state.answers&&state.answers.map(ans => (
            <div>
              {ans}
            </div>
          ))
        }
        { state.answers.length}
      </section>

      <Head>
        <title>Looking for feedback as a beginner – Feedback forum – Potstop </title>
        <meta property="og:title" content="Looking for feedback as a beginner on Potstop" />
        <meta property="og:description" content="This is a project on the SuperHi Crypto + Web3 for Creatives course" />
        <meta property="og:image" content="/social.png" />
      </Head>
    </main>
  )
}

export default Home