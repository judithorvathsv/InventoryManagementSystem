import React, { useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { PurchaseContext } from '../context/PurchaseContextProvider';
import { OrderContext } from '../context/OrderContextProvider';

const ComparisonChart: React.FC = () => {
  const { purchases } = useContext(PurchaseContext);
  const { orders } = useContext(OrderContext);

  const totalPurchaseCost = purchases.reduce((sum, purchase) => 
    sum + (purchase.quantity * purchase.unitPrice), 0);

  const totalOrderCost = orders.reduce((sum, order) => 
    sum + (order.quantity * order.unitPrice), 0);

  const data = [
    { name: 'Purchases', cost: totalPurchaseCost },
    { name: 'Orders', cost: totalOrderCost }
  ];

  return (
    <div className="w-full h-[400px]">
      <h2 className="mb-12 text-center title bold-title">Comparison of Purchases and Orders (SEK)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Cost (SEK)', angle: -90, position: 'insideLeft', offset: -5 }} />
          <Tooltip formatter={(value) => `${Number(value).toFixed(2)} SEK`} />
          <Legend />
          <Bar dataKey="cost" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
