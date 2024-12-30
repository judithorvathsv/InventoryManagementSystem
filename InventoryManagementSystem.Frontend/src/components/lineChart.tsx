import  { useContext } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PurchaseContext } from '../context/PurchaseContextProvider';

const LineChartComponent = () => {

  const { purchases, errorMessage } = useContext(PurchaseContext);
  if (errorMessage) {
    return <div className="red-text">{errorMessage}</div>;
  }

  const purchaseData = purchases.map(purchase => ({
    date: new Date(purchase.purchaseDate).toLocaleDateString(), 
    totalCost: purchase.totalCost,
  }));  

  return (
    <div className="w-full h-full">
      <h2 className="mb-12 text-center title bold-title">Total Cost of Purchases Over Time</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={purchaseData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Total Cost (sek)', angle: -90, position: 'insideLeft', offset: -5 }} />
          <Tooltip />         
          <Line type="monotone" dataKey="totalCost" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;