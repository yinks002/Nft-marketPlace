declare var window: any
import classNames from "classnames";
import {ethers} from "ethers";
import useNFTMarket from "state/nft-market";
import useSigner from "state/nft-market/signer";
import CreationForm, { CreationValues } from "./CreationForm";







const CreationPage = () => {
  const {createNFT} = useNFTMarket();
  const {signer} = useSigner();
  const onSubmit = async (values: CreationValues) => {
    // TODO: create NFT
  };

  return (
    <div
      className={classNames("flex h-full w-full flex-col", {
        "items-center justify-center": !signer,
      })}
    >
      {signer ? <CreationForm onSubmit={createNFT} /> : "Connect your wallet"}
    </div>
  );
};

export default CreationPage;
