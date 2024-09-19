import React, { useState } from "react";
import { useCalculator } from "../useCalculator";
import Input from "../../../ui/Input/Input";
import Loader from "../../../ui/Loader";

const CalcCountK1 = () => {
  const { errors, handleSubmit, isLoading, onSubmit, register } =
    useCalculator(1);

  const [absoluteError, setAbsoluteError] = useState(0);
  const [measurementResult, setMeasurementResult] = useState(0);
  const [uncertaintyBType, setUncertaintyBType] = useState(0);
  const [uncertaintyTotal, setUncertaintyTotal] = useState(0);
  const [uncertaintyExpanded, setUncertaintyExpanded] = useState(0);
  const [capacity, setCapacity] = useState(2);
  const [uncertaintyResult, setUncertaintyResult] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [unit, setUnit] = useState("мг/м³");
  const [errorMessage, setErrorMessage] = useState("");

  const calculateValues = () => {
    if (isNaN(measurementResult) || isNaN(absoluteError)) {
      setErrorMessage(
        "Результат измерений или абсолютная погрешность не являются допустимыми числами."
      );
      return;
    }

    if (measurementResult > 1e10 || absoluteError > 1e10) {
      setErrorMessage(
        "Результат измерений или абсолютная погрешность слишком большие."
      );
      return;
    }

    if (measurementResult <= 0 || absoluteError <= 0) {
      setErrorMessage("Значения должны быть больше нуля.");
      return;
    }

    const uncertaintyB = absoluteError / Math.sqrt(3);
    setUncertaintyBType(uncertaintyB);
    const totalUncertainty = uncertaintyB;
    setUncertaintyTotal(totalUncertainty);

    const expandedUncertainty = totalUncertainty * 2;
    setUncertaintyExpanded(expandedUncertainty);

    const result = `(${measurementResult.toFixed(
      capacity + 2
    )} ± ${expandedUncertainty.toFixed(capacity)}) ${unit}; k = 2; P = 0,95.`;

    setUncertaintyResult(result);
    setIsCalculated(true);
  };

  return (
    <div className="">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="px-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-6">
            Расчёт К1 Прямое измерение, абсолютная погрешность
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

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold px-6">
            Спецификация измерений:
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="flex items-center px-6">
              <label htmlFor="value2" className="text-sm text-gray-700 w-1/2">
                Результат измерений X:
              </label>
              <Input
                error={errors?.resultValue?.message}
                name="value2"
                type="number"
                step="any"
                register={register}
                className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                value={measurementResult}
                onChange={(e) =>
                  setMeasurementResult(parseFloat(e.target.value))
                }
              />
            </div>
            <div className="flex items-center px-6">
              <label htmlFor="value3" className="text-sm text-gray-700 w-1/2">
                Абсолютная погрешность [Δ]±:
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
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
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
                <label className="text-sm text-gray-900 w-1/2">
                  Неопределённость по типу В(Ub∆):
                </label>
                <Input
                  error={errors?.resultValue?.message}
                  name="uncertaintyBType"
                  type="text"
                  register={register}
                  className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                  value={uncertaintyBType.toFixed(capacity + 2)}
                  readOnly
                />
              </div>
              <div className="flex items-center px-6">
                <label className="text-sm text-gray-900 w-1/2">
                  Суммарная неопределённость(Uc):
                </label>
                <Input
                  error={errors?.resultValue?.message}
                  name="uncertaintyTotal"
                  type="text"
                  register={register}
                  className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                  value={uncertaintyTotal.toFixed(capacity + 2)}
                  readOnly
                />
              </div>
              <div className="flex items-center px-6">
                <label className="text-sm text-gray-900 w-1/2">
                  Расширенная неопределённость(U):
                </label>
                <Input
                  error={errors?.resultValue?.message}
                  name="uncertaintyExpanded"
                  type="text"
                  register={register}
                  className="border border-gray-900/10 rounded px-2 py-1 w-1/2"
                  value={uncertaintyExpanded.toFixed(capacity + 2)}
                  readOnly
                />
              </div>
              <div className="flex items-center px-6">
                <label className="text-sm text-gray-900 w-1/2">
                  Результат неопределённости:
                </label>
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
              <button className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 text-white hover:bg-sky-600">
                Сохранить
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CalcCountK1;
