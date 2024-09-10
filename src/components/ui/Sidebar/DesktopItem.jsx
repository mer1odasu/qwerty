import clsx from "clsx";
import Link from "next/link";

const DesktopItem = ({ label, href, icon: Icon, active, onClick }) => {
  return (
    <li onClick={onClick} key={label}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 dark:hover:bg-lightgray dark:hover:text-gray-100",
          active && "bg-gray-100 text-black dark:bg-lightgray dark:text-gray-200"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
