import { useEffect, useState } from "react";
import { CustomButton, FormField, Loader, SignInError } from "../components";
import { money } from "../assets";
import { parseUnits } from "ethers";
import { checkIfImage, validator } from "../utils";
import { useStateContext } from "../context/StateContext";
import { useSelector } from "react-redux";

const CreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaignCreated, setCampaignCreated] = useState(false);
  const { tokenBalance, projectNames } = useSelector(
    (states) => states.globalStates
  );
  const { createCampaign, crowdfundingError, getNameOfProject } =
    useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    tokenUrl: "",
    description: "",
    target: "100",
    deadline: "",
    image: "",
    invited: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getNameOfProject();
  }, [form.title]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Write your name",
      },
      isMaxLetter: {
        message: "Name not more than 50 letters",
        value: 40,
      },
    },
    title: {
      isRequired: {
        message: "Fill in the Project name",
      },
      isCheck: {
        message: "Project with that name exists",
        value: projectNames,
      },
      isMaxLetter: {
        message: "Project name not more than 50 letters",
        value: 50,
      },
    },
    tokenUrl: {
      isRequired: {
        message: "Fill in the Project url",
      },
      isUrl: {
        message: "Fill in the address of the site",
      },
    },
    description: {
      isText: {
        message: "Fill in the Project description",
      },
      isMaxLetter: {
        message: "Description not more than 200 letters",
        value: 200,
      },
    },
    target: {
      isContainDigit: {
        message: "Only digit",
      },
      isMinDigit: {
        message: "Minimum amount of 100 votes",
        value: 100,
      },
    },
    deadline: {
      isMinTime: {
        message: "Check deadline time",
        value: new Date().getTime(),
      },
    },
    invited: {
      isRequired: {
        message: "Fill you account for bonus",
      },
      isAddress: {
        message: "Account to which the bonus is credited",
      },
    },
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        const data = await createCampaign({
          ...form,
          target: parseUnits(form.target, 18),
        });
        setIsLoading(false);
        console.log("date", data);
        if (data) {
          setCampaignCreated(true);
        }
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  useEffect(() => {
    validate();
  }, [form]);

  const validate = () => {
    const errors = validator(form, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          {isLoading && <Loader />}
          {!campaignCreated ? (
            <>
              <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
                  Add project
                </h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full mt-[65px] flex flex-col gap-[30px]"
              >
                <div className="flex flex-wrap gap-[40px]">
                  <FormField
                    labelName="Your Name *"
                    placeholder="Nicola Tesla"
                    inputType="text"
                    value={form.name}
                    handleChange={(e) => handleFormFieldChange("name", e)}
                    error={errors.name}
                  />
                  <FormField
                    labelName="Project Name *"
                    placeholder="Write a title"
                    inputType="text"
                    value={form.title}
                    handleChange={(e) => handleFormFieldChange("title", e)}
                    error={errors.title}
                  />
                </div>

                <FormField
                  labelName="About project *"
                  placeholder="Summary of project objectives"
                  isTextArea
                  value={form.description}
                  handleChange={(e) => handleFormFieldChange("description", e)}
                  error={errors.description}
                />
                <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                  <img
                    src={money}
                    alt="money"
                    className="w-[40px] h-[40px] object-contain"
                  />
                  <h4 className="font-epilogue font-bold md:text-[25px] text-[15px] text-white ml-[20px]">
                    You will receive a bonus of 10% of the return on investment
                    in the project
                  </h4>
                </div>
                <div className="flex flex-wrap gap-[40px]">
                  <FormField
                    labelName="Goal vote *"
                    placeholder="100 voting"
                    inputType="text"
                    value={form.target}
                    handleChange={(e) => handleFormFieldChange("target", e)}
                    error={errors.target}
                  />
                  <FormField
                    labelName="End Date (recommend more than one year)"
                    placeholder="End Date"
                    inputType="date"
                    value={form.deadline}
                    handleChange={(e) => handleFormFieldChange("deadline", e)}
                    error={errors.deadline}
                  />
                </div>
                <div className="flex flex-wrap gap-[40px]">
                  <FormField
                    labelName="Project url *"
                    placeholder="place URL of your project"
                    inputType="url"
                    value={form.tokenUrl}
                    handleChange={(e) => handleFormFieldChange("tokenUrl", e)}
                    error={errors.tokenUrl}
                  />
                  <FormField
                    labelName="Account Ethereum for bonus sending *"
                    placeholder="Write the address of the person who invited owner of project"
                    inputType="text"
                    value={form.invited}
                    handleChange={(e) => handleFormFieldChange("invited", e)}
                    error={errors.invited}
                  />
                </div>
                <FormField
                  labelName="Project image *"
                  placeholder="place image URL of project"
                  inputType="url"
                  value={form.image}
                  handleChange={(e) => handleFormFieldChange("image", e)}
                />

                <div className="flex justify-center items-center mt-[40px]">
                  <CustomButton
                    btnType="submit"
                    title="Create new project"
                    styles="bg-[#1dc071]"
                    yes={!isValid ? true : false}
                  />
                </div>
              </form>
            </>
          ) : (
            <div>
              {crowdfundingError === null || crowdfundingError === undefined
                ? "You project was registed"
                : crowdfundingError}
            </div>
          )}
        </div>
      ) : (
        <SignInError volume={1000} />
      )}
    </>
  );
};

export default CreateCampaign;
