import React, { useEffect, useState } from "react";
import "../../../styles/admin/dashboard.css";
import RequestRevenue from "./RequestRevenue";
import RescuePieChart from "./RescuePieChart";
import {
  getTotal,
  getRescue,
  getCustomer,
  getReturnCustomer,
  getTotalLastMonth,
  getRescueLastMonth,
  getCustomerLastMonth,
  getReturnCustomerLastMonth,
} from "../../../services/admin.js";

const DashboardContent = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRescue, setTotalRescue] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalReturnsCustomer, setTotalReturnsCustomer] = useState(0);

  const [revenueChange, setRevenueChange] = useState(0);
  const [rescueChange, setRescueChange] = useState(0);
  const [customerChange, setCustomerChange] = useState(0);
  const [returnChange, setReturnChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [
        revenue,
        rescue,
        customer,
        returnCustomer,
        lastRevenue,
        lastRescue,
        lastCustomer,
        lastReturnCustomer,
      ] = await Promise.all([
        getTotal(),
        getRescue(),
        getCustomer(),
        getReturnCustomer(),
        getTotalLastMonth(),
        getRescueLastMonth(),
        getCustomerLastMonth(),
        getReturnCustomerLastMonth(),
      ]);

      setTotalRevenue(revenue);
      setTotalRescue(rescue);
      setTotalCustomer(customer);
      setTotalReturnsCustomer(returnCustomer);

      setRevenueChange(calculateChangePercent(lastRevenue, revenue));
      setRescueChange(calculateChangePercent(lastRescue, rescue));
      setCustomerChange(calculateChangePercent(lastCustomer, customer));
      setReturnChange(calculateChangePercent(lastReturnCustomer, returnCustomer));
    };

    fetchData();
  }, []);

  const calculateChangePercent = (previous, current) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(totalRevenue);

  const renderChange = (change) => {
    const isPositive = change >= 0;
    const percentText = `${Math.abs(change).toFixed(1)}%`;
    const icon = isPositive
      ? "../../../../public/images/icon-web/Chart Arrow Rise.png"
      : "../../../../public/images/icon-web/Chart Arrow Descent.png";
    const className = isPositive ? "AnalystPercent" : "AnalystPercent1";
    const percentClass = isPositive ? "percent-digits" : "percent-digits-low";

    return (
      <div className={className}>
        <div>
          <img src={icon} alt="change-icon" />
        </div>
        <div className={percentClass}>{percentText}</div>
      </div>
    );
  };

  return (
    <div className="AllDashboard">
      <div className="TitleDashboard">DASHBOARD</div>

      {/* Cards */}
      <div className="CardDashboard">
        <div className="EachCard">
          <div className="EachCardTitle">
            <img src="../../../../public/images/icon-web/Us Dollar Circled.png" />
            <div className="card-title">Total Revenue</div>
          </div>
          <div className="EachCardAnalyst">
            <div className="AnalystDigits">{formattedRevenue}</div>
            {renderChange(revenueChange)}
          </div>
        </div>

        <div className="EachCard">
          <div className="EachCardTitle">
            <img src="../../../../public/images/icon-web/Request Service3.png" />
            <div className="card-title">Total Rescue</div>
          </div>
          <div className="EachCardAnalyst">
            <div className="AnalystDigits">{totalRescue}</div>
            {renderChange(rescueChange)}
          </div>
        </div>

        <div className="EachCard">
          <div className="EachCardTitle">
            <img src="../../../../public/images/icon-web/Users.png" />
            <div className="card-title">Total Customer</div>
          </div>
          <div className="EachCardAnalyst">
            <div className="AnalystDigits">{totalCustomer}</div>
            {renderChange(customerChange)}
          </div>
        </div>

        <div className="EachCard">
          <div className="EachCardTitle">
            <img src="../../../../public/images/icon-web/Return Baggage.png" />
            <div className="card-title">Total Returns</div>
          </div>
          <div className="EachCardAnalyst">
            <div className="AnalystDigits">{totalReturnsCustomer}</div>
            {renderChange(returnChange)}
          </div>
        </div>
      </div>

      {/* Charts */}
      <RequestRevenue />
      <RescuePieChart />
    </div>
  );
};

export default DashboardContent;
