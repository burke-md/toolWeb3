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
  const [numMintedTokens, setNumMintedTokens] = useState(0);

  useEffect(() => {
    getTokenCount()
    .then((num) => {
      setNumMintedTokens(num)
    })
  }, []);

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
    </div>
  );
}

export default App;
