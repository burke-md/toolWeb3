import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { toolABI } from './data/abi';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button } from 'react-bootstrap';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x3215f99412a72f9660Aed1D8aE552e5876804693";
const ToolContract = new web3.eth.Contract(toolABI, contractAddress);

const getTokenCount = async () => {
  const numTokens = await ToolContract.methods.getNumMintedTokens().call();
  return numTokens;
}

function App() {
  const [error, setError] = useState(null);
  const [numMintedTokens, setNumMintedTokens] = useState(0);
  const [connectedAddr, setConnectedAddr] = useState(null);

window.ethereum.request({ method: 'eth_requestAccounts' })
.then((res) => {
  setConnectedAddr(res[0]);
})

  useEffect(() => {
    getTokenCount()
    .then((num) => {
      setNumMintedTokens(num)
    })
  }, []);

  const clearError = () => {
    setError(null);
  }
  const pauseContract = async () => {
    try {
      await ToolContract.methods.pause().send({ from: connectedAddr});
    } catch (err){
      setError("Unable to pause contract.")
    }
  }

  const unpauseContract = async () => {
    try {
      await ToolContract.methods.unpause().send({ from: connectedAddr});
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
      <Button
      variant="outline-dark"
      onClick={pauseContract}
      >Pause</Button>

      <Button
      variant="outline-dark"
      onClick={unpauseContract}
      >Unpause</Button>

      {error &&
        <Alert
        variant="danger">
          <Alert.Heading>
            An error has occured:
          </Alert.Heading>
          <hr />
          <p>{error}</p>
          <div className="d-flex justify-content-end">
            <Button
            variant="outline-danger"
            onClick={clearError}
            >X</Button>
          </div>
        </Alert>
      }
    </div>
  );
}

export default App;
