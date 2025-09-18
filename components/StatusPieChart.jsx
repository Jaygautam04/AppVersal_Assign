"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444"]

export default function StatusPieChart({ data }) {
  const filteredData = data.filter((item) => item.count > 0)

  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-96">
      <h2 className="text-lg font-semibold mb-2">Team Status Distribution</h2>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie data={filteredData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100} label>
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
