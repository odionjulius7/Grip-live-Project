import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Mon", value: 10 },
  { name: "Tues", value: 20 },
  { name: "Wed", value: 30 },
  { name: "Thur", value: 30 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 7 },
  { name: "Sun", value: 30 },
];

function DailyUsers() {
  return (
    <BarChart width={350} height={320} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}

export default DailyUsers;
