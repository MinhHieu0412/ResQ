import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { getRevenueBChart } from "../../../services/admin.js"; // Đường dẫn đúng

dayjs.extend(isoWeek);

// Custom shape cho bar
const CustomBar = ({ x, y, width, height, fill }) => {
  const newWidth = width * 0.3;
  return (
    <rect
      x={x + (width - newWidth) / 2}
      y={y}
      width={newWidth}
      height={height}
      rx={1}
      ry={1}
      fill={fill}
    />
  );
};

// Custom legend
const CustomLegend = ({ payload }) => (
  <div
    style={{
      display: "flex",
      gap: "20px",
      fontWeight: "500",
      fontFamily: "Roboto",
      justifyContent: "center",
      marginBottom: "2rem",
      fontSize: "0.9rem",
    }}
  >
    {payload.map((entry, index) => (
      <div key={`item-${index}`} style={{ color: entry.color }}>
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            backgroundColor: entry.color,
            marginRight: 10,
            borderRadius: 6,
          }}
        ></span>
        {entry.value}
      </div>
    ))}
  </div>
);

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: 14,
          color: "#333",
        }}
      >
        <p><strong>{label}</strong></p>
        {payload.map((item) => (
          <p key={item.name} style={{ color: item.fill, margin: 0 }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RequestRevenue = () => {
  const [filterType, setFilterType] = useState("month");
  const [filterValue, setFilterValue] = useState(dayjs().format("YYYY-MM"));
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        let start = null;
        let end = null;

        if (filterType === "month") {
          const [year, month] = filterValue.split("-");
          start = dayjs(`${year}-${month}-01`).startOf("month").format("YYYY-MM-DD");
          end = dayjs(`${year}-${month}-01`).endOf("month").format("YYYY-MM-DD");
        } else if (filterType === "week") {
          const [year, week] = filterValue.split("-W");
          const startDate = dayjs().year(year).isoWeek(parseInt(week)).startOf("week");
          const endDate = startDate.endOf("week");
          start = startDate.format("YYYY-MM-DD");
          end = endDate.format("YYYY-MM-DD");
        } else if (filterType === "year") {
          start = `${filterValue}-01-01`;
          end = `${filterValue}-12-31`;
        }

        const raw = await getRevenueBChart(start, end);
        const mapped = raw.map(item => ({
          date: item.date,
          tow: item.resTow,
          fix: item.resFix,
          drive: item.resDrive,
        }));

        setChartData(mapped);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ:", error);
      }
    };

    fetchChartData();
  }, [filterType, filterValue]);

  const handleFilterTypeChange = (e) => {
    const type = e.target.value;
    setFilterType(type);

    if (type === "week") {
      setFilterValue(dayjs().format("YYYY-[W]WW"));
    } else if (type === "month") {
      setFilterValue(dayjs().format("YYYY-MM"));
    } else {
      setFilterValue(dayjs().format("YYYY"));
    }
  };

  return (
    <div className="border-gray-100 border-2 my-4 px-8 pb-5 rounded-md">
      <div className="flex justify-between items-center mt-8">
        <h2 className="TitleDashboard">Rescue Request Statistics</h2>
        <div className="flex gap-4 mb-4 justify-end">
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>

          {filterType === "month" && (
            <input
              type="month"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}
          {filterType === "week" && (
            <input
              type="week"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}
          {filterType === "year" && (
            <input
              type="number"
              min="2000"
              max="2100"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}
        </div>
      </div>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            barCategoryGap="10%"
            barGap={-30}
            onMouseLeave={() => {}}
          >
            <CartesianGrid stroke="#dedede" strokeDasharray="0" vertical={false} strokeWidth={0.5} />
            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) => dayjs(dateStr).format("D MMM")}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} verticalAlign="top" layout="horizontal" />
            <Bar dataKey="tow" name="Towing" fill="#abc6fc" shape={<CustomBar />} />
            <Bar dataKey="fix" name="On-site Repair" fill="#1744a5" shape={<CustomBar />} />
            <Bar dataKey="drive" name="Driver Replacement" fill="#6f99ed" shape={<CustomBar />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RequestRevenue;
