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

| Layer        | Technologies             |
|--------------|---------------------------|
| Frontend     | HTML, CSS, JavaScript     |
| Backend      | Python, Flask             |
| Blockchain   | Custom Python Blockchain  |
| Database     | JSON File-based Storage   |

## 📂 Project Structure

voting-system/
│
├── static/ # CSS & JS files
├── templates/ # HTML templates (Jinja2)
├── app.py # Main Flask application
├── blockchain.py # Blockchain logic
├── voters.json # Registered voters
├── votes.json # Cast votes
└── README.md # Project documentation

## 🚀 How to Run the Project Locally

1. **Clone the repo**
   git clone https://github.com/yourusername/blockchain-voting-system.git
   cd blockchain-voting-system

2. **Install dependencies**
Make sure you have Python 3 installed.
pip install flask

3. **Start the Flask server**
python app.py

4. **Open your browser**
http://127.0.0.1:5000

## 📌 Usage
Register new voters using their unique ID
Allow each registered user to vote once
Votes are recorded on a blockchain
Admin can end the election to stop voting
Results are shown after the election ends

## 📚 Future Improvements
Add user authentication (with passwords or OTPs)
Use a real database (like SQLite or MongoDB)
Deploy to a cloud platform (like Heroku or Render)
Implement smart contracts using Ethereum
Add encryption for vote anonymity
