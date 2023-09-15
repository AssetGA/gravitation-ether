import { useStateContext } from "../../context/StateContext";
import SignInError from "../SignInError";

const GasSpaceFinancing = () => {
  const { tokenBalance } = useStateContext();
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Financing projects proposed by participants at the GAS-space level.
            Section is under development
          </h1>
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default GasSpaceFinancing;
