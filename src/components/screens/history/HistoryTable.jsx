import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import historyService from "../../../services/history.service";
import Loader from "../../ui/Loader";
import { format } from "date-fns";
import { useState } from "react";

const HistoryTable = () => {
  const { user } = useAuth();
  const { data, refetch, isLoading } = useQuery(
    ["getHistoryByUserId"],
    () => historyService.getHistoryByUserId(user.decode.sub),
    { select: ({ data }) => data }
  );

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const currentData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mt-4 px-4">
      {isLoading && <Loader />}
      <div className="flex justify-between items-center mb-4">
        <label className="text-lg">Элементов на странице:</label> 
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border border-gray-300 rounded-lg p-1 text-sm"
        >
          {[5, 10, 15, 20].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full border-collapse border border-gray-200 text-center rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Результат",
                "Абсолютная погрешность [Δ]",
                "Результат измерений X",
                "Разрядность",
                "Неопределённость по типу В",
                "Суммарная неопределённость",
                "Расширенная неопределённость",
                "Дата",
              ].map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 py-1 px-2 text-sm font-semibold text-center" // Добавлен класс text-center для заголовков
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 py-1 px-2 text-sm text-center"> {/* Добавлен класс text-center для ячеек */}
                  {item.resultValue}
                </td>
                <td className="border border-gray-300 py-1 px-2 text-sm text-center">
                  {item.value3}
                </td>
                <td className="border border-gray-300 py-2 px-4 text-sm text-center">
                  {item.value2}
                </td>
                <td className="border border-gray-300 py-2 px-4 text-sm text-center">
                  {item.value1}
                </td>
                <td className="border border-gray-300 py-2 px-4 text-sm text-center">
                  {item.uncertaintyBType}
                </td>
                <td className="border border-gray-300 py-2 px-4 text-sm text-center">
                  {item.uncertaintyTotal}
                </td>
                <td className="border border-gray-300 py-2 px-4 text-sm text-center">
                  {item.uncertaintyExpanded}
                </td>
                <td className="border border-gray-300 py-1 px-2 text-sm text-center">
                  {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация по центру */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-2 py-1 text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'} rounded-l-md`}
        >
          &laquo; 
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-2 py-1 border border-gray-300 text-sm ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'} rounded-r-md`}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default HistoryTable;
