import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 to-gray-100 opacity-75" />
      <div className="relative z-10 text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4 animate-pulse">
          404
        </h1>
        <p className="mt-4 text-3xl font-semibold">Страница не найдена</p>
        <p className="mt-2 text-xl">
          Кажется, мир этого момента ускользнул... 🌌
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Вернуться на главную
          </a>
        </div>
        <footer className="mt-10 text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Ваш Сайт. Все права защищены.
        </footer>
      </div>
    </div>
  );
};

export default NotFoundPage;
