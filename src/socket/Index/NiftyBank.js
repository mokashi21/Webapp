import React from "react";
import Index from "./Index";

const NiftyBank = ({ stockData }) => {
  // Filter stockData for Nifty Bank
  const filteredData = stockData.filter((stock) =>
    stock.feeds.hasOwnProperty("NSE_INDEX|Nifty Bank")
  );

  return <Index stockData={filteredData} />;
};

export default NiftyBank;
