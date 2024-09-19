import React from "react";

const SearchInput = ({ placeholder, id, setSearchBy }) => {
  return (
    <input
      id={id}
      autoComplete={id}
      placeholder={placeholder}
      onChange={(e) => setSearchBy(e.target.value)}
      className="
          text-black
          font-light
          mb-2
          py-2
          px-4
          bg-neutral-100 
          dark:bg-lightgray
          w-full 
          rounded-full
          focus:outline-none
          dark:text-white
        "
    />
  );
};

export default SearchInput;
