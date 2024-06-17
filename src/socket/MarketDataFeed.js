import React, { useEffect, useState } from "react";
import proto from "./marketDataFeed.proto";
import { Buffer } from "buffer";
import protobuf from "protobufjs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
// import Chart from "./Index/Chart";

// Initialize Protobuf root
let protobufRoot = null;
const initProtobuf = async () => {
  protobufRoot = await protobuf.load(proto);
  console.log("Protobuf part initialization complete");
};

// Function to get WebSocket URL
const getUrl = async (token) => {
  const apiUrl = "https://api-v2.upstox.com/feed/market-data-feed/authorize";
  let headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  };
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const res = await response.json();
  return res.data.authorizedRedirectUri;
};

// Helper functions for handling Blob and ArrayBuffer
const blobToArrayBuffer = async (blob) => {
  if ("arrayBuffer" in blob) return await blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject();
    reader.readAsArrayBuffer(blob);
  });
};

// Decode Protobuf messages
const decodeProtobuf = (buffer) => {
  if (!protobufRoot) {
    console.warn("Protobuf part not initialized yet!");
    return null;
  }
  const FeedResponse = protobufRoot.lookupType(
    "com.upstox.marketdatafeeder.rpc.proto.FeedResponse"
  );
  return FeedResponse.decode(buffer);
};

// MarketDataFeed component
function MarketDataFeed({ token }) {
  const [isConnected, setIsConnected] = useState(false);
  const [feedData, setFeedData] = useState({});
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Establish WebSocket connection
  useEffect(() => {
    const connectWebSocket = async (token) => {
      try {
        const wsUrl = await getUrl(token);
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          setIsConnected(true);
          console.log("Connected");
          const data = {
            guid: "someguid",
            method: "sub",
            data: {
              mode: "full",
              instrumentKeys: [
                "NSE_INDEX|Nifty Bank",
                "NSE_INDEX|Nifty 50",
                "NSE_INDEX|Nifty Fin Service",
              ],
            },
          };
          ws.send(Buffer.from(JSON.stringify(data)));
        };

        ws.onclose = () => {
          setIsConnected(false);
          console.log("Disconnected");
        };

        ws.onmessage = async (event) => {
          const arrayBuffer = await blobToArrayBuffer(event.data);
          let buffer = Buffer.from(arrayBuffer);
          let response = decodeProtobuf(buffer);

          setFeedData(response.feeds);
          console.log("Received message:", response);
        };

        ws.onerror = (error) => {
          setIsConnected(false);
          console.log("WebSocket error:", error);
        };

        return () => ws.close();
      } catch (error) {
        console.error("WebSocket connection error:", error);
      }
    };

    initProtobuf();
    connectWebSocket(token);
  }, [token]);

  const handleInstrumentClick = (instrumentKey) => {
    setSelectedInstrument(instrumentKey);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="feed-container">
      <div className="header-section">
        <h1>Market Feed</h1>
        <h3 className={`status ${isConnected ? "connected" : "not-connected"}`}>
          Status: <span>{isConnected ? "Connected" : "Not Connected"}</span>
        </h3>
      </div>
      {isConnected && (
        <div className="feed-section">
          <div className="title">Feed</div>
          <div className="instrument-buttons text-center">
            {Object.keys(feedData).map((key) => (
              <button
                key={key}
                className="btn btn-primary m-2"
                onClick={() => handleInstrumentClick(key)}
              >
                {key.split("|")[1]}
              </button>
            ))}
          </div>
        </div>
      )}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedInstrument && selectedInstrument.split("|")[1]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInstrument && (
            <>
              <ul>
                <li>
                  Last Traded Price:{" "}
                  {feedData[selectedInstrument].ff.indexFF.ltpc.ltp}
                </li>
                <li>
                  Open:{" "}
                  {
                    feedData[selectedInstrument].ff.indexFF.marketOHLC.ohlc[1]
                      .open
                  }
                </li>
                <li>
                  High:{" "}
                  {
                    feedData[selectedInstrument].ff.indexFF.marketOHLC.ohlc[1]
                      .high
                  }
                </li>
                <li>
                  Low:{" "}
                  {
                    feedData[selectedInstrument].ff.indexFF.marketOHLC.ohlc[1]
                      .low
                  }
                </li>
                <li>
                  Close:{" "}
                  {
                    feedData[selectedInstrument].ff.indexFF.marketOHLC.ohlc[1]
                      .close
                  }
                </li>
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MarketDataFeed;
