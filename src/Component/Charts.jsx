import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';

const vehicleData = [
  {
    name: 'Apache 160',
    type: 'Bike',
    engineCapacity: 160,
    fuelType: 'Petrol',
    mileage: 50,
    price: 120000,
    sales: { 2021: 10000, 2022: 12000 },
    topSpeed: 110,
    torque: 14,
    stock: 100,
    rating: 4.5,
  },
  {
    name: 'NTorq',
    type: 'Scooter',
    engineCapacity: 124,
    fuelType: 'Petrol',
    mileage: 55,
    price: 85000,
    sales: { 2021: 15000, 2022: 16000 },
    topSpeed: 95,
    torque: 10,
    stock: 150,
    rating: 4.3,
  },
  {
    name: 'iQube',
    type: 'Electric',
    engineCapacity: 3.04,
    fuelType: 'Electric',
    mileage: 75,
    price: 145000,
    sales: { 2021: 8000, 2022: 9500 },
    topSpeed: 80,
    torque: 33,
    stock: 80,
    rating: 4.7,
  },
  {
    name: 'Jupiter',
    type: 'Scooter',
    engineCapacity: 110,
    fuelType: 'Petrol',
    mileage: 60,
    price: 80000,
    sales: { 2021: 13000, 2022: 14000 },
    topSpeed: 85,
    torque: 8,
    stock: 120,
    rating: 4.2,
  },
];

const vehicleOptions = vehicleData.map((vehicle) => vehicle.name);
const metricOptions = ['topSpeed', 'torque', 'mileage']; // The metrics users can compare

const VehicleComparison = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('topSpeed'); // Default metric to compare

  const handleVehicleSelection = (event) => {
    setSelectedVehicles([...event.target.selectedOptions].map((option) => option.value));
  };

  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  const getVehicleDataForComparison = () => {
    return vehicleData.filter((vehicle) => selectedVehicles.includes(vehicle.name));
  };

  const chartData = getVehicleDataForComparison();

  return (
    <div className="p-4 text-white min-h-screen">
      <h1 className="text-3xl text-center mb-6 font-bold">Vehicle Comparison Dashboard</h1>

      <div className="mb-10 flex flex-col items-center">
        <label className="text-lg font-semibold mb-4 text-indigo-300">Select Vehicles to Compare (Max 4):</label>
        <select
          multiple
          onChange={handleVehicleSelection}
          className="w-80 no-scrollbar p-3 border border-gray-500 rounded-2xl bg-gray-200 text-gray-800 focus:ring-4 focus:ring-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
          size="4"
        >
          {vehicleOptions.map((vehicle, index) => (
            <option key={index} value={vehicle} className="text-lg">
              {vehicle}
            </option>
          ))}
        </select>
      </div>

      { selectedVehicles!="" &&
      <div className="mb-10 flex flex-col items-center">
        <label className="text-lg font-semibold mb-4 text-indigo-300">Select Metric to Compare:</label>
        <select
          onChange={handleMetricChange}
          value={selectedMetric}
          className="w-80 p-3 border border-gray-500 rounded-2xl bg-gray-200 text-gray-800 focus:ring-4 focus:ring-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {metricOptions.map((metric, index) => (
            <option key={index} value={metric} className="text-lg">
              {metric.charAt(0).toUpperCase() + metric.slice(1)} {/* Capitalize first letter */}
            </option>
          ))}
        </select>
      </div>
}
      {chartData.length > 0 && <Charts data={chartData} selectedMetric={selectedMetric} />}
    </div>

  );
};

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const Charts = ({ data, selectedMetric }) => {
  // Custom label to show both vehicle name and stock value
  const renderCustomLabel = ({ name, stock }) => {
    return `${name}: ${stock}`;
  };

  return (
    <div className="space-y-8">
      {/* Bar Chart for Yearly Sales */}
      <div className="flex flex-col items-center shadow-md ">
        <h3 className="text-xl font-semibold mb-4">Yearly Sales Comparison</h3>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales.2021" fill="#8884d8" />
          <Bar dataKey="sales.2022" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Line Chart for Top Speed */}
      <div className="flex flex-col items-center shadow-md">
        <h3 className="text-xl font-semibold mb-4">Top Speed Comparison</h3>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="topSpeed" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Horizontal Bar Chart for Selected Metric */}
      <div className="flex flex-col items-center shadow-md">
        <h3 className="text-xl font-semibold mb-4">Performance Comparison ({selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)})</h3>
        <BarChart
          width={600}
          height={300}
          data={data}
          layout="vertical" // Set the chart layout to vertical for horizontal bars
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey={selectedMetric} fill="#8884d8" />
        </BarChart>
      </div>

      {/* Pie Chart for Stock Comparison */}
      <div className="flex flex-col items-center shadow-md">
        <h3 className="text-xl font-semibold mb-4">Current Stock Comparison</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="stock"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={renderCustomLabel} // Custom label for stock and name
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default VehicleComparison;
