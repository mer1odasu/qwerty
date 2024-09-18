import React from "react";
import Layout from "../../layout/Layout";

const UnderConstructionPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800 relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h1 className="text-9xl font-bold text-yellow-600 mb-4 animate-pulse">
            🚧
          </h1>
          <p className="mt-4 text-3xl font-semibold">Страница в разработке</p>
          <p className="mt-2 text-xl">
            Спасибо за ваше терпение! Мы скоро вернёмся! 🔧✨
          </p>
          <footer className="mt-10 text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Ваш Сайт. Все права защищены.
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default UnderConstructionPage;
