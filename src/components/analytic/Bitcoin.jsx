import { useSelector } from "react-redux";
import SignInError from "../SignInError";

const Bitcoin = () => {
  const { tokenBalance } = useSelector((states) => states.globalStates);
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Bitcoin blockchain analysis. The entire blockchain is analyzed on
            algorithms for the presence of accounts and movements of funds. Will
            be available later.
          </h1>
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default Bitcoin;
