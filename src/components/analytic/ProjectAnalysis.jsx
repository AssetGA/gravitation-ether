import { useSelector } from "react-redux";
import SignInError from "../SignInError";

const ProjectAnalysis = () => {
  const { tokenBalance } = useSelector((states) => states.globalStates);
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Analytical analysis of the project for risks, growth prospects,
            applicability of the project technology, contact with the
            development team, applicability in DIGO developments, functional
            application, identification of market segments, financing of the
            project from DIGO funds by voting or by making a decision by
            management. Will be available later.
          </h1>
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default ProjectAnalysis;
