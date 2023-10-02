import { useSelector } from "react-redux";
import SignInError from "../SignInError";

const DefiAnalysis = () => {
  const { tokenBalance } = useSelector((states) => states.globalStates);
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Information on the analysis of the state of DEFI projects on the
            ongoing operations on these projects, their vision of the situation.
            Will be available later.
          </h1>
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default DefiAnalysis;
