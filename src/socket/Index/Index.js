import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = ({ stockData }) => {
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Index Name</th>
            <th>Last Traded Price</th>
            <th>OHLC</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock, index) => (
            <tr key={index}>
              <td>{stock.indexName}</td>
              <td
                className={
                  stock.ltp > stock.cp ? "text-success" : "text-danger"
                }
              >
                {stock.ltp}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#modal${index}`}
                >
                  OHLC
                </button>
                <div
                  className="modal fade"
                  id={`modal${index}`}
                  tabIndex="-1"
                  aria-labelledby={`modal${index}Label`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`modal${index}Label`}>
                          OHLC Details for {stock.indexName}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          <strong>Open:</strong> {stock.open}
                        </p>
                        <p>
                          <strong>High:</strong> {stock.high}
                        </p>
                        <p>
                          <strong>Low:</strong> {stock.low}
                        </p>
                        <p>
                          <strong>Close:</strong> {stock.close}
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
