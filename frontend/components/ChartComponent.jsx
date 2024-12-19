import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, defs, linearGradient } from 'recharts';

export default function ChartComponent({ data }) {
  return (
    <div className="flex justify-center items-center w-full h-auto">
      <LineChart
        width={1000}
        height={600}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="year" stroke="#333" />
        <YAxis stroke="#333" />
        <Tooltip
          wrapperStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            color: '#333',
          }}
          labelStyle={{ fontWeight: 'bold' }}
        />
        <Legend wrapperStyle={{ color: '#333' }} />
        <Line
          type="monotone"
          dataKey="population"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={{ r: 3, fill: '#4f46e5' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </div>
  );
}
