# 🗳️ Blockchain-Based Voting System

A secure and transparent voting application built using **Python**, **Flask**, and a simple **Blockchain** model. This project simulates an election process where users can vote only once, and votes are stored immutably using blockchain principles.

## 🌟 Features

- ✅ **Voter Registration** with unique voter IDs
- 🔐 **Secure Voting** – only registered users can vote
- 🗳️ **One Person, One Vote** policy enforced
- 🔗 **Blockchain Integration** – votes stored immutably
- 📊 **Real-time Vote Count** (visible after election ends)
- 🔑 **Admin Controls** – Start/End election, view results


## 🛠️ Tech Stack

| Layer      | Technologies                        |
|------------|--------------------------------------|
| Frontend   | React (Vite), Axios                  |
| Backend    | Python, Flask, Flask-CORS            |
| Blockchain | Custom Python implementation         |
| Storage    | JSON file-based (chain.json, voters.json) |

## 📂 Project Structure
blockchain-voting-system/
│
├── backend/
│   ├── blockchain.py      # Block + Blockchain classes, chain validation
│   ├── voting.py          # Flask REST API
│   ├── voters.json        # Pre-registered voter IDs
│   └── chain.json         # Persisted blockchain (auto-generated)
│
├── frontend/
│   └── src/
│       ├── App.jsx         # Main React component
│       ├── main.jsx        # Entry point
│       └── index.css       # Global styles
│
└── README.md

## 🚀 How to Run Locally

### Backend

```bash
cd backend
pip install flask flask-cors
python voting.py
```

Flask runs at `http://127.0.0.1:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

React runs at `http://localhost:5173`

## 🔗 API Endpoints

| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| POST   | `/vote`          | Submit a vote                |
| GET    | `/results`       | Get results (after voting ends) |
| GET    | `/voting_status` | Check if voting is open      |
| POST   | `/end_voting`    | Admin: end the election      |
| GET    | `/chain`         | View the full blockchain     |

## 🧠 How the Blockchain Works

Each vote is wrapped in a transaction and mined into a new Block:
Block {
index: 1,
transactions: [{ voter_id, candidate }],
timestamp: ...,
previous_hash: "03784...",
hash: SHA-256(index + transactions + timestamp + previous_hash)
}

Changing any vote in any block invalidates that block's hash, which breaks the link to every subsequent block — making tampering immediately detectable.

## 📌 Usage
Register new voters using their unique ID
Allow each registered user to vote once
Votes are recorded on a blockchain
Admin can end the election to stop voting
Results are shown after the election ends

## 📚 Future Improvements
- Add user authentication (with passwords or OTPs)
- Use a real database (like SQLite or MongoDB)
- Deploy to a cloud platform (like Heroku or Render)
- Implement smart contracts using Ethereum
- Add encryption for vote anonymity
