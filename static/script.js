window.onload = function () {
  const form = document.getElementById('vote-form');
  const resultsSection = document.getElementById('results');
  const resultsList = document.getElementById('results-list');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const voterId = document.getElementById('voter-id').value;
    const candidate = document.getElementById('candidate').value;

    fetch('http://127.0.0.1:5000/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voter_id: voterId, candidate: candidate })
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        messageDiv.innerText = data.message;
      })
      .catch(error => {
        alert(`Failed to submit vote: ${error.message}`);
        messageDiv.innerText = error.message;
      });
  });

  // Load voting status and results
  fetch('http://127.0.0.1:5000/voting_status')
    .then(response => response.json())
    .then(data => {
      if (!data.voting_open) {
        fetch('http://127.0.0.1:5000/results')
          .then(response => response.json())
          .then(results => {
            resultsList.innerHTML = '';
            for (const candidate in results) {
              resultsList.innerHTML += `<li>${candidate}: ${results[candidate]}</li>`;
            }
            resultsSection.style.display = 'block';
          });
      } else {
        resultsSection.style.display = 'none';
      }
    });
};
document.getElementById('endVotingBtn').addEventListener('click', function () {
  fetch('http://127.0.0.1:5000/end_voting', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    location.reload(); // Reload to fetch results
  })
  .catch(error => {
    console.error('Error ending voting:', error);
  });
});
