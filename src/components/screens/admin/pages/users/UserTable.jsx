import { useState, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Modal, Switch, Button, Group } from "@mantine/core"; 
import Loader from "../../../../ui/Loader";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineNotInterested } from "react-icons/md";
import Input from "../../components/Input"; // Custom Input component

const UserTable = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null); // User currently being edited
  const [modalOpened, setModalOpened] = useState(false); // State for edit modal
  const [registerModalOpened, setRegisterModalOpened] = useState(false); // State for registration modal
  const [editedUser, setEditedUser] = useState({}); // State to hold edited user data
  const [newUser, setNewUser] = useState({ name: '', surname: '', patronymic: '', email: '', login: '', isAdmin: false, isConfirmed: false }); // New user data

  // Define columns for the table
  const columns = useMemo(() => [
    { accessorKey: "surname", header: "Фамилия" },
    { accessorKey: "name", header: "Имя" },
    { accessorKey: "patronymic", header: "Отчество" },
    { accessorKey: "email", header: "Почта" },
    { accessorKey: "login", header: "Логин" },
    {
      accessorKey: "isAdmin",
      header: "Админ",
      Cell: ({ cell }) => (
        <span className="flex justify-center">
          {cell.getValue() ? <GiConfirmed className="text-green-500" /> : <MdOutlineNotInterested className="text-red-500" />}
        </span>
      ),
    },
    {
      accessorKey: "isConfirmed",
      header: "Подтвержден",
      Cell: ({ cell }) => (
        <span className="flex justify-center">
          {cell.getValue() ? <GiConfirmed className="text-green-500" /> : <MdOutlineNotInterested className="text-red-500" />}
        </span>
      ),
    },
    {
      header: "Действие",
      Cell: ({ row }) => (
        <div className="flex justify-center">
          <button className="text-blue-500 hover:underline" onClick={() => openModal(row.original)}> Изменить </button> 
        </div>
      ),
    },
  ], []);

  const table = useMantineReactTable({ columns, data: users || [] });

  // Open the edit modal
  const openModal = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setModalOpened(true);
  };

  // Open the registration modal
  const openRegisterModal = () => {
    setNewUser({ name: '', surname: '', patronymic: '', email: '', login: '', isAdmin: false, isConfirmed: false });
    setRegisterModalOpened(true);
  };

  // Handle changes to the edit form fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes to the new user registration fields
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle saving the edited user
  const handleSave = () => {
    console.log(editedUser);
    setModalOpened(false);
  };

  // Handle registering a new user
  const handleRegister = () => {
    console.log('Новый пользователь:', newUser);
    setRegisterModalOpened(false);
  };

  return (
    <>
      {!users ? (
        <Loader />
      ) : (
        <>
          <MantineReactTable table={table} className="rounded-lg shadow-lg overflow-hidden" />
          
          <Button 
            onClick={openRegisterModal} 
            className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold w-auto bg-sky-500 text-white hover:bg-sky-600 mb-4 mt-4" // Button moved below the table
          >
            Создать нового пользователя
          </Button>
        </>
      )}

      {/* Edit User Modal */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={<h2 className="text-base font-semibold leading-7 text-gray-900">Редактирование пользователя</h2>}
        overlayOpacity={0.55}
        overlayBlur={3}
        className="p-5 bg-white rounded-lg shadow-lg"
        size="lg"
      >
        <p className="text-sm text-gray-600 mb-4">Здесь вы можете изменить данные пользователя</p>
        
        {selectedUser && (
          <div className="space-y-4">
            {["name", "surname", "patronymic", "email", "login"].map((field) => (
              <div key={field}>
                <label className="text-sm text-gray-700">{field === "name" ? "Имя" : field === "surname" ? "Фамилия" : field === "patronymic" ? "Отчество" : field === "email" ? "Email" : "Логин"}</label>
                <Input
                  label={field === "name" ? "Имя" : field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={editedUser[field]}
                  onChange={handleEditChange}
                  className="border border-gray-900/10 rounded px-2 py-1 w-full"
                />
              </div>
            ))}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Статус пользователя</label>
              <Switch
                size="lg"
                checked={editedUser.isConfirmed}
                onChange={(event) => setEditedUser((prev) => ({
                  ...prev,
                  isConfirmed: event.currentTarget.checked,
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Администратор</label>
              <Switch
                size="lg"
                checked={editedUser.isAdmin}
                onChange={(event) => setEditedUser((prev) => ({
                  ...prev,
                  isAdmin: event.currentTarget.checked,
                }))}
              />
            </div>

            <Group position="right">
              <Button onClick={handleSave} color="blue">Сохранить изменения</Button>
            </Group>
          </div>
        )}
      </Modal>

      {/* Registration Modal */}
      <Modal
        opened={registerModalOpened}
        onClose={() => setRegisterModalOpened(false)}
        title={<h2 className="text-base font-semibold leading-7 text-gray-900">Добавление нового пользователя</h2>}
        overlayOpacity={0.55}
        overlayBlur={3}
        className="p-5 bg-white rounded-lg shadow-lg"
        size="lg"
      >
        <p className="text-sm text-gray-600 mb-4">Введите данные нового пользователя</p>
        
        <div className="space-y-4">
          {["name", "surname", "patronymic", "email", "login"].map((field) => (
            <div key={field}>
              <label className="text-sm text-gray-700">{field === "name" ? "Имя" : field}</label>
              <Input
                label={field === "name" ? "Имя" : field}
                name={field}
                type={field === "email" ? "email" : "text"}
                value={newUser[field]}
                onChange={handleRegisterChange}
                className="border border-gray-900/10 rounded px-2 py-1 w-full"
              />
            </div>
          ))}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Администратор</label>
            <Switch
              size="lg"
              checked={newUser.isAdmin}
              onChange={(event) => setNewUser((prev) => ({
                ...prev,
                isAdmin: event.currentTarget.checked,
              }))}
            />
          </div>

          <Group position="right">
            <Button onClick={handleRegister}>Зарегистрировать</Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default UserTable;
