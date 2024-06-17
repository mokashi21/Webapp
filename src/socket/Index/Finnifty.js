import React from "react";
import Index from "../Index/Index";

const Finnifty = ({ stockData }) => {
  // Filter stockData for Nifty Fin Service
  const filteredData = stockData.filter((stock) =>
    stock.feeds.hasOwnProperty("NSE_INDEX|Nifty Fin Service")
  );

  return <Index stockData={filteredData} />;
};

export default Finnifty;
