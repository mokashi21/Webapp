import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to the Trading Dashboard</h1>
      <p>Select a feed to view the data</p>
      <div className="btn-group mt-3 gap-3">
        <Link to="/market-data" className="btn btn-primary">
          Market Data
        </Link>
        <Link to="/order-data" className="btn btn-secondary">
          Order Data
        </Link>
      </div>
    </div>
  );
};

export default Home;
