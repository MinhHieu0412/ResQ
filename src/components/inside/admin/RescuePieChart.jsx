import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import {fetchRangeRescueData, fetchDailyRescueData} from "../../../services/admin.js";

const COLORS = ['#abc6fc', '#1744a5', '#6f99ed'];

const RescuePieChart = () => {
const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const [dailyData, setDailyData] = useState({ towing: 0, repairOnSite: 0, driverReplacement: 0 });
  const [weeklyData, setWeeklyData] = useState({ towing: 0, repairOnSite: 0, driverReplacement: 0 });
  const [monthlyData, setMonthlyData] = useState({ towing: 0, repairOnSite: 0, driverReplacement: 0 });
  const [prevMonthlyData, setPrevMonthlyData] = useState({ towing: 0, repairOnSite: 0, driverReplacement: 0 });

  const selected = dayjs(selectedDate);
  const prevWeekStart = selected.subtract(7, 'day').format('YYYY-MM-DD');
  const prevWeekEnd = selected.subtract(1, 'day').format('YYYY-MM-DD');

  const currentMonthStart = selected.startOf('month').format('YYYY-MM-DD');
  const currentMonthEnd = selected.endOf('month').format('YYYY-MM-DD');

  const prevMonthStart = selected.subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
  const prevMonthEnd = selected.subtract(1, 'month').endOf('month').format('YYYY-MM-DD');




useEffect(() => {
  const fetchData = async () => {
    const daily = await fetchDailyRescueData(selectedDate);
    const weekly = await fetchRangeRescueData(prevWeekStart, prevWeekEnd);
    const monthly = await fetchRangeRescueData(currentMonthStart, currentMonthEnd);
    const prevMonthly = await fetchRangeRescueData(prevMonthStart, prevMonthEnd);

    setDailyData(daily);
    setWeeklyData(weekly);
    setMonthlyData(monthly);
    setPrevMonthlyData(prevMonthly);
  };

  fetchData();
}, [selectedDate]);

  const pieData = [
    { name: 'Towing', value: dailyData.towing || 0 },
    { name: 'Repair on Site', value: dailyData.repairOnSite || 0 },
    { name: 'Driver Replacement', value: dailyData.driverReplacement || 0 },
  ];

  return (
    <div className="border rounded-lg p-6 mt-6 shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">Rescue Trip Proportions by Type</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Rescue Trip Analysis</h3>
        <table className="min-w-full border text-sm text-left">
          <thead>
            <tr>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">{dayjs(selectedDate).format('DD/MM')}</th>
              <th className="border px-3 py-2">Last Week</th>
              <th className="border px-3 py-2">This Month</th>
              <th className="border px-3 py-2">Previous Month</th>
            </tr>
          </thead>
          <tbody>
            {['towing', 'repairOnSite', 'driverReplacement'].map((key, idx) => (
              <tr key={key}>
                <td className="border px-3 py-2 font-medium">
                  {['Towing', 'Repair on Site', 'Driver Replacement'][idx]}
                </td>
                <td className="border px-3 py-2">{dailyData[key] || 0}</td>
                <td className="border px-3 py-2">{weeklyData[key] || 0}</td>
                <td className="border px-3 py-2">{monthlyData[key] || 0}</td>
                <td className="border px-3 py-2">{prevMonthlyData[key] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RescuePieChart;
