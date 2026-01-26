import React from 'react';
import { Eye } from 'lucide-react';

const Orders = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Customer</th>
              <th className="py-4 px-6">Total</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { id: 'ORD-001', date: '2023-10-01', customer: 'Budi Santoso', total: 'Rp 150.000', status: 'Completed' },
              { id: 'ORD-002', date: '2023-10-02', customer: 'Siti Aminah', total: 'Rp 450.000', status: 'Processing' },
              { id: 'ORD-003', date: '2023-10-03', customer: 'Joko Widodo', total: 'Rp 75.000', status: 'Pending' },
            ].map((order, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="py-4 px-6 font-medium text-gray-800">#{order.id}</td>
                <td className="py-4 px-6 text-gray-500">{order.date}</td>
                <td className="py-4 px-6">{order.customer}</td>
                <td className="py-4 px-6 font-bold">{order.total}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold 
                    ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                      'bg-yellow-100 text-yellow-700'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-gray-500 hover:text-primary flex items-center gap-1 ml-auto">
                    <Eye size={16} /> Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
