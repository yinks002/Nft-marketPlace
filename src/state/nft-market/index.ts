import { create } from "domain";
import { Contract } from "ethers";
import {TransactionResponse} from "@ethersproject/abstract-provider";
import { CreationValues } from "modules/CreationPage/CreationForm";
import abi from "./maket.js"
import useSigner from "./signer";

const NFT_MARKET_ADDRESS = "0x50886A4d66b9A65ec60B839E1701D5e62D1fEe15";
const useNFTMarket= ()=>{
    const {signer} = useSigner();
    const nftMarket = new Contract(NFT_MARKET_ADDRESS, abi, signer)
    console.log("NFTContract" , nftMarket)


    const createNFT = async(values: CreationValues)=>{
       try {
        const data = new FormData();
        data.append("name", values.name);
        data.append("description", values.description);
        data.append("image", values.image!);
        const response = await fetch("/api/nft-storage", {
            method: 'POST',
            body: data,
            });
        if( response.status == 201){
            const json = await response.json();
            console.log("tokenURI:", json.uri);
            const transaction : TransactionResponse = await nftMarket.createNFT(
                json.tokenURI
            )
            await transaction.wait();
        }
       } catch (error) {
        console.log(error);
       }
    }

    return{ createNFT };
}

export default useNFTMarket;