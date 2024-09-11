import React from 'react';
import HistoryTable from '../HistoryTable';

// Страница для отображения истории измерений
const HistoryData = () => {
  const data = [
    { id: 1, date: '2024-09-01', metric: 'Показатель 1', unit: 'кг', result: 10.5, absoluteError: 0.1, representation: '10.5 кг' },
    { id: 2, date: '2024-09-02', metric: 'Показатель 2', unit: 'м', result: 5.0, absoluteError: 0.05, representation: '5.0 м' },
    { id: 3, date: '2024-09-03', metric: 'Показатель 3', unit: 'л', result: 3.2, absoluteError: 0.02, representation: '3.2 л' },
    { id: 4, date: '2024-09-04', metric: 'Показатель 4', unit: 'м³', result: 1.5, absoluteError: 0.01, representation: '1.5 м³' },
    { id: 5, date: '2024-09-05', metric: 'Показатель 5', unit: 'г', result: 200, absoluteError: 5, representation: '200 г' },
    { id: 6, date: '2024-09-06', metric: 'Показатель 6', unit: 'кг', result: 12.3, absoluteError: 0.08, representation: '12.3 кг' },
    { id: 7, date: '2024-09-07', metric: 'Показатель 7', unit: 'м', result: 4.7, absoluteError: 0.03, representation: '4.7 м' },
    { id: 8, date: '2024-09-08', metric: 'Показатель 8', unit: 'л', result: 2.9, absoluteError: 0.04, representation: '2.9 л' },
    { id: 9, date: '2024-09-09', metric: 'Показатель 9', unit: 'м³', result: 1.8, absoluteError: 0.02, representation: '1.8 м³' },
    { id: 10, date: '2024-09-10', metric: 'Показатель 10', unit: 'г', result: 250, absoluteError: 10, representation: '250 г' },
    { id: 11, date: '2024-09-11', metric: 'Показатель 11', unit: 'кг', result: 15.0, absoluteError: 0.12, representation: '15.0 кг' },
    { id: 12, date: '2024-09-12', metric: 'Показатель 12', unit: 'м', result: 6.1, absoluteError: 0.07, representation: '6.1 м' },
    { id: 13, date: '2024-09-13', metric: 'Показатель 13', unit: 'л', result: 4.5, absoluteError: 0.05, representation: '4.5 л' },
    { id: 14, date: '2024-09-14', metric: 'Показатель 14', unit: 'м³', result: 2.0, absoluteError: 0.01, representation: '2.0 м³' },
    { id: 15, date: '2024-09-15', metric: 'Показатель 15', unit: 'г', result: 175, absoluteError: 3, representation: '175 г' },
    { id: 16, date: '2024-09-16', metric: 'Показатель 16', unit: 'кг', result: 9.8, absoluteError: 0.06, representation: '9.8 кг' },
    { id: 17, date: '2024-09-17', metric: 'Показатель 17', unit: 'м', result: 3.4, absoluteError: 0.02, representation: '3.4 м' },
    { id: 18, date: '2024-09-18', metric: 'Показатель 18', unit: 'л', result: 7.0, absoluteError: 0.1, representation: '7.0 л' },
    { id: 19, date: '2024-09-19', metric: 'Показатель 19', unit: 'м³', result: 0.9, absoluteError: 0.02, representation: '0.9 м³' },
    { id: 20, date: '2024-09-20', metric: 'Показатель 20', unit: 'г', result: 300, absoluteError: 9, representation: '300 г' },
    { id: 21, date: '2024-09-21', metric: 'Показатель 21', unit: 'кг', result: 11.2, absoluteError: 0.09, representation: '11.2 кг' },
    { id: 22, date: '2024-09-22', metric: 'Показатель 22', unit: 'м', result: 5.8, absoluteError: 0.04, representation: '5.8 м' },
    { id: 23, date: '2024-09-23', metric: 'Показатель 23', unit: 'л', result: 3.6, absoluteError: 0.03, representation: '3.6 л' },
    { id: 24, date: '2024-09-24', metric: 'Показатель 24', unit: 'м³', result: 1.2, absoluteError: 0.01, representation: '1.2 м³' },
    { id: 25, date: '2024-09-25', metric: 'Показатель 25', unit: 'г', result: 220, absoluteError: 6, representation: '220 г' },
  ];

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-2xl font-bold mb-4">История измерений</h1>
      <HistoryTable data={data} />
    </div>
  );
};

export default HistoryData;
