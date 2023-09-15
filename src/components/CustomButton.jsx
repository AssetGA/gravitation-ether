import PropTypes from "prop-types";

const CustomButton = ({ btnType, title, handleClick, styles, yes }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
      disabled={yes === true ? true : false}
    >
      {title}
    </button>
  );
};

CustomButton.propTypes = {
  btnType: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  styles: PropTypes.string,
  yes: PropTypes.bool,
};

export default CustomButton;
