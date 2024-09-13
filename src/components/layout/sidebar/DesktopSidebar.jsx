import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileItem from "./ProfileItem";
import { CiCalculator2 } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import clsx from "clsx";
import Cookies from "js-cookie";
import { useAuth } from "../../../hooks/useAuth";
import { FiHome } from "react-icons/fi";

const DesktopSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isActive = (path) => location.pathname === path;
  const handleLogout = async () => {
    Cookies.remove("token");
    window.location.reload();
  };
  return (
    <div
      className="
      hidden 
      lg:fixed 
      lg:inset-y-0 
      lg:left-0 
      lg:z-40 
      lg:w-20 
      xl:px-6
      lg:overflow-y-auto 
      lg:bg-white 
      lg:border-r-[1px]
      lg:pb-4
      lg:flex
      lg:flex-col
      justify-between
      dark:bg-dusk
      dark:border-lightgray
    "
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          <li>
            <Link
              to="/"
              className={clsx(
                "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:bg-lightgray dark:hover:text-gray-100",
                isActive("/") &&
                  "bg-gray-100 text-black dark:bg-lightgray dark:text-gray-200"
              )}
            >
              <FiHome className="h-6 w-6 shrink-0" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              to="/calculator"
              className={clsx(
                "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:bg-lightgray dark:hover:text-gray-100",
                isActive("/calculator") &&
                  "bg-gray-100 text-black dark:bg-lightgray dark:text-gray-200"
              )}
            >
              <CiCalculator2 className="h-6 w-6 shrink-0" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className={clsx(
                "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:bg-lightgray dark:hover:text-gray-100",
                isActive("/history") &&
                  "bg-gray-100 text-black dark:bg-lightgray dark:text-gray-200"
              )}
            >
              <GoHistory className="h-6 w-6 shrink-0" aria-hidden="true" />
            </Link>
          </li>
          {user.decode.isAdmin && (
            <li>
              <Link
                to="/admin"
                className={clsx(
                  "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:bg-lightgray dark:hover:text-gray-100",
                  isActive("/admin") &&
                    "bg-gray-100 text-black dark:bg-lightgray dark:text-gray-200"
                )}
              >
                <HiUsers className="h-6 w-6 shrink-0" aria-hidden="true" />
              </Link>
            </li>
          )}
          <li>
            <Link
              onClick={handleLogout}
              className={clsx(
                "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:bg-lightgray dark:hover:text-gray-100",
                isActive("/#") &&
                  "bg-gray-100 text-black dark:bg-lightgray dark:text-gray-200"
              )}
            >
              <HiArrowLeftOnRectangle
                className="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <ProfileItem />
      </nav>
    </div>
  );
};

export default DesktopSidebar;
