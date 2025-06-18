from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

votes = {}
vote_counts = {}
voting_open = True

VOTER_FILE = 'voters.json'

def load_voters():
    with open(VOTER_FILE) as f:
        data = json.load(f)
        return {v['voter_id']: v for v in data['voters']}

def save_voters(voters_dict):
    with open(VOTER_FILE, 'w') as f:
        json.dump({'voters': list(voters_dict.values())}, f, indent=2)

@app.route('/vote', methods=['POST'])
def vote():
    global voting_open
    if not voting_open:
        return jsonify({'message': 'Voting has ended.'}), 403

    data = request.get_json()
    voter_id = data.get('voter_id')
    candidate = data.get('candidate')

    voters = load_voters()

    if voter_id not in voters:
        return jsonify({'message': 'Invalid Voter ID.'}), 400
    if voters[voter_id]['has_voted']:
        return jsonify({'message': 'You have already voted.'}), 400

    votes[voter_id] = candidate
    vote_counts[candidate] = vote_counts.get(candidate, 0) + 1

    voters[voter_id]['has_voted'] = True
    save_voters(voters)

    return jsonify({'message': 'Vote recorded successfully.'})

@app.route('/results', methods=['GET'])
def results():
    global voting_open
    if voting_open:
        return jsonify({'message': 'Voting is still in progress. Results not available.'}), 403
    return jsonify(vote_counts)

@app.route('/voting_status', methods=['GET'])
def get_voting_status():
    return jsonify({'voting_open': voting_open})

@app.route('/end_voting', methods=['POST'])
def end_voting():
    global voting_open
    voting_open = False
    return jsonify({'message': 'Voting has ended.'})

if __name__ == '__main__':
    app.run(debug=True)
