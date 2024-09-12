"use client";

import { useCallback, useState } from "react";
import { Link } from "react-router-dom"

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
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <Link className="block text-lg font-semibold text-gray-900 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300 transition p-2" to={('/admin/users')}>Список пользователей</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBox;
