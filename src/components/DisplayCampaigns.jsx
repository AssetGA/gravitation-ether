import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";
import Pagination from "./Pagination";
import { paginate } from "../utils";
import Search from "./Search";
import PropTypes from "prop-types";

const DisplayCampaigns = React.memo(function DisplayCampaigns({
  title,
  isLoading,
  campaigns,
}) {
  const navigate = useNavigate();

  const [searchCampaigns, setSearchCampaigns] = useState([]);

  const list = searchCampaigns.length !== 0 ? searchCampaigns : campaigns;

  const count =
    searchCampaigns.length !== 0 && campaigns !== undefined
      ? searchCampaigns.length
      : campaigns.length;
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    if (pageIndex !== 0 && pageIndex < Math.round(count / pageSize) + 2) {
      setCurrentPage(pageIndex);
    }
  };

  const campaignsCrop = paginate(list, currentPage, pageSize);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, {
      state: campaign,
    });
  };

  const findCampaign = (text) => {
    const newCampaignsArr = campaigns.filter((elem) => {
      if (
        elem.title.toLowerCase().substr(0, text.length) === text.toLowerCase()
      )
        return elem;
    });
    setSearchCampaigns(newCampaignsArr);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-raw justify-between my-[20px] lg:mr-[25px] mr-0">
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          {title} ({campaigns.length})
        </h1>
        <div className="">
          <Search findCampaign={findCampaign} />
        </div>
      </div>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contains"
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yes
          </p>
        )}
        {!isLoading &&
          count > 0 &&
          campaignsCrop.map((campaign, index) => (
            <FundCard
              key={index}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        total={count}
      />
    </div>
  );
});

DisplayCampaigns.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  campaigns: PropTypes.array,
};

export default DisplayCampaigns;
