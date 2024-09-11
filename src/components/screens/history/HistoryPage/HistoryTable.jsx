import React from 'react';

// Компонент таблицы для отображения истории
const HistoryTable = ({ data }) => {
  return (
    <div className="overflow-x-auto shadow-md">
      <table className="min-w-full border-collapse border border-gray-200 text-center rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {['Дата', 'Показатель', 'Единица', 'Результат', 'Погрешность', 'Представление'].map((header, index) => (
              <th key={index} className="border border-gray-300 py-2 px-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 py-2 px-4">{item.date}</td>
              <td className="border border-gray-300 py-2 px-4">{item.metric}</td>
              <td className="border border-gray-300 py-2 px-4">{item.unit}</td>
              <td className="border border-gray-300 py-2 px-4">{item.result}</td>
              <td className="border border-gray-300 py-2 px-4">{item.absoluteError}</td>
              <td className="border border-gray-300 py-2 px-4">{item.representation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
