'use client';

import React, { useState } from 'react';

const HistoryTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Сбрасываем страницу на 1 при изменении количества элементов
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <label htmlFor="itemsPerPage" className="mr-2">Элементов на странице:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full border-collapse border border-gray-200 text-center rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 py-2 px-4">Дата</th>
              <th className="border border-gray-300 py-2 px-4">Определяемый показатель</th>
              <th className="border border-gray-300 py-2 px-4">Единица измерений</th>
              <th className="border border-gray-300 py-2 px-4">Результат измерений X</th>
              <th className="border border-gray-300 py-2 px-4">Абсолютная погрешность</th>
              <th className="border border-gray-300 py-2 px-4">Представление результатов</th>
              <th className="border border-gray-300 py-2 px-4">Действие</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 py-2 px-4">{item.date}</td>
                <td className="border border-gray-300 py-2 px-4">{item.metric}</td>
                <td className="border border-gray-300 py-2 px-4">{item.unit}</td>
                <td className="border border-gray-300 py-2 px-4">{item.result}</td>
                <td className="border border-gray-300 py-2 px-4">{item.absoluteError}</td>
                <td className="border border-gray-300 py-2 px-4">{item.representation}</td>
                <td className="border border-gray-300 py-2 px-4">Действие</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'} rounded-l-md`}
        >
          &laquo;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-200 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'} rounded-r-md`}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default HistoryTable;
