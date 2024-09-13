import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import historyService from "../../../services/history.service";
import Loader from "../../ui/Loader";
import { format } from "date-fns";

const HistoryTable = () => {
  const { user } = useAuth();
  const { data, refetch, isLoading } = useQuery(
    ["getHistoryByUserId"],
    () => historyService.getHistoryByUserId(user.decode.sub),
    { select: ({ data }) => data }
  );

  return (
      <div className="mt-4">
        {isLoading && <Loader />}
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
                    className="border border-gray-300 py-1 px-2 text-xs"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 py-1 px-2 text-xs">
                    {item.resultValue}
                  </td>
                  <td className="border border-gray-300 py-1 px-2 text-xs">
                    {item.value3}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-xs">
                    {item.value2}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-xs">
                    {item.value1}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-xs">
                    {item.uncertaintyBType}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-xs">
                    {item.uncertaintyTotal}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-xs">
                    {item.uncertaintyExpanded}
                  </td>
                  <td className="border border-gray-300 py-1 px-2 text-xs">
                    {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default HistoryTable;