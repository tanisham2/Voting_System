import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";
const CANDIDATES = ["Narendra Mehta", "Rahul Verma", "Arvind Kapoor", "Mamta Rane"];

export default function App() {
  const [voterId, setVoterId] = useState("");
  const [candidate, setCandidate] = useState("");
  const [message, setMessage] = useState({ text: "", ok: true });
  const [votingOpen, setVotingOpen] = useState(true);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API}/voting_status`).then(({ data }) => {
      setVotingOpen(data.voting_open);
      if (!data.voting_open) fetchResults();
    });
  }, []);

  const fetchResults = () => {
    axios.get(`${API}/results`).then(({ data }) => setResults(data));
  };

  const handleVote = async () => {
    if (!voterId || !candidate) {
      setMessage({ text: "Please fill in all fields.", ok: false });
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/vote`, { voter_id: voterId, candidate });
      setMessage({ text: data.message, ok: true });
      setVoterId("");
      setCandidate("");
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Vote failed.", ok: false });
    } finally {
      setLoading(false);
    }
  };

  const handleEndVoting = async () => {
    if (!window.confirm("End voting? This cannot be undone.")) return;
    await axios.post(`${API}/end_voting`);
    setVotingOpen(false);
    fetchResults();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.badge}>🔗 Blockchain-secured</span>
          <h1 style={styles.title}>Blockchain Voting System</h1>
          <p style={styles.subtitle}>Your vote is immutably recorded on-chain</p>
        </div>

        {votingOpen ? (
          <div style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Voter ID</label>
              <input
                style={styles.input}
                value={voterId}
                onChange={e => setVoterId(e.target.value)}
                placeholder="e.g. VOTER001"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Choose Candidate</label>
              <select
                style={styles.input}
                value={candidate}
                onChange={e => setCandidate(e.target.value)}
              >
                <option value="">-- Select --</option>
                {CANDIDATES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {message.text && (
              <div style={{ ...styles.msg, background: message.ok ? "#e8f5e9" : "#fdecea", color: message.ok ? "#2e7d32" : "#c62828" }}>
                {message.text}
              </div>
            )}

            <button style={styles.btnGreen} onClick={handleVote} disabled={loading}>
              {loading ? "Submitting..." : "Submit Vote"}
            </button>

            <button style={styles.btnRed} onClick={handleEndVoting}>
              End Voting
            </button>
          </div>
        ) : (
          <div style={styles.form}>
            <h2 style={{ textAlign: "center", color: "#1a2e1b", marginBottom: 20 }}>Final Results</h2>
            {results ? (
              Object.entries(results)
                .sort((a, b) => b[1] - a[1])
                .map(([name, votes], i) => (
                  <div key={name} style={{ ...styles.result, background: i === 0 ? "#fff8e1" : "#f1f8e9" }}>
                    <span>{i === 0 ? "🏆 " : ""}{name}</span>
                    <strong>{votes} vote{votes !== 1 ? "s" : ""}</strong>
                  </div>
                ))
            ) : (
              <p style={{ textAlign: "center", color: "#555" }}>Loading results...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#3a533c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "460px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  header: {
    background: "#2d4a30",
    padding: "28px 32px",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    color: "#c8e6c9",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "20px",
    marginBottom: "12px",
    letterSpacing: "0.5px",
  },
  title: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "6px",
  },
  subtitle: {
    color: "#a5c9a8",
    fontSize: "13px",
  },
  form: {
    padding: "28px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "11px 14px",
    border: "1.5px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#111827",
    background: "#ffffff",
    outline: "none",
    width: "100%",
  },
  msg: {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  btnGreen: {
    padding: "13px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnRed: {
    padding: "11px",
    background: "#c0392b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },
  result: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#1a2e1b",
  },
};
