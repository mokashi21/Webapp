import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MarketDataFeed from "./socket/MarketDataFeed";
import OrderDataFeed from "./socket/OrderDataFeed";
import Home from "./component/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const auth_token =
    "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI1NkFVSksiLCJqdGkiOiI2NjZlOTY0M2NkYTlmYTA2YmQxNTQ3NzAiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaWF0IjoxNzE4NTIzNDU5LCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3MTg1NzUyMDB9.s1NuPR6vB7afCO_-HTU78JRymcW-pBmE4KcFwgCJrzw";

  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/market-data">
                  Market Data
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order-data">
                  Order Data
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/market-data"
            element={<MarketDataFeed token={auth_token} />}
          />
          <Route
            path="/order-data"
            element={<OrderDataFeed token={auth_token} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
