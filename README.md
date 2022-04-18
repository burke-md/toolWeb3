# Tool NFT frontend

This is a simple frontend for a ERC721 project in this repo : https://github.com/burke-md/tool-nft

Though few features have been implemented, you can see here that public functions(reading number of minted tokens) are accessible as well as contract functions having the 'onlyOwner' modifyer(pause/unpause). In the video clip below I intentionally cancel a transaction and display a simple error messasge. 

https://user-images.githubusercontent.com/22263098/163873727-63f00a17-819b-4f57-beed-7fe74d9dc298.mov




## Notes:

It is worth mentioning that the web3 packlage will not work out of the box with a standard project created with `react-create-app`. Several modifacations are required. 
Additional required dev dependancies:

- react-app-rewired 
- crypto-browserify 
- stream-browserify 
- assert stream-http 
- https-browserify 
- os-browserify 
- url 
- buffer 
- process

The scripts in package.json have been updated and the contents of config-overrride.js are all needed to get things off the ground. 
