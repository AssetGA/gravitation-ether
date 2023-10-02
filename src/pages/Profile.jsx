import { useEffect, useState } from "react";
import DisplayCampaigns from "../components/DisplayCampaigns";
import { useStateContext } from "../context/StateContext";
import { CustomButton } from "../components";
import { crowdfundingAddress, crowdfundingOwner } from "../constant/constants";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { wallet: address } = useSelector((states) => states.globalStates);

  const {
    checkConnection,
    crowdfundingContract,
    getUserCampaigns,
    setAddressCrowdfund,
  } = useStateContext();

  if (address === undefined) {
    checkConnection();
  }

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    if (data !== undefined) {
      setCampaigns(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (crowdfundingContract) fetchCampaigns();
  }, [address, crowdfundingContract]);

  const handleSend = async () => {
    console.log("hi");
    await setAddressCrowdfund(crowdfundingAddress);
  };

  return (
    <div className="flex flex-col">
      {address !== undefined &&
      address.toLowerCase() === crowdfundingOwner.toLowerCase() ? (
        <CustomButton
          btnType="button"
          title="Send address crowdfund"
          styles="w-full bg-[#8c6dfd] hover:bg-[#7c6dfd]"
          handleClick={handleSend}
          yes={false}
        />
      ) : (
        <div></div>
      )}
      <DisplayCampaigns
        title="All projects you recommend"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Profile;
