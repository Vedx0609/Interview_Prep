import { useState, useEffect } from "react";
import MCQPage from "./MCQPage";
import { useApi } from "../api";
import "./HistoryPage.css";

export default function HistoryPage() {
  const { makeRequest } = useApi();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  });

  const fetchHistory = async () => {
    setLoading(false);
    setError(null);

    try {
      const data = await makeRequest("history");
      setHistory(data.challenges);
    } catch (err) {
      setError(err.message || "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading">Loading history...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="error">Error: {error}</p>
        <button onClick={fetchHistory}>Retry</button>;
      </div>
    );
  }

  return (
    <div className="history-page">
      <h2 className="history-title">History</h2>
      {history.length === 0 ? (
        <p className="no-history">No challenge histroy</p>
      ) : (
        <div className="history-list">
          {history.map((challenge) => {
            return (
              <MCQPage
                challenge={challenge}
                key={challenge.id}
                showExplanation
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
