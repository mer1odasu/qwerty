import { useQuery } from "react-query";
import { useAuth } from "../../../../hooks/useAuth";
import historyService from "../../../../services/history.service";
import Loader from "../../../ui/Loader";
import { format } from "date-fns";
import { useState } from "react";
import {
  LuArrowDownWideNarrow,
  LuArrowUpWideNarrow,
  LuDownload,
} from "react-icons/lu";
import { TbArrowsUpDown } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { saveAs } from "file-saver";
import { $axios } from "../../../../api";

const HistoryTable = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery(
    ["getHistoryByUserId"],
    () => historyService.getHistoryByUserId(user.decode.sub, CalculatorId),
    { select: ({ data }) => data, retry: false }
  );

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "descending",
  });
  const [clickCount, setClickCount] = useState({});

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  const CalculatorId = 1;
  const handleSort = (key) => {
    setClickCount((prevCount) => {
      const newCount = { ...prevCount, [key]: (prevCount[key] || 0) + 1 };

      if (newCount[key] === 3) {
        setSortConfig({ key: null, direction: "descending" });
        return { ...prevCount, [key]: 0 };
      }

      const direction =
        sortConfig.key === key && sortConfig.direction === "descending"
          ? "ascending"
          : "descending";
      setSortConfig({ key, direction });

      return newCount;
    });
  };

  const handleDownload = async () => {
    try {
      const response = await $axios.get(
        `user/${user.decode.sub}/result/${CalculatorId}/excel`,
        {
          responseType: "blob",
        }
      );

      const fileName = "calculation_results.xlsx";
      saveAs(new Blob([response.data]), fileName);
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
    }
  };

  const sortedData = (data || []).slice().sort((a, b) => {
    if (sortConfig.key) {
      const aValue =
        sortConfig.key === "createdAt"
          ? new Date(a[sortConfig.key])
          : a[sortConfig.key];
      const bValue =
        sortConfig.key === "createdAt"
          ? new Date(b[sortConfig.key])
          : b[sortConfig.key];

      return sortConfig.direction === "descending"
        ? bValue - aValue
        : aValue - bValue;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const headers = [
    { label: "Результат", key: "resultValue" },
    { label: "Абсолютная погрешность ([Δ]±)", key: "value3" },
    { label: "Результат измерений X", key: "value2" },
    { label: "Разрядность", key: "value1" },
    { label: "Неопределённость по типу В(Ub∆)", key: "uncertaintyBType" },
    { label: "Суммарная неопределённость(Uc)", key: "uncertaintyTotal" },
    { label: "Расширенная неопределённость(U)", key: "uncertaintyExpanded" },
    { label: "Дата", key: "createdAt" },
  ];

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, sortedData.length);

  return (
    <div className="mt-4 px-4">
      {isLoading && <Loader />}
      {isError && <div className="text-red-500">Ошибка загрузки данных.</div>}

      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-white">
            <tr>
              {headers.map(({ label, key }) => (
                <th
                  key={key}
                  className="py-2 px-2 text-sm font-semibold cursor-pointer border-b border-gray-300"
                  onClick={() => handleSort(key)}
                >
                  {label}
                  {sortConfig.key === key ? (
                    sortConfig.direction === "ascending" ? (
                      <LuArrowUpWideNarrow className="inline ml-1" />
                    ) : (
                      <LuArrowDownWideNarrow className="inline ml-1" />
                    )
                  ) : (
                    <TbArrowsUpDown className="inline ml-1" />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="py-2 px-4 text-sm">{item.resultValue}</td>
                <td className="py-2 px-4 text-sm">{item.value3}</td>
                <td className="py-2 px-4 text-sm">{item.value2}</td>
                <td className="py-2 px-4 text-sm">{item.value1}</td>
                <td className="py-2 px-4 text-sm">{item.uncertaintyBType}</td>
                <td className="py-2 px-4 text-sm">{item.uncertaintyTotal}</td>
                <td className="py-2 px-4 text-sm">
                  {item.uncertaintyExpanded}
                </td>
                <td className="py-2 px-4 text-sm">
                  {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        {/* Кнопка "Скачать" слева */}
        <button
          onClick={handleDownload}
          className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 text-white hover:bg-sky-600"
        >
          <LuDownload className="mr-1" />
          Скачать
        </button>

        {/* Элементы в правом нижнем углу */}
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <label className="text-sm mr-2">Элементов на странице:</label>
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

          <div className="text-sm mr-4">
            {startItem}-{endItem} из {sortedData.length}
          </div>

          {/* Пагинация */}
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 text-sm ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded-l-md`}
            >
              <BiArrowToLeft className="text-lg" />
            </button>

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 py-1 text-sm ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <IoIosArrowBack className="text-lg" />
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-2 py-1 text-sm ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <IoIosArrowForward className="text-lg" />
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 text-sm ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded-r-md`}
            >
              <BiArrowToRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
