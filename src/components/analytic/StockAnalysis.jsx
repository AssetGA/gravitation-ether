import { useSelector } from "react-redux";
import SignInError from "../SignInError";

const StockAnalysis = () => {
  const { tokenBalance } = useSelector((states) => states.globalStates);
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Analytical information presented by analysts and own opinion and
            forecasts of market development. Will be available later.
          </h1>
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default StockAnalysis;
