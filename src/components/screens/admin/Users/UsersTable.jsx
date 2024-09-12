import React, { useState, useEffect } from 'react';
import Button from '../../../ui/Button/Button'; // проверьте путь

const UsersTable = ({ columns = [], data = [], roles = [] }) => {
  const [selectedRows, setSelectedRows] = useState(Array(data.length).fill(false));
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [roleUpdates, setRoleUpdates] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSelectedRows(Array(data.length).fill(false));
  }, [data]);

  const filteredData = data.filter(row =>
    columns.some(column =>
      row[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleCheckboxChange = (index) => {
    setSelectedRows(prev => {
      const newSelection = [...prev];
      newSelection[index] = !newSelection[index];
      return newSelection;
    });
  };

  const handleDelete = () => {
    const selectedIndices = selectedRows
      .map((isSelected, index) => (isSelected ? index : -1))
      .filter(index => index !== -1);

    if (selectedIndices.length === 0) {
      return alert("Нет выбранных элементов для удаления.");
    }

    if (window.confirm("Вы уверены, что хотите удалить выбранные элементы?")) {
      console.log("Удалить элементы:", selectedIndices);
      setMessage("Элементы успешно удалены.");
      setSelectedRows(Array(data.length).fill(false));
    }
  };

  const handleCreate = () => {
    console.log("Создание нового элемента");
  };

  const handleRoleChange = (index, newRole) => {
    setRoleUpdates(prev => ({ ...prev, [index]: newRole }));
    console.log(`Изменить роль для строки ${index}: ${newRole}`);
  };

  const handleSaveChanges = () => {
    console.log("Сохранить изменения:", roleUpdates);
    setMessage("Изменения сохранены.");
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between mb-4 items-center">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md px-1 py-2.5 w-64 text-sm"
          />
          <Button onClick={handleCreate}>Создать</Button>
          {selectedRows.some(Boolean) && (
            <Button danger onClick={handleDelete}>Удалить</Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full border-collapse border border-gray-200 text-center text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 py-1 px-2">
                <input
                  type="checkbox"
                  onChange={(event) => {
                    const newValue = event.target.checked;
                    setSelectedRows(Array(currentRows.length).fill(newValue));
                  }}
                  checked={selectedRows.every(Boolean)}
                />
              </th>
              {columns.map((column, index) => (
                <th className="border border-gray-300 py-1 px-2" key={index}>
                  {column}
                </th>
              ))}
              <th className="border border-gray-300 py-1 px-2">Роль</th>
              <th className="border border-gray-300 py-1 px-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, rowIndex) => (
                <tr className="hover:bg-gray-50" key={rowIndex}>
                  <td className="border border-gray-300 py-1 px-2">
                    <input
                      type="checkbox"
                      checked={selectedRows[(currentPage - 1) * rowsPerPage + rowIndex] || false}
                      onChange={() => handleCheckboxChange((currentPage - 1) * rowsPerPage + rowIndex)}
                    />
                  </td>
                  {columns.map((column, colIndex) => (
                    <td className="border border-gray-300 py-1 px-2" key={colIndex}>
                      {row[column]}
                    </td>
                  ))}
                  <td className="border border-gray-300 py-1 px-2">
                    <select
                      onChange={(e) => handleRoleChange(rowIndex, e.target.value)}
                      className="border rounded-md bg-white text-black focus:outline-none px-1 py-1 text-sm"
                    >
                      {roles.map((role, index) => (
                        <option key={index} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 py-1 px-2">
                    <button
                      onClick={() => console.log('Редактировать строку:', row)}
                      className="text-blue-500 hover:underline focus:outline-none text-sm"
                    >
                      Изменить
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2} className="py-2 text-center">
                  Нет данных для отображения
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center">
          <label className="mr-1 text-sm">Строк на странице:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded-md px-1 py-1 text-sm"
          >
            {[5, 10, 20].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
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

        <div className="flex space-x-1">
          <Button secondary onClick={() => console.log("Отмена изменения!")}>Отмена</Button>
          <Button onClick={() => console.log("Данные сохранены!")}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
