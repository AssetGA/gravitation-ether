import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logo, menu } from "../assets";
import CustomButton from "./CustomButton";
import { navlinks } from "../constant";
import { useStateContext } from "../context/StateContext";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, wallet: address } = useSelector(
    (states) => states.globalStates
  );
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const notify = () => toast("Please install Metamask");

  const { checkConnection, connectWallet } = useStateContext();

  useEffect(() => {
    connect === true && notify();
    if (connect === false) {
      checkConnection();
    }
  }, [connect, address]);

  console.log("address", address);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 mr-0">
      <div className="flex justify-center items-center text-lx font-bold font-sanserif px-[20px]">
        DIGO GRAVITATION-ETHER
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connectWallet();
          }}
        />
        <a
          href="https://gravitation-ether.org/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={logo}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </a>
      </div>
      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <div className="flex mx-4">
          <CustomButton
            btnType="button"
            title={address ? "Create a campaign" : "Connect"}
            styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) navigate("create-campaign");
              else connectWallet();
            }}
            yes={true}
          />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary my-4 py-4 ${
            !toggleDrawer ? "-translate-y-[120vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((Link) => (
              <li
                key={Link.name}
                className={`flex p-4 ${
                  isActive === Link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(Link.name);
                  setToggleDrawer(false);
                  navigate(Link.link);
                }}
              >
                <img
                  src={Link.imgUrl}
                  alt={Link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === Link.name ? "grayscale-0" : "grayscale"
                  } `}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === Link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {Link.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
