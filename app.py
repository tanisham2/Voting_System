from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# In-memory store (you can replace this with blockchain logic)
votes = {}           # {voter_id: candidate}
vote_counts = {}     # {candidate: count}


@app.route('/vote', methods=['POST'])
def vote():
    data = request.get_json()
    voter_id = data.get('voter_id')
    candidate = data.get('candidate')

    if not voter_id or not candidate:
        return jsonify({'message': 'Missing voter ID or candidate'}), 400

    if voter_id in votes:
        return jsonify({'message': 'Voter has already voted!'}), 400

    votes[voter_id] = candidate
    vote_counts[candidate] = vote_counts.get(candidate, 0) + 1

    return jsonify({'message': f'Vote for {candidate} submitted successfully.'})


@app.route('/results', methods=['GET'])
def results():
    return jsonify(vote_counts)


if __name__ == '__main__':
    app.run(debug=True)
  
