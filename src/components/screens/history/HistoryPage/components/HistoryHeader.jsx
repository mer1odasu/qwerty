
// import { useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import {Link} from "react-router-dom";

const CalculatorHeader= () => {
  // const [drawerOpen, setDrawerOpen] = useState(false);

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
            href="/calculator"
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
            <div className="font-semibold">История подсчетов</div>
            {/* <div className="text-sm font-light text-neutral-500 dark:text-gray-400">
              {statusText}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorHeader;
