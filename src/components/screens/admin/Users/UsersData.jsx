import React from 'react';
import UsersTable from './UsersTable';

const UsersData = () => {
  const roles = ["Администратор", "Менеджер", "Пользователь"];
  const columns = ['id', 'name', 'surname', 'patronymic', 'login', 'email', 'role'];
  
  const data = [
    { id: 1, name: 'Olivia', surname: 'Brown', patronymic: 'Taylor', login: 'olivia.b', email: 'olivia.brown@gmail.com', role: roles[0] },
    { id: 2, name: 'James', surname: 'Miller', patronymic: 'Scott', login: 'james.m', email: 'james.miller@gmail.com', role: roles[1] },
    { id: 3, name: 'Sophia', surname: 'Wilson', patronymic: 'Clark', login: 'sophia.w', email: 'sophia.wilson@gmail.com', role: roles[2] },
    { id: 4, name: 'Liam', surname: 'Moore', patronymic: 'Harris', login: 'liam.m', email: 'liam.moore@gmail.com', role: roles[0] },
    { id: 5, name: 'Emma', surname: 'Anderson', patronymic: 'Young', login: 'emma.a', email: 'emma.anderson@gmail.com', role: roles[1] },
    { id: 6, name: 'William', surname: 'Johnson', patronymic: 'Nelson', login: 'william.j', email: 'william.johnson@gmail.com', role: roles[2] },
    { id: 7, name: 'Ava', surname: 'Smith', patronymic: 'King', login: 'ava.s', email: 'ava.smith@gmail.com', role: roles[0] },
    { id: 8, name: 'Lucas', surname: 'Lee', patronymic: 'Walker', login: 'lucas.l', email: 'lucas.lee@gmail.com', role: roles[1] },
    { id: 9, name: 'Mia', surname: 'Garcia', patronymic: 'Hall', login: 'mia.g', email: 'mia.garcia@gmail.com', role: roles[2] },
    { id: 10, name: 'Noah', surname: 'Martinez', patronymic: 'Lopez', login: 'noah.m', email: 'noah.martinez@gmail.com', role: roles[1] },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Список пользователей</h1>
      <UsersTable columns={columns} data={data} roles={roles} />
    </div>
  );
};

export default UsersData;
