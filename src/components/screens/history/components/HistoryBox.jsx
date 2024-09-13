"use client";

import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

// import LoadingModal from "../../../modals/LoadingModal"

const HistoryBox = () => {
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
            to={"/history/HistoryK1"}
          >
            <div className="focus:outline-none">
              <div className="flex justify-between items-center mb-1">
               	МИ П.16-2021
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HistoryBox;
