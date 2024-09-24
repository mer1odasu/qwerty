import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { PiTextColumns } from "react-icons/pi";
import { LuDownload, LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbArrowsUpDown } from "react-icons/tb";
import { format } from "date-fns";
import Loader from "../../../ui/Loader";
import historyService from "../../../../services/history.service";
import { useAuth } from "../../../../hooks/useAuth";
import { saveAs } from "file-saver";
import { $axios } from "../../../../api";

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

const HistoryTable = () => {
  const CalculatorId = 1;
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery(
    ["getHistoryByUserId"],
    () => historyService.getHistoryByUserId(user.decode.sub, CalculatorId),
    { select: ({ data }) => data, retry: false }
  );

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "descending", clickCount: {} });
  const [resultIds, setResultIds] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    select: true,
    resultValue: true,
    value3: true,
    value2: true,
    value1: true,
    uncertaintyBType: true,
    uncertaintyTotal: true,
    uncertaintyExpanded: true,
    createdAt: true,
  });

  const toggleSelectId = (id) => {
    setResultIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSendSelected = async () => {
    try {
      const response = await $axios.post(
        `user/${user.decode.sub}/result/${CalculatorId}/excel/byId`,
        { resultIds },
        { responseType: "blob" }
      );
      const fileName = "selected_results.xlsx";
      saveAs(new Blob([response.data]), fileName);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await $axios.get(
        `user/${user.decode.sub}/result/${CalculatorId}/excel`,
        { responseType: "blob" }
      );
      const fileName = "calculation_results.xlsx";
      saveAs(new Blob([response.data]), fileName);
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
    }
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const newClickCount = { ...prev.clickCount, [key]: (prev.clickCount[key] || 0) + 1 };
      let newDirection = prev.direction;

      if (newClickCount[key] === 3) {
        return { key: null, direction: "descending", clickCount: { [key]: 0 } };
      }

      if (prev.key === key) {
        newDirection = prev.direction === "ascending" ? "descending" : "ascending";
      } else {
        newDirection = "ascending";
      }

      return { key, direction: newDirection, clickCount: newClickCount };
    });
  };

  const sortedData = () => {
    if (!data || !sortConfig.key) return data || [];

    const sortedArray = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

    return sortedArray;
  };

  const paginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData().slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(sortedData().length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, sortedData().length);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleColumnVisibility = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mt-4 px-4">
      {isLoading && <Loader />}
      {isError && <div className="text-red-500">Ошибка загрузки данных.</div>}

      <div className="flex justify-end mb-4 relative">
        <button onClick={toggleDropdown} className="flex items-center p-2 bg-gray-200 rounded">
          <PiTextColumns className="text-lg" />
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute bg-white border rounded shadow-md mt-2 z-10 p-2">
            <div className="flex justify-between mb-2">
              <button
                onClick={() => setVisibleColumns(Object.fromEntries(Object.keys(visibleColumns).map(key => [key, false])))}
                disabled={!Object.values(visibleColumns).some(Boolean)}
                className={`flex justify-center rounded-md px-3 py-2 text-sm font-semibold ${!Object.values(visibleColumns).some(Boolean) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Скрыть все
              </button>
              <button
                onClick={() => setVisibleColumns(Object.fromEntries(Object.keys(visibleColumns).map(key => [key, true])))}
                disabled={Object.values(visibleColumns).every(Boolean)}
                className={`flex justify-center rounded-md px-3 py-2 text-sm font-semibold ${Object.values(visibleColumns).every(Boolean) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Показать все
              </button>
            </div>
            {headers.map(({ label, key }) => (
              <label key={key} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={visibleColumns[key]}
                  onChange={() => toggleColumnVisibility(key)}
                  className="hidden"
                />
                <div className={`relative inline-block w-8 h-4 mr-2`}>
                  <div className={`absolute left-0 w-full h-full rounded-full transition duration-200 ${visibleColumns[key] ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <div className={`absolute top-0 left-0 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${visibleColumns[key] ? 'translate-x-full' : 'translate-x-0'}`} />
                </div>
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-white">
            <tr>
              {visibleColumns.select && (
                <th className="py-2 px-2 text-sm font-semibold border-b border-gray-300">
                  <span className="text-sm">Выбрать</span>
                </th>
              )}
              {headers.map(({ label, key }) => (
                visibleColumns[key] && (
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
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData().map(item => (
              <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-200">
                {visibleColumns.select && (
                  <td className="py-2 px-4 text-sm">
                    <input
                      type="checkbox"
                      checked={resultIds.includes(item.id)}
                      onChange={() => toggleSelectId(item.id)}
                      className="rounded-sm"
                    />
                  </td>
                )}
                {visibleColumns.resultValue && <td className="py-2 px-4 text-sm">{item.resultValue}</td>}
                {visibleColumns.value3 && <td className="py-2 px-4 text-sm">{item.value3}</td>}
                {visibleColumns.value2 && <td className="py-2 px-4 text-sm">{item.value2}</td>}
                {visibleColumns.value1 && <td className="py-2 px-4 text-sm">{item.value1}</td>}
                {visibleColumns.uncertaintyBType && <td className="py-2 px-4 text-sm">{item.uncertaintyBType}</td>}
                {visibleColumns.uncertaintyTotal && <td className="py-2 px-4 text-sm">{item.uncertaintyTotal}</td>}
                {visibleColumns.uncertaintyExpanded && <td className="py-2 px-4 text-sm">{item.uncertaintyExpanded}</td>}
                {visibleColumns.createdAt && <td className="py-2 px-4 text-sm">{format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        {resultIds.length > 0 ? (
          <button
            onClick={handleSendSelected}
            className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold bg-sky-500 text-white hover:bg-sky-600"
          >
            Скачать выбранные ({resultIds.length})
          </button>
        ) : (
          <button
						onClick={handleDownload}
            className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold bg-sky-500 text-white hover:bg-sky-600"
          >
            <LuDownload className="mr-1" />
            Скачать
          </button>
        )}

        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <label className="text-sm mr-2">Элементов на странице:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded-lg p-1 text-sm"
            >
              {[5, 10, 15, 20].map(number => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>
          </div>

          <div className="text-sm mr-4">
            {startItem}-{endItem} из {sortedData().length}
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"} rounded-l-md`}
            >
              <BiArrowToLeft className="text-lg" />
            </button>

            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 py-1 text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"}`}
            >
              <IoIosArrowBack className="text-lg" />
            </button>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 text-sm ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"}`}
            >
              <IoIosArrowForward className="text-lg" />
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 text-sm ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"} rounded-r-md`}
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
