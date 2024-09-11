
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from '../../../ui/Button/Button';
// import HistoryPage from "@/app/history/historypage/Components/HistoryPage";

const CalcCount = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [uBDelta, setUBDelta] = useState("");
  const [uC, setUC] = useState("");
  const [U, setU] = useState("");
  const [resultX, setResultX] = useState("");

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      measurement1: "",
      absoluteError: "",
      significantDigits: "",
    },
  });

  const measurement1 = watch("measurement1");
  const absoluteError = watch("absoluteError");

  const k = 2; 
  const P = 0.95;

  const calculate = () => {
    const absError = parseFloat(absoluteError);
    const measurementX = parseFloat(measurement1);

    if (!isNaN(absError) && !isNaN(measurementX)) {
      const calculatedUBDelta = (absError / Math.sqrt(3)).toFixed(2);
      setUBDelta(calculatedUBDelta);
      setValue('calculation1', calculatedUBDelta);

      const calculatedUC = Math.sqrt(Math.pow(parseFloat(calculatedUBDelta), 2)).toFixed(2);
      setUC(calculatedUC);
      setValue('calculation2', calculatedUC);

      const calculatedU = (k * parseFloat(calculatedUC)).toFixed(2);
      setU(calculatedU);
      setValue('calculation3', calculatedU);

      const formattedResult = `(${measurementX.toFixed(2)} ± ${calculatedU}) ; k = ${k}; P = ${P.toFixed(2)}.`;
      setResultX(formattedResult);
      setValue('calculation4', formattedResult);
    } else {
      setUBDelta("");
      setUC("");
      setU("");
      setValue('calculation1', "");
      setValue('calculation2', "");
      setValue('calculation3', "");
      setResultX("");
      setValue('calculation4', "");
    }
  };

  useEffect(() => {
    calculate();
  }, [measurement1, absoluteError]);

  const options = [
    { value: "option1", label: "Опция 1" },
    { value: "option2", label: "Опция 2" },
    { value: "option3", label: "Опция 3" },
  ];

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Сохраненные данные:", data);
    setIsLoading(false);
  };

  return (
    <div className="mt-5">
      <form onSubmit={onSubmit} className="space-y-12">
        <div className="px-6">
          <label htmlFor="selectOption" className="text-md border-gray-900/10 font-semibold">
            Определяемый показатель
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Поиск..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-2 py-1 w-full mb-2"
              list="optionsList"
            />
            <datalist id="optionsList">
              {filteredOptions.map(option => (
                <option key={option.value} value={option.label} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold px-6">Спецификация измерений:</h2>
          <div className="mt-6 grid grid-cols-2 gap-6">
            {["Результат измерений X", "Единица измерений", "Абсолютная погрешность [Δ]: ±", "Разрядность"].map((label, index) => (
              <div key={index} className="flex items-center px-6">
                <label htmlFor={`measurement${index + 1}`} className="text-sm text-gray-700 w-1/2">{label}:</label>
                <input
                  id={`measurement${index + 1}`}
                  type="text"
                  {...register(index === 0 ? `measurement1` : index === 2 ? `absoluteError` : index === 3 ? `significantDigits` : `measurement${index + 1}`, { required: "Это поле обязательно." })}
                  className="border rounded px-2 py-1 w-1/2"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold px-6">Расчёты:</h2>
          <div className="mt-6 grid grid-cols-2 gap-6">
            {["Расчёт стандартных неопределённостей (Ub∆=)", "Расчёт суммарной неопределённости (Uc)", "Вычисление расширенной неопределённости (U)", "Представление результатов оценивания неопределённости (X)"].map((label, index) => (
              <div key={index} className="flex items-center px-6">
                <label htmlFor={`calculation${index + 1}`} className="text-sm text-gray-900 w-1/2">{label}:</label>
                <input
                  id={`calculation${index + 1}`}
                  type="text"
                  {...register(`calculation${index + 1}`, { required: "Это поле обязательно." })}
                  className="border rounded px-2 py-1 w-1/2"
                  value={index === 0 ? uBDelta : index === 1 ? uC : index === 2 ? U : resultX}
                  readOnly
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 px-6">
            <Button disabled={isLoading} secondary onClick={onClose}>
              Отмена
            </Button>
            <Button disabled={isLoading} type="submit">
              Сохранить
            </Button>
          </div>
        </div>
      </form>
      {/* <HistoryPage /> */}
    </div>
  );
};

export default CalcCount;
