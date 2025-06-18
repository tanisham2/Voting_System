mport hashlib
import json
import os
from time import time

class Block:
    def __init__(self, index, transactions, previous_hash, timestamp=None, hash=None):
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp or time()
        self.previous_hash = previous_hash
        self.hash = hash or self.calculate_hash()

    def calculate_hash(self):
        block_data = json.dumps({
            'index': self.index,
            'transactions': self.transactions,
            'timestamp': self.timestamp,
            'previous_hash': self.previous_hash
        }, sort_keys=True).encode()
        return hashlib.sha256(block_data).hexdigest()

    def to_dict(self):
        return {
            'index': self.index,
            'transactions': self.transactions,
            'timestamp': self.timestamp,
            'previous_hash': self.previous_hash,
            'hash': self.hash
        }

    @staticmethod
    def from_dict(data):
        return Block(
            data['index'],
            data['transactions'],
            data['previous_hash'],
            data['timestamp'],
            data['hash']
        )

class Blockchain:
    def __init__(self, chain_file='chain.json', voters_file='voters.json'):
        self.transactions = []
        self.chain_file = chain_file
        self.voters_file = voters_file

        self.chain = self.load_chain()
        self.registered_voters = self.load_voters()
        self.voted_voters = set()

    def load_chain(self):
        if os.path.exists(self.chain_file):
            with open(self.chain_file, 'r') as f:
                return [Block.from_dict(b) for b in json.load(f)]
        else:
            genesis_block = Block(0, [], "0")
            self.save_chain([genesis_block])
            return [genesis_block]

    def save_chain(self, chain):
        with open(self.chain_file, 'w') as f:
            json.dump([block.to_dict() for block in chain], f, indent=2)

    def load_voters(self):
        if os.path.exists(self.voters_file):
            with open(self.voters_file, 'r') as f:
                return set(json.load(f))
        else:
            return set()

    def save_voters(self):
        with open(self.voters_file, 'w') as f:
            json.dump(list(self.registered_voters), f, indent=2)

    def add_transaction(self, transaction):
        if transaction['type'] == 'register':
            voter_id = transaction['voter_id']
            if voter_id in self.registered_voters:
                return False, 'Voter already registered.'
            self.registered_voters.add(voter_id)
            self.transactions.append(transaction)
            self.save_voters()
            return True, 'Voter registered.'

        elif transaction['type'] == 'vote':
            voter_id = transaction['voter_id']
            if voter_id not in self.registered_voters:
                return False, 'Voter not registered.'
            if voter_id in self.voted_voters:
                return False, 'Voter has already voted.'
            self.voted_voters.add(voter_id)
            self.transactions.append(transaction)
            return True, 'Vote added.'

        return False, 'Invalid transaction type.'

    def mine_block(self):
        if not self.transactions:
            return None
        previous_block = self.chain[-1]
        new_block = Block(len(self.chain), self.transactions, previous_block.hash)
        self.chain.append(new_block)
        self.save_chain(self.chain)
        self.transactions = []
        return new_block

    def get_chain(self):
        return [block.to_dict() for block in self.chain]
