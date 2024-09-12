import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-8xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">Страница не найдена</p>
      <p className="mt-2 text-gray-500">Упс! Похоже, что вы зашли не туда.</p>
      <div className="mt-6">
        <a 
          href="/" 
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition"
        >
          Вернуться на главную
        </a>
      </div>
      <footer className="mt-10 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Ваш Сайт. Все права защищены.
      </footer>
    </div>
  );
};

export default NotFoundPage;
