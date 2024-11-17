import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, Legend } from "recharts";
import { motion } from "framer-motion";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const dummyData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
];

const pieData = [
  { name: 'NTorq', value: 400 },
  { name: 'Apache', value: 300 },
  { name: 'Jupiter', value: 300 },
  { name: 'Radeon', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const generateExcelReport = () => {
  const data = [
    ["Model", "Sales", "Stock"],
    ["NTorq", 400, 1500],
    ["Apache", 300, 1200],
    ["Jupiter", 300, 1000],
    ["Radeon", 200, 800],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "TVS Motors Report");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, "TVS_Motors_Report.xlsx");
};

const Dashboard = () => {
  return (
    <div className="text-white">
      {/* HEADER */}
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.h1
            className="text-3xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to the  performance dashboard
          </motion.p>
        </div>
        <button
          onClick={generateExcelReport}
          className="bg-blue-600 text-white font-bold py-2 px-4 flex mr-10 items-center rounded-md hover:bg-blue-700"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Download Reports
        </button>
      </motion.div>

      {/* GRID & CHARTS */}
      <div className="grid grid-cols-12 gap-8">
        {/* ROW 1 */}
        <motion.div
          className="col-span-3 bg-gray-800 p-4 rounded-md flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h3
              className="text-xl font-bold text-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              5,12,361
            </motion.h3>
            <motion.p
              className="text-gray-400  text-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Vehicles manufactured
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="col-span-3 bg-gray-800 p-4 rounded-md flex items-center justify-center  text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h3
              className="text-xl font-bold  text-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              431,225
            </motion.h3>
            <motion.p
              className="text-gray-400"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Sales Obtained
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="col-span-3 bg-gray-800 p-4 rounded-md flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h3
              className="text-xl font-bold  text-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              32,441
            </motion.h3>
            <motion.p
              className="text-gray-400  text-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              New Clients
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="col-span-2 bg-gray-800 p-4 rounded-md flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h3
              className="text-xl font-bold  text-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              1,325,134
            </motion.h3>
            <motion.p
              className="text-gray-400"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Traffic Received
            </motion.p>
          </div>
        </motion.div>

        {/* ROW 2: LINE CHART */}
        <motion.div
          className="col-span-7 bg-gray-800 p-6 rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3
            className="text-xl font-bold mb-4"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Revenue Generated
          </motion.h3>
          <LineChart width={500} height={250} data={dummyData}>
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </motion.div>

        {/* PIE CHART */}
        <motion.div
          className="col-span-4 bg-gray-800 p-6 rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3
            className="text-xl font-bold mb-4"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Sales Distribution
          </motion.h3>
          <PieChart width={300} height={250} className="contain object-contain">
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </motion.div>

        {/* ROW 3: BAR CHART */}
        <motion.div
          className="col-span-11 bg-gray-800 p-6 rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3
            className="text-xl font-bold mb-4"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Sales Quantity
          </motion.h3>
          <BarChart width={1000} height={250} data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
      

        {/* FOOTER */}
        <motion.div
          className="col-span-12 bg-gray-800 p-4 rounded-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-400">© 2024  Dashboard</p>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
