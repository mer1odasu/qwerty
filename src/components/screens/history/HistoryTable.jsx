import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import historyService from "../../../services/history.service";
import { format } from "date-fns";
import { MantineReactTable } from 'mantine-react-table'; // Ensure this import is correct
import { useMantineReactTable } from 'mantine-react-table'; // Assuming this is the correct hook for Mantine

const HistoryTable = () => {
  const { user } = useAuth();
  
  const { data: currentData = []} = useQuery(
    ["getHistoryByUserId", user.decode.sub],
    () => historyService.getHistoryByUserId(user.decode.sub),
    { select: ({ data }) => data }
  );

  const columns = useMemo(() => [
    { accessorKey: "resultValue", header: "Результат" },
    { accessorKey: "value3", header: "Абсолютная погрешность [Δ]" },
    { accessorKey: "value2", header: "Результат измерений X" },
    { accessorKey: "value1", header: "Разрядность" },
    { accessorKey: "uncertaintyBType", header: "Неопределённость по типу В" },
    { accessorKey: "uncertaintyTotal", header: "Суммарная неопределённость" },
    { accessorKey: "uncertaintyExpanded", header: "Расширенная неопределённость" },
    {
      accessorKey: "createdAt",
      header: "Дата",
      Cell: ({ cell }) => format(new Date(cell.getValue()), "dd/MM/yyyy HH:mm"),
    },
  ], []);

  const table = useMantineReactTable({
    columns,
    data: currentData,
  });

  return <MantineReactTable table={table} />;
};

export default HistoryTable;
