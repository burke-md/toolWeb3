import Web3 from 'web3';
import { toolABI } from './data/abi';
import './App.css';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x3215f99412a72f9660Aed1D8aE552e5876804693";
const ToolContract = new web3.eth.Contract(toolABI, contractAddress);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Tool NFT
        </p>
      </header>
    </div>
  );
}

export default App;
