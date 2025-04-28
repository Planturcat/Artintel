import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

interface ChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
}

export function LineChart({ data, xKey, yKey, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={xKey}
          tickFormatter={(value) => new Date(value).toLocaleTimeString()}
        />
        <YAxis />
        <Tooltip 
          labelFormatter={(value) => new Date(value).toLocaleString()}
        />
        <Line type="monotone" dataKey={yKey} stroke="#00cbdd" strokeWidth={2} dot={false} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function BarChart({ data, xKey, yKey, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill="#00cbdd" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

const COLORS = ['#00cbdd', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface PieChartProps extends Omit<ChartProps, 'xKey'> {
  nameKey: string;
}

export function PieChart({ data, nameKey, yKey, height = 300 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          nameKey={nameKey}
          dataKey={yKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}