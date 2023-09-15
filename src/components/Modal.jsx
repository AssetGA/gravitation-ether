import CustomButton from "./CustomButton";
import PropTypes from "prop-types";

const Modal = ({ showModal, onShowModal, error }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#1c1c24] ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#3a3a43] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onShowModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto mx-5">
                  <p className="my-4 text-lg leading-relaxed px-5">{error}</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <CustomButton
                    btnType="button"
                    title="Close"
                    styles="w-full bg-[#8c6dfd] hover:bg-[#7c6dfd]"
                    handleClick={onShowModal}
                    // yes={amount <= 0 ? true : false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  onShowModal: PropTypes.func,
  error: PropTypes.string,
};

export default Modal;
