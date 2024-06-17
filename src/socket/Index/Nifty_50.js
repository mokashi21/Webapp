import React from "react";
import Index from "../Index/Index";

const Nifty_50 = ({ stockData }) => {
  // Filter stockData for Nifty 50
  const filteredData = stockData.filter((stock) =>
    stock.feeds.hasOwnProperty("NSE_INDEX|Nifty 50")
  );

  return <Index stockData={filteredData} />;
};

export default Nifty_50;
