import { getMonthlyUsers } from "features/Users/usersSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  { name: "Jan", value: 10 },
  { name: "Feb", value: 20 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 30 },
  { name: "May", value: 30 },
  { name: "Jun", value: 7 },
  { name: "Jul", value: 30 },
  { name: "Aug", value: 15 },
  { name: "Sept", value: 60 },
  { name: "Oct", value: 40 },
  { name: "Nov", value: 20 },
  { name: "Dec", value: 10 },
];

function MonthlyUser() {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);
  let monthlyUsers = usersState?.monthlyUser;

  useEffect(() => {
    dispatch(getMonthlyUsers());
  }, []);

  const monthU = [];
  if (monthlyUsers) {
    Object.keys(monthlyUsers).forEach((key) => {
      const value = monthlyUsers[key];
      monthU.push({ name: key, value: value });
    });
  }

  console.log(monthU);

  return (
    <BarChart width={730} height={320} data={monthU}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}

export default MonthlyUser;
