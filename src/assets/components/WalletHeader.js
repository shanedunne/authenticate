import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./styled/Button.styled";
import { BiWalletAlt } from "react-icons/bi";
import { SiEthereum } from "react-icons/si"
import { Colors } from "../Theme";

const Title=styled.h1`
    font-family: 'Kdam Thmor Pro', sans-serif;
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
    justify-content: center;
    `;

const WalletContainer = styled.div`
    display: flex;
    background-color: ${Colors.Background};
    height: 6vh;
    font-size: 1.7rem;
    padding-top: 5px;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
`;
const WalletIconContainer = styled.span``;
const BalanceInfoContainer = styled.div`
    background-color: ${Colors.CardBackground};
    border-radius: 12%;
    padding: 0.4rem;
    font-size: 1.3rem;
`;

const HeaderAddress = styled.span`
    padding-right: 1rem;
`;
const HeaderBalance = styled.span``;


export default function WalletHeader() {
  const [address, setAddress] = useState("");
  const [theProvider, setTheProvider] = useState(null);
  const [balance, setBalance] = useState("")

  // get etheruem instance
  const { ethereum } = window;

  useEffect(() => {
    if (ethereum) {
      //try to connect immediatly, if that fails, address won't be set and the button to manually connect will be shown
      handleLinkWallet();
    }
  }, []);

  let provider;

  const handleLinkWallet = () => {
    console.log("Attempting to link wallet");
    provider = new ethers.providers.Web3Provider(ethereum);

    // put provider in state so we can use it later without worrying about it not being set anymore
    setTheProvider(provider);

    //provider = new ethers.providers.Web3Provider(ethereum);
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        console.log("Wallet linked successfully");
        // here we put the address details into state to use later
        getUserDetails();
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
  };

  // declare balance and address shortened variables globally
  var balanceRounded;

  async function getUserDetails() {
    //this function uses provider rather than theProvider, because handleLinkWallet has just set provider, but unless we use promises theProvider won't have been set yet
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();

    // here we set the address from the  signer
    setAddress(walletAddress);

    // get balance of signed in account
    provider.getBalance(walletAddress).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance)
        setBalance(balance)
        })
  }

  if (address) {
    return (
      <WalletContainer>
        <Title>Authentic</Title>
        <BalanceInfoContainer>
          <HeaderAddress></HeaderAddress>
          <HeaderBalance>1.34</HeaderBalance>
          <SiEthereum />
        </BalanceInfoContainer>
      </WalletContainer>
    );
  } else {
    return (

      <WalletContainer>
        <Title>Authentic</Title>
        <BiWalletAlt onClick={handleLinkWallet} style={{justifyContent: 'center', cursor: 'pointer'}}/>
      </WalletContainer>
    );
  }
}