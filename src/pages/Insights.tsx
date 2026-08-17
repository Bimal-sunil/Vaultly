import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import Card from "../components/Card";
import ToggleGroup from "../components/ToggleGroup";

function Insights() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("bar");

  // Dummy data for the UI
  const categoryData = [
    {
      name: "Entertainment",
      amount: 1450,
      color: "bg-[#FF6B6B]",
      hex: "#FF6B6B",
      percentage: 45,
    },
    {
      name: "Productivity",
      amount: 850,
      color: "bg-[#4ECDC4]",
      hex: "#4ECDC4",
      percentage: 25,
    },
    {
      name: "Communication",
      amount: 500,
      color: "bg-[#FFE66D]",
      hex: "#FFE66D",
      percentage: 15,
    },
    { name: "Health", amount: 450, color: "bg-[#FF9F1C]", hex: "#FF9F1C", percentage: 15 },
  ];

  let cumulativePercent = 0;
  const conicGradientString = categoryData
    .map((cat) => {
      const start = cumulativePercent;
      cumulativePercent += cat.percentage;
      return `${cat.hex} ${start}% ${cumulativePercent}%`;
    })
    .join(", ");

  return (
    <div className="w-full flex flex-col gap-8 text-light fade-in">
      <section className="flex items-start gap-4">
        <div 
          className="cursor-pointer mt-1"
          onClick={() => navigate("/")}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} className="text-accent w-8 h-8" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="h1 leading-tight">Insights</h1>
          <p className="text-accent-bg uppercase p">Your spending habits</p>
        </div>
      </section>

      {/* Main Stats */}
      <section className="flex flex-col gap-4">
        <div className="p-6 rounded-[15px] w-full bg-[linear-gradient(135deg,rgba(51,51,51,0.2)_0%,rgba(215,255,0,0.2)_100%)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <p className="pb text-accent-bg uppercase mb-1">
            Total Monthly Spend
          </p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold tracking-tight">₹3,250</h2>
            <div className="flex items-center text-xs font-semibold text-[#FF6347] bg-[#FF6347]/10 px-2 py-1 rounded-full mb-1">
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={14}
                className="mr-1"
              />
              12% vs last month
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card
            title="Active Subs"
            content="12"
            description="subscriptions"
          />
          <Card
            title="Upcoming (7 days)"
            content="3"
            description="renewals"
          />
        </div>
      </section>

      {/* Category Breakdown (Visual Bar) */}
      <section className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-wide">
            Category Breakdown
          </h3>
          <div className="w-32">
            <ToggleGroup
              options={[
                { label: "Bar", value: "bar" },
                { label: "Pie", value: "pie" },
              ]}
              value={viewType}
              onChange={(val) => setViewType(val)}
            />
          </div>
        </div>

        {/* View Container */}
        <div className="w-full mt-2 min-h-[120px] flex items-center justify-center">
          {viewType === "bar" ? (
            /* Progress Bar Container */
            <div className="w-full h-4 rounded-full flex overflow-hidden gap-1">
              {categoryData.map((cat, i) => (
                <div
                  key={i}
                  className={`h-full ${cat.color} transition-all duration-500`}
                  style={{ width: `${cat.percentage}%` }}
                  title={`${cat.name} (${cat.percentage}%)`}
                ></div>
              ))}
            </div>
          ) : (
            /* Pie Chart Container */
            <div className="relative w-32 h-32 rounded-full shadow-lg" style={{ background: `conic-gradient(${conicGradientString})` }}>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 mt-2">
          {categoryData.map((cat, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-accent-bg">
                  {cat.percentage}%
                </span>
                <span className="text-sm font-bold w-16 text-right">
                  ₹{cat.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly Trend Placeholder */}
      <section className="flex flex-col gap-4 mt-4 pb-12">
        <h3 className="text-lg font-semibold tracking-wide">
          6-Month Forecast
        </h3>
        <div className="p-6 rounded-[15px] w-full bg-[linear-gradient(135deg,rgba(51,51,51,0.2)_0%,rgba(215,255,0,0.2)_100%)] h-48 flex items-end justify-between gap-2 px-6">
          {/* Mock Bar Chart */}
          {[60, 80, 50, 90, 70, 100].map((height, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-full max-w-[32px] bg-accent/20 rounded-t-md relative group transition-all duration-300 hover:bg-accent/40"
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-accent border border-accent/20 text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 text-light">
                  Est. ₹{(height * 30).toFixed(0)}
                </div>
              </div>
              <span className="text-[10px] text-accent-bg font-medium uppercase">
                {["Mar", "Apr", "May", "Jun", "Jul", "Aug"][i]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Insights;
