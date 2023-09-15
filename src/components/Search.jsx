import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Search = ({ findCampaign }) => {
  const [text, onChangeText] = useState("");
  useEffect(() => {
    if (text !== "") {
      findCampaign(text);
    } else {
      findCampaign("");
    }
  }, [text]);

  return (
    <form className="relative w-full max-w-sm">
      <div className=" lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          value={text}
          onChange={(e) => onChangeText(e.target.value.trim())}
        />
      </div>
    </form>
  );
};

Search.propTypes = {
  findCampaign: PropTypes.func,
};

export default Search;
