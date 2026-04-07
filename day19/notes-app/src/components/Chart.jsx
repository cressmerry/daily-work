import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Rectangle,
  CartesianGrid,
} from "recharts";
import { RechartsDevtools } from '@recharts/devtools';

const AnimatedShape = (props) => {
  const { x, y, width, height, fill, isActive } = props;
  if (!width || !height) return null;

  return (
    <g>
      <Rectangle {...props} fill="transparent" />
      <Rectangle
        {...props}
        fill={fill}
        style={{
          transform: isActive ? "scaleY(1)" : "scaleY(0.7)",
          transformOrigin: `${x + width / 2}px ${y + height}px`,
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          pointerEvents: "none",
        }}
      />
    </g>
  );
};

function Chart({ notes = [] }) {
  const chartData = useMemo(() => {
    const closedCount = notes.filter(
      (note) =>
        note.status?.toLowerCase() === "closed" ||
        note.status?.toLowerCase() === "completed",
    ).length;
    const createdCount = notes.length - closedCount;

    return [
      { name: "Active", count: createdCount, color: "#10b981" },
      { name: "Done", count: closedCount, color: "#f59e0b" },
    ];
  }, [notes]);

  return (
    <div style={{ width: '100%', maxWidth: '400px', height: '220px', padding: '10px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 25, right: 30, left: -20, bottom: 5 }}
          barCategoryGap="35%"
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#e2e8f0" 
          />
          <XAxis 
            dataKey="name" 
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
            tick={{ fontSize: 12, fontWeight: 600, fill: "#94a3b8" }}
            dy={10}
          />
          <YAxis 
            hide={false} 
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            domain={[0, 'dataMax + 2']}
            allowDecimals={false}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }} 
            contentStyle={{ 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }}
          />
          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            shape={<AnimatedShape />}
            activeBar={<AnimatedShape isActive={true} />}
            isAnimationActive={true}
            label={{ 
              position: 'top', 
              fill: "#64748b", 
              fontSize: 12, 
              fontWeight: 800,
              offset: 10 
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;