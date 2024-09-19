import { useEffect, useState } from "react";

const ErrorMessage = ({ message, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(false); // Сначала скрываем сообщение для перезапуска анимации
      setTimeout(() => {
        setIsVisible(true);
      }, 100); // Небольшая задержка для перезапуска анимации

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer); // Очищаем таймер при размонтировании
    }
  }, [message, duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg transform transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;
