import { useStateContext } from "../../context/StateContext";
import SignInError from "../SignInError";

const DigoProjectFinancing = () => {
  const { tokenBalance } = useStateContext();
  return (
    <>
      {tokenBalance >= 4000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Financing of DIGO GRAVITATION-ETHER projects. Section is under
            development
          </h1>
        </div>
      ) : (
        <SignInError volume={4000} />
      )}
    </>
  );
};

export default DigoProjectFinancing;
