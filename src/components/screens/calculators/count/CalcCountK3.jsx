import React, { useState } from "react";
import { useCalculator } from "../useCalculator";
import Input from "../../../ui/Input/Input";
import Loader from "../../../ui/Loader";

const CalcCountK3 = () => {
  const { errors, handleSubmit, isLoading, onSubmit, register } = useCalculator();

	const p = 1.29

	const [absoluteError, setAbsoluteError] = useState(0);
  const [measurementResult, setMeasurementResult] = useState(0);
  const [uncertaintyBType, setUncertaintyBType] = useState(0);
  const [capacity, setCapacity] = useState(2);
  const [uncertaintyResult, setUncertaintyResult] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [unit, setUnit] = useState("мг/м³");

  const calculateValues = () => {
    // Вычисляем неопределенность по типу B
		const uncertaintyB = absoluteError / Math.sqrt(3);
    setUncertaintyBType(uncertaintyB);

    // Суммарная неопределенность
    const totalUncertainty = getUncertaintyTotal();
    
    // Расширенная неопределенность
    const expandedUncertainty = getUncertaintyExpanded(totalUncertainty);
    
    // Формирование результата
    const result = getUncertaintyResult(expandedUncertainty);
    
    setUncertaintyResult(result);
    setIsCalculated(true);
  };

  const getUncertaintyTotal = () => {
    return uncertaintyBType; // Здесь можно добавить дополнительные компоненты, если нужно
  };

  const getUncertaintyExpanded = (totalUncertainty) => {
    return totalUncertainty * 2; // Расширенная неопределенность
  };

  const getUncertaintyResult = (expandedUncertainty) => {
    return `(${measurementResult.toFixed(capacity)} ± ${expandedUncertainty.toFixed(capacity)}) ${unit}; k = 2; P = 0,95.`;
  };

  const saveValues = () => {
    const savedData = {
      absoluteError,
      measurementResult,
      uncertaintyBType,
      capacity,
      unit,
    };
    console.log("Данные сохранены:", savedData);
    alert("Данные успешно сохранены!");
  };

  return (
    <div className="">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Блок выбора единицы измерения */}
        <div className="px-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-6">
						Расчёт К3 Скорость расчетный метод с константой p
          </h3>
          <label className="block border-gray-900/10 font-medium">
            Единица измерения:
          </label>
          <select
            className="mt-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="мг/м³">Пыль (взвешенные вещества) мг/м³</option>
            <option value="мг/дм³">Пыль (взвешенные вещества) мг/дм³</option>
            <option value="л/мин">Скорость отбора л/мин</option>
          </select>
        </div>

        {/* Спецификация измерений */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold px-6">Спецификация измерений:</h2>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="flex items-center px-6">
              <label htmlFor="value2" className="text-sm text-gray-700 w-1/2">
                Результат измерений Рд:
              </label>
              <Input 
                error={errors?.resultValue?.message}
                name="value2"
                type="number"
                step="any"
                register={register}
                className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                value={measurementResult}
                onChange={(e) => setMeasurementResult(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex items-center px-6">
              <label htmlFor="value2" className="text-sm text-gray-700 w-1/2">
                Результат измерений v:
              </label>
              <Input 
                error={errors?.resultValue?.message}
                name="value2"
                type="number"
                step="any"
                register={register}
                className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                value={measurementResult}
                onChange={(e) => setMeasurementResult(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex items-center px-6">
              <label htmlFor="value3" className="text-sm text-gray-700 w-1/2">
                Абсолютная погрешность [% Δ]:
              </label>
              <Input 
                error={errors?.resultValue?.message}
                name="value3"
                type="number"
                step="any"
                register={register}
                className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                value={absoluteError}
                onChange={(e) => setAbsoluteError(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex items-center px-6">
              <label htmlFor="value1" className="text-sm text-gray-700 w-1/2">
                Разрядность:
              </label>
              <Input 
                error={errors?.resultValue?.message}
                name="value1"
                type="number"
                step="1"
                register={register}
                className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="flex justify-end mb-4 mr-5">
            <button
              type="button"
              className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 text-white hover:bg-sky-600"
              onClick={calculateValues}
            >
              Рассчитать
            </button>
          </div>
        </div>

        {isCalculated && (
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold px-6">Расчёты:</h2>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="flex items-center px-6">
                <label className="text-sm text-gray-900 w-1/2">Неопределённость по типу В:</label>
                <Input
                  error={errors?.resultValue?.message}
                  name="uncertaintyBType"
                  type="text"
                  register={register}
                  className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                  value={uncertaintyBType.toFixed(capacity)}
                  readOnly
                />
              </div>
              <div className="flex items-center px-6">
                <label className="text-sm text-gray-900 w-1/2">Суммарная неопределённость:</label>
                <Input
                  error={errors?.resultValue?.message}
                  name="uncertaintyTotal"
                  type="text"
                  register={register}
                  className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                  value={getUncertaintyTotal().toFixed(capacity)}
                  readOnly
                />
              </div>
              <div className="flex items-center px-6">
                <label className="text-sm text-gray-900 w-1/2">Расширенная неопределённость:</label>
                <Input
                  error={errors?.resultValue?.message}
                  name="uncertaintyExpanded"
                  type="text"
                  register={register}
                  className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                  value={getUncertaintyExpanded(getUncertaintyTotal()).toFixed(capacity)}
                  readOnly
                />
              </div>
              <div className="flex items-center px-6">
                <label className="text-sm text-gray-900 w-1/2">Результат неопределённости:</label>
                <Input
                  error={errors?.resultValue?.message}
                  name="resultValue"
                  register={register}
                  type="text"
                  className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                  value={uncertaintyResult}
                  readOnly
                />
              </div>
            </div>
            <div className="flex justify-end mt-5 mb-4 mr-5">
              <button
                type="button"
                className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 text-white hover:bg-sky-600"
              >
                Сохранить
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CalcCountK3;
