import ProfileItem from "./ProfileItem"

const DesktopSidebar = () => {
  // const location = useLocation(); // Получаем текущее местоположение

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
          {/* {routes.map(({ label, path, icon }) => (
            <DesktopItem
              key={label}
              label={label}
              href={path} // Примечание: используем href для DesktopItem
              icon={icon} // Передаем иконку, если она есть
              active={location.pathname === path} // Проверяем, активен ли элемент
            />
          ))} */}
					<li>
						qqqqq
					</li>
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        {/* <ThemeToggle /> */}
        <ProfileItem /> 
      </nav>
    </div>
  );
};

export default DesktopSidebar;
