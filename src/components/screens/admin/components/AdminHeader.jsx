"use client";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <>
      <div
        className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
        dark:bg-dusk
        dark:border-lightgray
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            to="/calculator"
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>

          <div className="flex flex-col dark:text-gray-200 text-lg">
            <div>Список пользователей</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
