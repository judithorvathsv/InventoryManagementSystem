import React from 'react';
import ComparisonChart from "./comparisonChart";
import LineChartComponent from './lineChart';


const Charts: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div className="w-full h-[700px]">
        <LineChartComponent />
      </div>
      <div className="w-full h-[800px]">
        <ComparisonChart />
      </div>
    </div>
  );
};

export default Charts;
