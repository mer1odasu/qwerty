import { BiErrorCircle } from "react-icons/bi"; // Иконка для визуального акцента
import {Link} from "react-router-dom"

const NotConfirmed = () => {
  return (
      <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-50 dark:bg-gray-800">
        <BiErrorCircle className="w-16 h-16 text-red-500 mb-4" aria-hidden="true" />
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Ваша учетная запись требует одобрения администратора </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center">
					Ваша учетная запись еще не подтверждена. Пожалуйста, ожидайте уведомление на почту о подтверждении.
				</p>
        <div className="mt-8">
          <Link to="/auth" className="inline-block px-5 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
            Вернуться на страницу входа
          </Link>
        </div>
      </div>
  );
};

export default NotConfirmed;
