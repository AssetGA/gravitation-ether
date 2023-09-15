import { useStateContext } from "../../context/StateContext";
import SignInError from "../SignInError";

const IndustryDiagnostic = () => {
  const { tokenBalance } = useStateContext();
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Analytical information and comparison of the development of regions
            and industries to identify promising developments in the field of
            investment. Identification of clear perspectives on the development
            of the state as an element of the infrastructure for the development
            of corporations. Will be available later.
          </h1>
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default IndustryDiagnostic;
