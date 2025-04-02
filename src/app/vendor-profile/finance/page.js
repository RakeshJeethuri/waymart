
"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const sampleData = {
  today: {
    totalSales: 800,
    totalOrders: 20,
    averageOrderValue: 40,
    totalReceived: 700,
    pendingPayouts: 100,
    payoutHistory: [
      { date: "2025-03-22", amount: 500 },
      { date: "2025-03-21", amount: 200 },
    ],
    platformFee: 50,
    refunds: 1,
    refundAmount: 50,
  },
  monthly: {
    totalSales: 15000,
    totalOrders: 350,
    averageOrderValue: 42,
    totalReceived: 14000,
    pendingPayouts: 1000,
    payoutHistory: [
      { date: "2025-03-20", amount: 1500 },
      { date: "2025-03-19", amount: 1700 },
      { date: "2025-03-18", amount: 1300 },
    ],
    platformFee: 800,
    refunds: 5,
    refundAmount: 200,
  },
  custom: {
    totalSales: 5000,
    totalOrders: 120,
    averageOrderValue: 42,
    totalReceived: 4500,
    pendingPayouts: 500,
    payoutHistory: [
      { date: "2025-03-15", amount: 800 },
      { date: "2025-03-14", amount: 900 },
    ],
    platformFee: 300,
    refunds: 2,
    refundAmount: 100,
  },
};

const COLORS = ["#FD0054", "#A80038", "#2B2024"];

const FinanceDashboard = () => {
  const [filter, setFilter] = useState("monthly");
  const [financeData, setFinanceData] = useState(sampleData[filter]);
  const [chartWidth, setChartWidth] = useState(500);

  useEffect(() => {
    setFinanceData(sampleData[filter]);

    // Handle responsive charts
    const handleResize = () => {
      setChartWidth(window.innerWidth > 768 ? 500 : 300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filter]);

  return (
    <div className="p-6 mx-auto  space-y-6 bg-[#FBF9FA] text-[#2B2024]">
      <h1 className="text-3xl font-bold text-[#A80038]">📊 Finance Dashboard</h1>

      {/* Select Filter */}
      <div className="flex justify-between items-center">
      <Select.Root value={filter} onValueChange={setFilter}>
          <Select.Trigger className="w-40 bg-[#FD0054] text-white flex justify-between items-center p-2 rounded-md">
            <Select.Value>{filter.charAt(0).toUpperCase() + filter.slice(1)}</Select.Value>
            <ChevronDown size={16} className="text-white" />
          </Select.Trigger>
          <Select.Content className="bg-[#A80038] text-white rounded-md shadow-md  w-40 z-50">
            <Select.Viewport>
              <Select.Item value="today" className="p-2 cursor-pointer hover:bg-[#FD0054]">
                Today
              </Select.Item>
              <Select.Item value="monthly" className="p-2 cursor-pointer hover:bg-[#FD0054]">
                This Month
              </Select.Item>
              <Select.Item value="custom" className="p-2 cursor-pointer hover:bg-[#FD0054]">
                By Date
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { title: "Total Sales", value: `$${financeData.totalSales}` },
          { title: "Total Orders", value: financeData.totalOrders },
          { title: "Average Sale", value: `$${financeData.averageOrderValue}` },
          { title: "Pending Amount", value: `$${financeData.pendingPayouts}` },
          { title: "Received Amount", value: `$${financeData.totalReceived}` },
        ].map((item, index) => (
          <Card key={index} className="bg-white border-[#FD0054]">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#A80038]">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Trend Chart */}
      <h3 className="text-xl font-bold text-[#A80038]">📈 Sales Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={financeData.payoutHistory}>
          <XAxis dataKey="date" stroke="#2B2024" />
          <YAxis stroke="#2B2024" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#FD0054" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Payout History Bar Chart */}
      <h3 className="text-xl font-bold text-[#A80038]">💰 Payout History</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={financeData.payoutHistory}>
          <XAxis dataKey="date" stroke="#2B2024" />
          <YAxis stroke="#2B2024" />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#A80038" />
        </BarChart>
      </ResponsiveContainer>

      {/* Expense Breakdown Pie Chart */}
      <h3 className="text-xl font-bold text-[#A80038]">💵 Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={[
              { name: "Platform Fee", value: financeData.platformFee },
              { name: "Refunds", value: financeData.refundAmount },
              { name: "Pending Payouts", value: financeData.pendingPayouts },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {COLORS.map((color, index) => (
              <Cell key={index} fill={color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Download Report Button */}
      <Button onClick={() => alert("Downloading report...")} className="w-full bg-[#FD0054] text-white hover:bg-[#A80038]">
        Download Report
      </Button>
    </div>
  );
};

export default FinanceDashboard;
