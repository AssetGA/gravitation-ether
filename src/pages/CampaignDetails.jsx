import { useEffect, useState } from "react";
import { calculateBarPercentage, daysLeft } from "../utils";
import { logo } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import CountBox from "../components/CountBox";
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import { useStateContext } from "../context/StateContext";
import { parseUnits } from "ethers";
import Modal from "../components/Modal";
import { SignInError } from "../components";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    tokenBalance,
    donate,
    getDonations,
    contractCrowdfunding,
    address,
    setVotingPermission,
    error,
    getVotingPermission,
    permission,
  } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount] = useState("100");
  const [donators, setDonators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);

  const remainingDays = daysLeft(Number(state.deadline));

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    console.log("data", data);
    if (data !== undefined) {
      setDonators(data);
    }
  };

  console.log("donators", donators);

  useEffect(() => {
    fetchDonators();
  }, [contractCrowdfunding, address]);

  useEffect(() => {
    getVotingPermission(state.pId);
  }, [address]);

  if (permission === undefined) {
    getVotingPermission(state.pId);
  }

  const onShowModal = () => {
    if (showModal === false) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  console.log("ckecknum", parseUnits(state.target, 18));

  const handleSend = async () => {
    setIsLoading(true);
    const date = await setVotingPermission(
      state.pId,
      parseUnits(state.target, 18)
    );
    setIsLoading(false);
    if (date === "error") {
      onShowModal();
    } else {
      getVotingPermission(state.pId);
      navigate("/profile");
    }
  };

  console.log("er", error);

  const checkDonators = () => {
    const findDonator = donators.find((elem) => {
      return elem.donator.toLowerCase() === address.toLowerCase();
    });
    return findDonator;
  };

  const handleClaim = async () => {
    if (checkDonators() === undefined) {
      setIsLoading(true);
      const date = await donate(state.pId);

      setIsLoading(false);
      if (date === "error") {
        onShowModal();
      } else {
        navigate("/");
      }
    } else {
      setActive(true);
    }
  };

  const handleAnalysis = () => {
    console.log("need link");
  };

  return (
    <>
      {tokenBalance >= 1000 ? (
        <div>
          {isLoading && <Loader />}
          <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
              <img
                src={state.image}
                alt="campaign"
                className="w-full h-[410px] object-cover rounded-xl"
              />
              <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                <div
                  className="absolute h-full bg-[#4acd8d]"
                  style={{
                    width: `${calculateBarPercentage(
                      state.target,
                      state.amountCollected
                    )}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </div>
            <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
              <CountBox
                title="Days Left"
                value={
                  Number(state.target) < Number(state.amountCollected)
                    ? "Collect"
                    : remainingDays >= 0
                    ? remainingDays
                    : "End"
                }
              />
              <CountBox title={`Goal `} value={state.target} />
              <CountBox title="Total voices" value={state.amountCollected} />
            </div>
          </div>
          <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex flex-col basis-2/3">
              <div className="flex flex-col gap-[40px] mb-[50px]">
                <h4 className="font-epilogue font-semibold text-[18px] text-white p-3 uppercase">
                  Creator
                </h4>
                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img
                      src={logo}
                      alt="user"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[18px] text-white break-all">
                      {state.owner}
                    </h4>
                    <p className="mt-[41px] font-epilogue font-normal text-[12px] text-[#808191]">
                      Campaign creator
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-3">
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Project NAME
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {state.title}
                  </p>
                </div>
              </div>
              <div className="my-3">
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Invited
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {state.invited}
                  </p>
                </div>
              </div>
              <div className="my-3">
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  About
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {state.description}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Voters
                </h4>
                <div className="mt-[20px] flex flex-col gap-4">
                  {donators.length > 0 ? (
                    donators.map((item, index) => (
                      <div
                        key={`${item.donator}-${index}`}
                        className="flex justify-between items-center gap-4"
                      >
                        <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                          {index + 1}. {item.donator}
                        </p>
                        <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                          {item.donation}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      Vote for the project. Be the first one!
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Voting
              </h4>
              {permission === false ? (
                <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                  <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
                    Voting for analytical analysis
                  </p>
                  <div className="mt-[30px]">
                    <div className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]">
                      {`${Number(amount)} GRAV for voting`}
                    </div>
                    <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                      <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                        GRAV-inviter places GRAV tokens on the protocol voting.
                        During the day, voting will be open.
                      </h4>
                    </div>
                    <div className="flex flex-col justify-center my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                      <CustomButton
                        btnType="button"
                        title="Send 100 GRAV"
                        styles="w-full bg-[#8c6dfd] hover:bg-[#7c6dfd]"
                        handleClick={handleSend}
                        yes={
                          address.toLowerCase() !== state.owner.toLowerCase()
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {Number(state.target) >= Number(state.amountCollected) ? (
                    <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                      <div className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]">
                        <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                          If the project receives 100% of the votes, the project
                          is transferred to analytical department. Project
                          information will be available after a complete review
                          of the project on the current page or in block
                          approved for financing. Вo not forget there are
                          requirements for financing projects and limits on the
                          use of funds for each group of management.
                        </p>
                      </div>
                      <div className="flex justify-center my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                        <CustomButton
                          btnType="button"
                          title={
                            active === false
                              ? "Give you voice"
                              : "You have already voted"
                          }
                          styles="w-full bg-[#8c6dfd] hover:bg-[#7c6dfd]"
                          handleClick={handleClaim}
                          yes={amount <= 0 ? true : false}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                      <div className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]">
                        <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                          Project submitted to Project Review
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <div className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]">
                  <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                    Project Analysis Report. The report is entered by the
                    property DIGO GRAVITATION-ETHER and its participants.
                    Distribution in any sources of information space is subject
                    to fines. Value your money and time. Available only DIGO
                    participants
                  </p>
                </div>
                <div className="flex justify-center my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <CustomButton
                    btnType="button"
                    title="Project analysis for GA"
                    styles="w-full bg-[#8c6dfd] hover:bg-[#7c6dfd]"
                    handleClick={handleAnalysis}
                    yes={amount <= 0 ? true : false}
                  />
                </div>
              </div>
            </div>
          </div>
          <Modal
            showModal={showModal}
            onShowModal={onShowModal}
            error={error}
          />
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default CampaignDetails;
