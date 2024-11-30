document.addEventListener('DOMContentLoaded', () => {
    const results = JSON.parse(localStorage.getItem('searchResults')) || [];
    const resultsContainer = document.getElementById('results');

    if (results.length > 0) {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `
                <h2><a href="${result.url}">${result.title}</a></h2>
                <p>${result.snippet}...</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
});
