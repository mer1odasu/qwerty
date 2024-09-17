const Input = ({ register, name, label, options, error, ...rest }) => {
  return (
        <input
          {...register(name, options)}
          {...rest}
        />
  );
};

export default Input;
