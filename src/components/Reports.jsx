import { analytics } from "../constant";
import { Link, Outlet } from "react-router-dom";

const Reports = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex my-[50px] mx-[20px] text-[16px] md:text-[18px]">
        This section is the main element of obtaining information that each
        participant of DIGO can propose to supplement. Send you recommend to our
        email (write you GA address). Analytics algorithms are the property of
        the company and cannot be decrypted.
      </div>
      <nav className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {analytics.map((elem, index) => (
          <Link
            to={`/reports${elem.link}`}
            className="flex justify-center"
            key={index}
          >
            <div className="flex w-[300px] h-full bg-[#1c1c24] rounded-md hover:bg-[#808191]">
              <div className="flex justify-center items-center w-full h-[100px] py-[15px] m-[15px] sm:px-[20px] px-[10px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] md:text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]">
                {elem.name}
              </div>
            </div>
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
};

export default Reports;
