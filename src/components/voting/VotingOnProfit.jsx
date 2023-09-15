import { useStateContext } from "../../context/StateContext";
import SignInError from "../SignInError";

const VotingOnProfit = () => {
  const { tokenBalance } = useStateContext();
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Voting on profit sharing. Section is under development
          </h1>
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default VotingOnProfit;
