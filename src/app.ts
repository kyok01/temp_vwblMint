const { 
    VWBLEthers,
    ManageKeyType, 
    UploadContentType, 
    UploadMetadataType
} = require("vwbl-sdk");
const ethers = require('ethers')
require('dotenv').config();
const fs = require('fs');

type MintNftParams = {
    asset:any;
     thumbnail:any;
      title:any
       description:any;
}

const privateKey = process.env.PRIVATE_KEY;
const ethProvider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/');
const ethSigner = new ethers.Wallet(privateKey, ethProvider);


const vwbl = new VWBLEthers({
    ethersProvider: ethProvider, // ethers.js provider instance
    ethersSigner: ethSigner, // ethers.js signer instance
    contractAddress: process.env.NFT_CONTRACT_ADDRESS,                 // VWBL nft's contract address
    manageKeyType: ManageKeyType.VWBL_NETWORK_SERVER, // how to manage key
    uploadContentType: UploadContentType.IPFS, // where to upload content
    uploadMetadataType: UploadMetadataType.IPFS, // where to upload metadata
    ipfsNftStorageKey: process.env.NFT_STORAGE_API_KEY // nft.storage API Key
 });

 const data = {
    title: 'node-html-upload-test',
    description: 'test',
    thumbnail: fs.readFileSync('src/sample.png', 'utf8'),
    asset: fs.readFileSync('src/sample.html', 'utf8')
 }

 const mintNft = async (data: MintNftParams) => {
  
    // web3またはvwblインスタンスがundefinedの場合
    if (!vwbl) {
        alert('No VWBL instance. Please try again.');
        return;
    }
  
    // 各入力データを抽出
    const { asset, thumbnail, title, description } = data;
  
    try {
      // VWBLネットワークに対する署名を確認
      if (!vwbl.signature) {
        await vwbl.sign();
      }
  
      // VWBL NFTを発行
      await vwbl.managedCreateTokenForIPFS(title, description, asset, thumbnail, 0);
      console.log('successfully mint');
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message);
            console.log(error);
        }else{
            console.error(error);
        }
    }
  };