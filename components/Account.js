import React, {useState, useEffect} from 'react'
import EthName from './EthName'



const Account = ({account, accountConnectOnClick})=> {
  // TODO!!!
  // if already logged in, it should show
  // the EthName component with the correct address
  // if not logged in, show a connect button
  // that when its clicked, will prompt us to login
  // and store the info on the page

  const [userLoggedIn,setUserLoggedIn  ]= useState("")


  useEffect(() => {
    let useExist = localStorage.getItem("user")

    setUserLoggedIn(useExist)
    console.log("user in localStore: ", useExist)
    
  }, [account])

  

  return (
    <>
    {
      // account?
        userLoggedIn?
        <span>{ userLoggedIn|| account }</span>
          //  <span>{ account }</span>
      : 
      <button onClick={()=> {accountConnectOnClick()}}>Connect wallet</button>
    }
    
    </>
  )
}

export default Account;