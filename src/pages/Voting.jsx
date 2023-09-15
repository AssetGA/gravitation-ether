import { Link, Outlet } from "react-router-dom";
import { votingLinks } from "../constant";

const Voting = () => {
  return (
    <div className="flex flex-col">
      <div className="flex my-[30px]">
        <h1 className="px-2 text-2xl font-sun-serif font-bold pl-[40px]">
          Who owns the information owns the situation
        </h1>
      </div>
      <div>
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {votingLinks.map((elem, index) => (
            <Link to={`/voting${elem.link}`} key={index} state={elem.name}>
              <div className="mt-[40px] flex flex-col bg-[#1c1c24] rounded-[10px]">
                <div className="m-4 flex justify-center h-full items-center sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#b1b7c6] rounded-[10px] hover:bg-[#b1b7c6] text-[#b1b7c6] hover:text-black">
                  <p className="my-[20px] font-epilogue font-normal leading-[22px] ">
                    {elem.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Voting;
