import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import Loader from "../../../../ui/Loader";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineNotInterested } from "react-icons/md";

const UserTable = ({ users }) => {
  if (!users) {
    return <Loader />;
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "First Name",
      },
      {
        accessorKey: "surname",
        header: "Last Name",
      },
      {
        accessorKey: "patronymic",
        header: "Patronymic",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "login",
        header: "Login",
      },
      {
        accessorKey: "isAdmin",
        header: "Admin",
        Cell: ({ cell }) => (
          <span>
            {cell.getValue() ? <GiConfirmed /> : <MdOutlineNotInterested />}
          </span>
        ),
      },
      {
        accessorKey: "isConfirmed",
        header: "Confirmed",
        Cell: ({ cell }) => (
          <span>
            {cell.getValue() ? <GiConfirmed /> : <MdOutlineNotInterested />}
          </span>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: users,
  });

  return <MantineReactTable table={table} />;
};

export default UserTable;
