const Avatar = () => {
  return (
    <div className="relative h-9 md:h-11">
      <div
        className="
          relative 
          inline-block 
          rounded-full 
          overflow-hidden
          h-9 
          w-9 
          md:h-11 
          md:w-11
        "
      >
        <img
          className="object-cover"
          fill
          src={"/images/avatar-placeholder.png"}
          alt="Avatar"
        />
      </div>
    </div>
  );
};

export default Avatar;
