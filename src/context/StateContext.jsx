import { createContext, useContext, useState } from "react";
import {
  crowdsaleAddress,
  tokenMTAddress,
  tokenMTABI,
  crowdsaleABI,
  crowdfundingAddress,
  crowdfundingABI,
} from "../constant/constants";
import { ethers, Contract, formatEther, parseEther } from "ethers";
import PropTypes from "prop-types";
import { globalActions } from "../store/globalSlices";
import { useDispatch, useSelector } from "react-redux";

const fetchContract = (address, abi, signerOrProvider) =>
  new Contract(address, abi, signerOrProvider);

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // account it is address user
  // const [account, setAccount] = useState();

  const dispatch = useDispatch();
  const [crowdsaleContract, setCrowdsaleContract] = useState();

  // crowdfunding state
  const [crowdfundingContract, setCrowdfundingContract] = useState();

  const {
    setConnect,
    setWallet,
    setAccountBalance,
    setCrowdsaleBalance,
    setTokenBalance,
    setProjectNames,
    setPermission,
    setError,
  } = globalActions;
  const { wallet } = useSelector((states) => states.globalStates);

  function handleAccountsChanged() {
    checkConnection();
  }

  const connectWallet = async () => {
    try {
      if (!window.ethereum) dispatch(setConnect(true));
      const accounts = await window.ethereum.request?.({
        method: "eth_requestAccounts",
      });
      dispatch(setWallet(accounts?.[0]));
      // setAccount(accounts?.[0]);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const checkConnection = async () => {
    try {
      // CREATE CONNECTION TO

      const provider = wallet && new ethers.BrowserProvider(window.ethereum);

      const _signer = await provider.getSigner();

      // eth balance of signer
      const balance = await provider.getBalance(_signer.address);
      dispatch(setAccountBalance(formatEther(balance)));

      // token contract
      const contractToken = fetchContract(tokenMTAddress, tokenMTABI, _signer);

      // GET ALL TOKEN HOLDER
      const allTokensHolder = await contractToken.balanceOf(_signer.address);
      dispatch(setTokenBalance(formatEther(allTokensHolder)));

      // crowdsale contract
      const contractCrowdsale = fetchContract(
        crowdsaleAddress,
        crowdsaleABI,
        _signer
      );
      setCrowdsaleContract(contractCrowdsale);

      // crowdfunding contract
      const contractCrowdfunding = fetchContract(
        crowdfundingAddress,
        crowdfundingABI,
        _signer
      );

      setCrowdfundingContract(contractCrowdfunding);

      // crowdsale token volume
      const datasale = await contractToken.balanceOf(contractCrowdsale.target);

      dispatch(setCrowdsaleBalance(formatEther(datasale)));
    } catch (error) {
      console.log("APP is not connected", error);
      errorCatcher(error);
    }
  };

  // crowdsale buyTokens
  const buyToken = async (amount) => {
    const wei = parseEther(amount);
    try {
      const data = await crowdsaleContract.buyTokens(wallet, { value: wei });
      await data.wait();
      checkConnection();
    } catch (error) {
      errorCatcher(error);
    }
  };

  // publish campaign from crowdfunding
  const publishCampaign = async (form) => {
    try {
      const data = await crowdfundingContract.createCampaign(
        form.title.trim(), //title
        form.tokenUrl.trim(),
        form.description.trim(), // description
        form.target.toString().trim(),
        new Date(form.deadline).getTime(), //deadline
        form.image,
        form.invited.trim()
      );
      await data.wait();
      return data;
    } catch (error) {
      errorCatcher(error);
    }
  };

  // get all campaigns from crowdfunding
  const getCampaigns = async () => {
    try {
      const campaigns = await crowdfundingContract.getCampaigns();
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign[0],
        title: campaign[1],
        tokenUrl: campaign[2],
        description: campaign[3],
        target: formatEther(campaign[4].toString()),
        deadline: campaign[5].toString(),
        amountCollected: formatEther(campaign[6].toString()),
        image: campaign.image,
        invited: campaign.invited,
        pId: i,
      }));
      return parsedCampaigns;
    } catch (error) {
      errorCatcher(error);
    }
  };

  // user campaigns
  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner.toLowerCase() === wallet.toLowerCase()
      );
      return filteredCampaigns;
    } catch (error) {
      errorCatcher(error);
    }
  };

  // get array og projects name for cheking
  const getNameOfProject = async () => {
    const parsedCampaigns = await getCampaigns();
    if (Array.isArray(parsedCampaigns) === true) {
      const names = parsedCampaigns.map((elem) => {
        return elem.title;
      });
      dispatch(setProjectNames(names));
    }
  };

  const donate = async (pId) => {
    try {
      const donate = await crowdfundingContract.donateToCampaign(pId);
      await donate.wait();
      checkConnection();
      return donate;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getDonations = async (pId) => {
    try {
      const donations = await crowdfundingContract.getDonators(pId);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: formatEther(donations[1][i]).toString(),
        });
      }
      return parsedDonations;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const setVotingPermission = async (_id, _amount) => {
    try {
      const date = await crowdfundingContract.setVoting(_id, _amount);
      await date.wait();
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getVotingPermission = async (_id) => {
    try {
      const data = await crowdfundingContract.getVoting(_id);
      dispatch(setPermission(data));
    } catch (error) {
      errorCatcher(error);
    }
  };

  const setAddressCrowdfund = async (_address) => {
    try {
      await crowdfundingContract.setCrowdfundingAddress(_address);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function errorCatcher(error) {
    dispatch(setError(error.reason));
  }

  return (
    <StateContext.Provider
      value={{
        connectWallet,
        handleAccountsChanged,
        checkConnection,
        crowdsaleContract,
        crowdfundingContract,
        buyToken,
        getCampaigns,
        getNameOfProject,
        createCampaign: publishCampaign,
        getUserCampaigns,
        donate,
        getDonations,
        setVotingPermission,
        getVotingPermission,
        setAddressCrowdfund,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useStateContext = () => useContext(StateContext);
