document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const outputContainer = document.getElementById('output-container');
    const fetchButton = document.getElementById('fetch-button');
    const apiUrlInput = document.getElementById('api-url');

    // Set focus to the apiUrlInput element on page load
    apiUrlInput.focus();

    // Add event listener to fetch-button to reload the page with the apiUrl query parameter
    fetchButton.addEventListener('click', () => {
        const apiUrl = apiUrlInput.value.trim();
        if (apiUrl) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('apiUrl', apiUrl);
            window.location.href = currentUrl.toString();
        } else {
            alert('Please enter a valid API URL.');
        }
    });

    // Add event listener to trigger fetchButton click on Enter key press
    apiUrlInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            fetchButton.click();
        }
    });

    // Extract the apiUrl query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const apiUrl = urlParams.get('apiUrl');

    // Set the input field value to the apiUrl query parameter
    if (apiUrl) {
        apiUrlInput.value = apiUrl;
        console.log(`Fetching data from ${apiUrl}...`);
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data fetched successfully:', data);

                // Escape HTML tags in JSON data
                const escapeHtml = (str) => {
                    return str.replace(/[&<>"']/g, (char) => {
                        const escapeChars = {
                            '&': '&amp;',
                            '<': '&lt;',
                            '>': '&gt;',
                            '"': '&quot;',
                            "'": '&#39;'
                        };
                        return escapeChars[char];
                    });
                };

                // Format JSON data and escape HTML tags
                const formattedJson = JSON.stringify(data, null, 4)
                    .replace(/[&<>"']/g, (char) => escapeHtml(char));

                outputContainer.innerHTML = `<pre>${formattedJson}</pre>`;
            })
            .catch(error => {
                console.error('Error fetching or displaying data:', error);
                outputContainer.innerHTML = '<p>Failed to load data.</p>';
            });
    } else {
        outputContainer.innerHTML = '<p>No API URL provided. Please use the input field to fetch data.</p>';
    }
});