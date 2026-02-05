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
  PieSectorShapeProps,
  Sector,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
// Static

const RADIAN = Math.PI / 180;

const renderPieLabel = (props: PieLabelRenderProps) => {
  const { cx, cy, midAngle, outerRadius, percent, name } = props;

  if (
    cx == null ||
    cy == null ||
    midAngle == null ||
    outerRadius == null ||
    percent == null ||
    !name
  ) {
    return null;
  }

  const offset = outerRadius * 0.2;
  const radius = outerRadius + offset;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#111827"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-[10px] sm:text-xs md:text-sm font-medium"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BAR_GRAPH_DATA = [
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
];

const PIE_CHART_DATA = [
    { name: "Housing", value: 900, color: "#111827" },
    { name: "Food", value: 450, color: "#1f2937" },
    { name: "Transport", value: 300, color: "#374151" },
    { name: "Entertainment", value: 250, color: "#4b5563" },
    { name: "Utilities", value: 200, color: "#6b7280" },
    { name: "Other", value: 350, color: "#9ca3af" },
];

const Charts = () => {
  const [barGraph] = useState(BAR_GRAPH_DATA);
  const [pieChart] = useState(PIE_CHART_DATA);

  return (
    <section className="flex gap-4 flex-col md:flex-row">
      <div className="shadow-lg rounded-xl p-6 w-full md:w-1/2 border border-black/10 flex flex-col justify-between">
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
          <Bar dataKey="Essential" fill="#111827" radius={[5, 5, 0, 0]} />
          <Bar dataKey="Investment" fill="#4b5563" radius={[5, 5, 0, 0]} />
          <Bar dataKey="Enjoyment" fill="#6b7280" radius={[5, 5, 0, 0]} />
        </BarChart>
      </div>
      <div className="shadow-lg border border-black/10 rounded-xl p-6 w-full md:w-1/2 flex flex-col justify-between">
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
            label={renderPieLabel}
            isAnimationActive
            fill="#111827"
            shape={(props: PieSectorShapeProps) => {
              return (
                <Sector
                  {...props}
                  fill={
                    pieChart[props.index % pieChart.length].color
                  }
                />
              );
            }}
          />
        </PieChart>
      </div>
    </section>
  );
};

export default Charts;
