"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  PieSectorShapeProps,
  Sector,
} from "recharts";
// Static

const Charts = () => {
  const [barGraph, setBarGraph] = useState([
    {
      name: "Jan",
      Essential: 32000,
      Investment: 12000,
      Enjoyment: 8000,
    },
    {
      name: "Feb",
      Essential: 31500,
      Investment: 12000,
      Enjoyment: 6500,
    },
    {
      name: "Mar",
      Essential: 33000,
      Investment: 15000,
      Enjoyment: 9000,
    },
    {
      name: "Apr",
      Essential: 32500,
      Investment: 12000,
      Enjoyment: 7000,
    },
    {
      name: "May",
      Essential: 34000,
      Investment: 12000,
      Enjoyment: 8500,
    },
    {
      name: "Jun",
      Essential: 33000,
      Investment: 12000,
      Enjoyment: 7500,
    },
  ]);
  const [pieChart, setPieChart] = useState([
    { name: "Housing", value: 900,color:"#89a" },
    { name: "Food", value: 450, color:"#3d0" },
    { name: "Transport", value: 300, color:"#4a5" },
    { name: "Entertainment", value: 250,color:"#570" },
    { name: "Utilities", value: 200, color:"#64b" },
    { name: "Other", value: 350, colo:"#7c6" },
  ]);

  return (
    <section className="flex gap-4 flex-col md:flex-row">
      <div className="shadow-lg rounded-xl p-6 w-1/2 border border-black/10 flex flex-col justify-between">
        <div className="flex flex-col mb-4">
          <h2 className="text-lg font-bold">Cash Flow</h2>
          <p className="text-sm font-medium text-gray-500">
            Essential vs Investment vs Enjoyment over time
          </p>
        </div>
        <BarChart
          data={barGraph}
          barCategoryGap="5%"
          style={{
            width: "100%",
            minHeight: "40vh",
          }}
          barGap={0}
          responsive
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis width="auto" tickLine={false} axisLine={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Essential"
            fill="#64748b"
            activeBar={{ fill: "#475569" }}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Investment"
            fill="#22c55e"
            activeBar={{ fill: "#16a34a" }}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Enjoyment"
            fill="#f59e0b"
            activeBar={{ fill: "#d97706" }}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </div>
      <div className="shadow-lg rounded-xl p-6 w-1/2 border border-black/10 flex flex-col justify-between">
        <div className="flex flex-col mb-4">
          <h2 className="text-lg font-bold">Cash Flow</h2>
          <p className="text-sm font-medium text-gray-500">
            Essential vs Investment vs Enjoyment over time
          </p>
        </div>
        <PieChart
          style={{
            width: "100%",
            maxHeight: "80vh",
            aspectRatio: 1.5,
          }}
          responsive
        >
          <Pie
            data={pieChart}
            dataKey="value"
            label={({ name, percent }) => percent?`${name} ${(percent * 100).toFixed(0)}%`:`${name}`}
            labelLine={false}
            isAnimationActive
            fill="#32a89a"
            shape={(props: PieSectorShapeProps) => {
              return (
                <Sector {...props} fill={pieChart[props.index % pieChart.length].color} />
              );
            }}
          />
        </PieChart>
      </div>
    </section>
  );
};

export default Charts;
