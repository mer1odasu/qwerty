const Button = ({
  children,
  clickHandler = null,
  type = "button",
  fullWidth = false,
  secondary = false,
  danger = false,
  disabled = false,
}) => {
  const baseClasses = `
    flex 
    justify-center 
    rounded-md 
    px-3 
    py-2 
    text-sm 
    font-semibold 
    focus-visible:outline 
    focus-visible:outline-2 
    focus-visible:outline-offset-2
  `;

  const conditionalClasses = `
    ${disabled ? "opacity-50 cursor-default" : ""}
    ${fullWidth ? "w-full" : ""}
    ${
      secondary
        ? "text-gray-900 bg-gray-300 hover:bg-gray-400"
        : "text-white bg-sky-500 hover:bg-sky-600"
    }
    ${
      danger
        ? "text-white bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600"
        : ""
    }
  `;

  return (
    <div>
      <button
        onClick={clickHandler}
        type={type}
        disabled={disabled}
        className={`${baseClasses} ${conditionalClasses}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
