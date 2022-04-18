import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { toolABI } from './data/abi';
import './App.css';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x3215f99412a72f9660Aed1D8aE552e5876804693";
const ToolContract = new web3.eth.Contract(toolABI, contractAddress);

const getTokenCount = async () => {
  const numTokens = await ToolContract.methods.getNumMintedTokens().call();
  return numTokens;
}


function App() {
  const [error, setError] = useState("");
  const [numMintedTokens, setNumMintedTokens] = useState(0);

const accounts = async() => {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
};
const account = accounts();
console.log(account[0])


  useEffect(() => {
    getTokenCount()
    .then((num) => {
      setNumMintedTokens(num)
    })
  }, []);


  const pauseContract = async () => {
    try {
      await ToolContract.methods.pause().call({ from: account});
    } catch (err){
      setError("Unable to pause contract.")
    }
  }

  const unpauseContract = async () => {
    try {
      await ToolContract.methods.unpause().call({ from: account});
    } catch (err){
      setError("Unable to unpause contract.")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Tool NFT
        </div>
      </header>
      <span>
        There have been {numMintedTokens} Tool tokens created.
      </span>
      <br />
      <span>
        <button
        onClick={pauseContract}
        >Pause</button>
        <button
        onClick={unpauseContract}
        >Unpause</button>
      </span>
      <br />
      {error ?? <span>
        An error has occured: {error}
      </span>}
    </div>
  );
}

export default App;
