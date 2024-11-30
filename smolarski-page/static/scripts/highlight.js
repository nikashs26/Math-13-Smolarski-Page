document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const query = params.get('search');

    if (query) {
        console.log('Search query found:', query);

        const normalizedQuery = query.trim().toLowerCase();
        let keywordFound = false;

        const detailsElements = document.querySelectorAll('details');

        detailsElements.forEach(details => {
            let hasMatch = false;

            details.querySelectorAll('*').forEach(node => {
                if (node.nodeType !== Node.ELEMENT_NODE) return;

                const originalText = node.textContent || '';
                const normalizedText = originalText.toLowerCase();

                if (normalizedText.includes(normalizedQuery)) {
                    hasMatch = true;
                    keywordFound = true;

                    highlightTextInNode(node, query);
                }
            });

            if (hasMatch) {
                details.setAttribute('open', 'true');
            }
        });

        document.body.querySelectorAll('*:not(details *)').forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            const originalText = node.textContent || '';
            const normalizedText = originalText.toLowerCase();

            if (normalizedText.includes(normalizedQuery)) {
                keywordFound = true;

                highlightTextInNode(node, query);
            }
        });

        if (keywordFound) {
            const firstMark = document.querySelector('mark');
            if (firstMark) {
                firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            console.log('No matching content found.');
        }
    }
});

/**
 * Highlights matching text inside a node.
 * @param {HTMLElement} node 
 * @param {string} query 
 */
function highlightTextInNode(node, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    const childNodes = Array.from(node.childNodes);

    childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            const originalText = child.textContent;

            if (regex.test(originalText)) {
                const highlightedHTML = originalText.replace(regex, match => `<mark>${match}</mark>`);
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlightedHTML;
                child.replaceWith(...wrapper.childNodes);
            }
        }
    });
}
