import { useStateContext } from "../../context/StateContext";
import SignInError from "../SignInError";

const Statictic = () => {
  const { tokenBalance } = useStateContext();
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Statistical information on the production of food industry,
            robotics, technology, metallurgy, space industry, transportation,
            oil production, renewable energy. Will be available later.
          </h1>
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default Statictic;
