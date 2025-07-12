import "./GenerationPage.css";

import { useState, useEffect } from "react";
import MCQChallenge from "./MCQPage.jsx";
import { useApi } from "../api.js";

export default function GenerationPage() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [quota, setQuota] = useState(null);
  const { makeRequest } = useApi();

  useEffect(() => {
    fetchQuota();
  });

  const fetchQuota = async () => {
    try {
      const data = await makeRequest("quota");
      setQuota(data);
    } catch (err) {
      setError(err.message || "Failed to fetch quota");
    }
  };

  const generateChallenge = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await makeRequest("generate-challenge", {
        method: "POST",
        body: JSON.stringify({ difficulty }),
      });
      setChallenge(data);
      fetchQuota();
    } catch (err) {
      setError(err.message || "Failed to generate challenge");
      setChallenge(null);
    } finally {
      setLoading(false);
    }
  };

  const getNextResetTime = () => {
    if (!quota?.last_date_for_reset) return null;
    const resetDate = new Date(quota.last_date_for_reset);
    resetDate.setHours(resetDate.getHours() + 24); // Assuming reset every 24 hours
    return resetDate;
  };

  return (
    <div className="challenge-container">
      <h2>Hello! You can generate MCQs here!</h2>

      <div className="challenge-quota">
        <p>Questions you can generate today: {quota?.quota_left || 0}</p>
        {quota?.quota_left === 0 && (
          <p>Next reset: {getNextResetTime()?.toLocaleDateString()}</p>
        )}
      </div>

      <div className="challenge-difficulty">
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={false}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        className="challenge-generate-button"
        onClick={generateChallenge}
        disabled={false}
      >
        {loading ? "Generating..." : "Generate Challenge"}
      </button>

      {error && <p className="error-message">{error}</p>}
      {challenge && <MCQChallenge challenge={challenge} />}
    </div>
  );
}
