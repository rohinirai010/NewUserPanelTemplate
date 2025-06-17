import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Check, X } from 'lucide-react';

// Formatter utility
const Formatter = {
  count: (value) => new Intl.NumberFormat("en-US").format(value),
  currency: (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value),
  percent: (value) =>
    new Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 1,
    }).format(value),
};

function ConvertRateChart({ percent }) {
  const circumference = 34.56;
  const offset = circumference * (1 - percent);
  const dots = 16;
  const dotAngle = +(360 / dots).toFixed(2);
  const angles = Array.from({ length: dots }, (_, d) => dotAngle * d);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="text-black dark:text-white text-center relative w-52 h-52 mx-auto py-4">
        <svg
          viewBox="0 0 16 16"
          className="absolute top-0 left-0 w-full h-full"
        >
          <g fill="currentColor" transform="translate(8,8)">
            {angles.map((angle, i) => (
              <circle
                key={i}
                r="0.5"
                className={`transition-colors duration-300 ${
                  i < Math.floor(percent * dots)
                    ? "fill-blue-600"
                    : "fill-gray-300 dark:fill-gray-600"
                }`}
                transform={`rotate(${angle}) translate(0,-5.5)`}
              />
            ))}
            <circle
              r="5.5"
              fill="none"
              className="stroke-blue-600 transition-all duration-300"
              strokeLinecap="round"
              strokeWidth="1"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              transform="rotate(-90)"
            />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="text-4xl font-bold text-blue-700 dark:text-blue-400">
            {Formatter.percent(percent)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</div>
        </div>
      </div>
    </div>
  );
}

function TradingPerformanceCard() {
  const [activeTab, setActiveTab] = useState('overview');
  const performanceData = {
    overview: {
      top: 0.06,
      trading_goals: 0.672,
      number_of_trades: 2608,
      change: 0.035,
      total_trades_value: 42200,
      total_change: -0.045,
    },
    performance: {
      history: [
        { percent: 0.75 },
        { percent: 0.82 },
        { percent: 0.68 },
        { percent: 0.79 },
        { percent: 0.85 },
        { percent: 0.72 },
        { percent: 0.88 },
        { percent: 0.76 },
        { percent: 0.81 },
        { percent: 0.78 },
      ],
    },
    convert_rate: 0.375,
    customer_calls: [
      {
        name: "Ann Thrax",
        source: "TikTok Leads",
        vip: true,
      },
    ],
    trading_target: {
      target: 42200,
      streams: [
        { source: "Social Media", revenue: 6800, change: -0.2 },
        { source: "Email Marketing", revenue: 8200, change: -0.45 },
        { source: "Direct Trades", revenue: 15400, change: 0.7 },
        { source: "Referrals", revenue: 11800, change: -0.5 },
      ],
    },
  };

  return (
    <div className="bg-white dark:bg-gray-950 text-black dark:text-white min-h-screen p-2 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trading Overview */}
        <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100">Trading Overview</h2>
            <button className="text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full transition-colors">
              <MoreHorizontal />
            </button>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg p-3 mb-6 font-medium">
              You're the top {Formatter.percent(performanceData.overview.top)} of traders
            </div>

            <div className="relative mb-6">
              <svg className="w-64 h-32 mx-auto" viewBox="0 0 34 17">
                {Array.from({ length: 14 }, (_, i) => (
                  <path
                    key={i}
                    className={`transition-colors duration-300 ${
                      i < Math.floor(performanceData.overview.trading_goals * 14)
                        ? "fill-blue-600"
                        : "fill-gray-300 dark:fill-gray-700"
                    }`}
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform={`translate(17,17) rotate(${
                      180 / 14 / 2 + (180 / 14) * i
                    }) translate(-13.5,0)`}
                  />
                ))}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {Formatter.percent(performanceData.overview.trading_goals)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Trading Goals</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "No. of Trades",
                  value: performanceData.overview.number_of_trades,
                  change: performanceData.overview.change,
                  formatter: Formatter.count
                },
                {
                  label: "Total Trades Value",
                  value: performanceData.overview.total_trades_value,
                  change: performanceData.overview.total_change,
                  formatter: Formatter.currency
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {item.label}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {item.formatter(item.value)}
                  </div>
                  <div className={`text-sm flex items-center ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Formatter.percent(Math.abs(item.change))}
                    {item.change >= 0 ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="flex flex-col gap-4 ">
          {/* Performance Index */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Performance Index</h2>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {Formatter.percent(
                  performanceData.performance.history[
                    performanceData.performance.history.length - 1
                  ].percent
                )}
              </div>
            </div>

            <div className="flex bg-white dark:bg-gray-800 rounded-lg p-2 space-x-2">
              {performanceData.performance.history
                .slice(0, -1)
                .map((item, i) => (
                  <div
                    key={i}
                    className="w-4 h-24 bg-gray-200 dark:bg-gray-700 rounded-full relative"
                  >
                    <div
                      className="absolute bottom-0 bg-blue-600 w-full rounded-full transition-all duration-300"
                      style={{
                        height: `${item.percent * 100}%`,
                        transform: `translateY(${(1 - item.percent) * 100}%)`,
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Conversion Rate */}
          <ConvertRateChart percent={performanceData.convert_rate} />
        </div>

        {/* Customer Call */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-lg p-5 transform transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Customer Call</h3>
              <div className="text-sm text-blue-200">
                {performanceData.customer_calls[0].source}
              </div>
            </div>
          </div>

          <div className="bg-white text-black rounded-lg p-3 space-y-4">
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Check className="mr-2" /> Accept
              </button>
              <button className="border-2 border-blue-600 text-blue-600 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <X />
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-lg font-semibold">
                {performanceData.customer_calls[0].name}
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                {performanceData.customer_calls[0].vip ? "VIP Customer" : "Regular Customer"}
                {performanceData.customer_calls[0].vip && (
                  <span className="ml-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">VIP</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trading Target */}
        <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5">
          <div className="flex flex-col justify-between  mb-6">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Trading Target by Revenue Streams
              </h2>
              <button className="text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full transition-colors">
              <MoreHorizontal />
            </button>
              
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400 mt-2">
                {Formatter.currency(performanceData.trading_target.target)}
              </div>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {performanceData.trading_target.streams.map((stream, i) => (
              <div key={i} className="text-center bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md hover:shadow-lg transition-all transform hover:scale-95">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {stream.source}
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span className={`font-bold ${stream.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Formatter.percent(Math.abs(stream.change))}
                  </span>
                  {stream.change >= 0 ? 
                    <ChevronUp className="ml-1 text-green-600" size={16} /> : 
                    <ChevronDown className="ml-1 text-red-600" size={16} />
                  }
                </div>
                <div
                  className="h-16 rounded-lg relative overflow-hidden"
                  style={{
                    background: `linear-gradient(to top, 
                      ${stream.change >= 0 ? '#10B981' : '#EF4444'} ${
                      (stream.revenue / performanceData.trading_target.target) * 100
                    }%, 
                      ${stream.change >= 0 
                        ? 'theme(colors.green.100) dark:theme(colors.green.900)' 
                        : 'theme(colors.gray.300) dark:theme(colors.gray.700)'
                    } ${
                      (stream.revenue / performanceData.trading_target.target) *
                      100
                    }%)`,
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 text-center text-sm bg-blue-600 text-white rounded-b-lg">
                    {Formatter.currency(stream.revenue)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingPerformanceCard;
