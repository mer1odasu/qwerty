"use client";

import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

// import LoadingModal from "../../../modals/LoadingModal"

const AdminBox = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {/* {isLoading && <LoadingModal />} */}
      <div
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
          dark:bg-dusk
          dark:hover:bg-lightgray
        "
      >
        <div className="min-w-0 flex-1">
          <Link
            className="text-md font-medium text-gray-900 dark:text-gray-200"
            to={"/admin/users"}
          >
            <div className="focus:outline-none">
              <div className="flex justify-between items-center mb-1">
                Пользователи
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminBox;
