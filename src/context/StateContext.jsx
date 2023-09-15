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

const fetchContract = (address, abi, signerOrProvider) =>
  new Contract(address, abi, signerOrProvider);

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // account it is address user
  const [account, setAccount] = useState();
  const [tokenContract, setTokenContract] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [crowdsaleTokenBalance, setCrowdsaleTokenBalance] = useState();
  const [error, setError] = useState(null);
  const [crowdsaleContract, setCrowdsaleContract] = useState();

  // crowdfunding state
  const [crowdfundingContract, setCrowdfundingContract] = useState();
  const [projectNames, setProjectNames] = useState([]);
  const [permission, setPermission] = useState();

  function handleAccountsChanged() {
    checkConnection();
  }

  const checkConnection = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");
      window.ethereum.isConnected();
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccount(accounts[0]);

      // CREATE CONNECTION TO
      const provider = new ethers.BrowserProvider(window.ethereum);

      const _signer = await provider.getSigner();

      // eth balance of signer
      const balance = await provider.getBalance(accounts[0]);
      setAccountBalance(formatEther(balance));

      // token contract
      const contractToken = fetchContract(tokenMTAddress, tokenMTABI, _signer);
      setTokenContract(contractToken);

      // GET ALL TOKEN HOLDER
      const allTokensHolder = await contractToken.balanceOf(_signer.address);
      setTokenBalance(formatEther(allTokensHolder));
      // contractToken.on("Transfer", (from, to, _amount, event) => {
      //   const amount = formatEther(_amount, 18);
      //   console.log(`${from} => ${to}: ${amount}`);

      //   // The `event.log` has the entire EventLog

      //   // Optionally, stop listening
      //   event.removeListener();
      // });

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
      setCrowdsaleTokenBalance(formatEther(datasale));
    } catch (error) {
      console.log("APP is not connected", error);
      errorCatcher(error);
    }
  };

  // crowdsale buyTokens
  const buyToken = async (amount) => {
    const wei = parseEther(amount);
    try {
      console.log(amount, wei);
      const data = await crowdsaleContract.buyTokens(account, { value: wei });
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
      console.log("contract call success", data);
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
        (campaign) => campaign.owner.toLowerCase() === account.toLowerCase()
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
      setProjectNames(names);
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
      return "error";
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
      return "error";
    }
  };

  const getVotingPermission = async (_id) => {
    try {
      const data = await crowdfundingContract.getVoting(_id);
      setPermission(data);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const setAddressCrowdfund = async (_address) => {
    try {
      const data = await crowdfundingContract.setCrowdfundingAddress(_address);
      console.log("data", data);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function errorCatcher(error) {
    setError(error.reason);
  }

  return (
    <StateContext.Provider
      value={{
        address: account,
        handleAccountsChanged,
        checkConnection,
        tokenContract: tokenContract,
        tokenBalance: tokenBalance,
        // setTokenInfo,
        // checkCrowdsaleBalance,
        crowdsaleTokenBalance,
        crowdsaleContract,
        crowdfundingContract,
        error,
        accountBalance: accountBalance,
        buyToken,
        getCampaigns,
        getNameOfProject,
        projectNames,
        createCampaign: publishCampaign,
        getUserCampaigns,
        donate,
        getDonations,
        setVotingPermission,
        getVotingPermission,
        permission,
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
