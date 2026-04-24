'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Direct Aid', value: 85, color: '#1A3A8F' },
  { name: 'Awareness', value: 10, color: '#C0272D' },
  { name: 'Operations', value: 5, color: '#CBD5E1' },
];

export default function DonationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={2}
          stroke="none"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
