async function performSearch(event) {
    event.preventDefault();

    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const response = await fetch('site-data.json');
    const pages = await response.json();

    const results = [];

    for (const page of pages) {
        const pageResponse = await fetch(page.url); 
        const pageHTML = await pageResponse.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(pageHTML, 'text/html');

        const bodyText = doc.body.innerText.toLowerCase();
        const index = bodyText.indexOf(query);

        if (index !== -1) {
            const snippet = bodyText.substring(Math.max(0, index - 30), index + 70);

            results.push({
                url: `${page.url}#search=${encodeURIComponent(query)}`,
                title: page.title,
                snippet: snippet.replace(query, `<mark>${query}</mark>`) 
            });
        }
    }

    localStorage.setItem('searchResults', JSON.stringify(results));
    window.location.href = 'search-results.html';
}


