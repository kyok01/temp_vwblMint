const { 
    VWBL,
    ManageKeyType, 
    UploadContentType, 
    UploadMetadataType
} = require("vwbl-sdk");
const ethers = require('ethers')
require('dotenv').config();


const greeter = (person: string) => {
    return 'Hello, ' + person
}

const user = 'わくわくBank.'

console.log(greeter(user))