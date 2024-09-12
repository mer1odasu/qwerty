const Field = ({ register, name, label, options, error, ...rest }) => {
  return (
    <div>
      <div className="mt-2">
        <input
          {...register(name, options)}
          {...rest}
          className="
					form-input
					block 
					w-full 
					rounded-md 
					border-0 
					py-1.5 
					text-gray-900 
					shadow-sm 
					ring-1 
					ring-inset 
					ring-gray-300 
					placeholder:text-gray-400 
					focus:ring-2 
					focus:ring-inset 
					focus:ring-sky-600 
					sm:text-sm 
					sm:leading-6
					dark:bg-lightgray
					dark:ring-gray-500
					dark:text-white
					"
        />
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Field;
