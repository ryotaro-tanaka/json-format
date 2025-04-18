document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const outputContainer = document.getElementById('output-container');
    const apiUrlInput = document.getElementById('api-url');
    const fetchDataButton = document.getElementById('fetch-button');

    if (outputContainer && apiUrlInput && fetchDataButton) {
        fetchDataButton.addEventListener('click', async () => {
            const apiUrl = apiUrlInput.value.trim();
            if (!apiUrl) {
                outputContainer.innerHTML = '<p>Please enter a valid API URL.</p>';
                return;
            }

            try {
                console.log(`Fetching data from ${apiUrl}...`);
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Data fetched successfully:', data);

                // Format JSON data and display it inside a <pre> tag
                const formattedJson = JSON.stringify(data, null, 4);
                outputContainer.innerHTML = `<pre>${formattedJson}</pre>`;
            } catch (error) {
                console.error('Error fetching or displaying data:', error);
                outputContainer.innerHTML = '<p>Failed to load data.</p>';
            }
        });
    } else {
        console.error('Required elements not found in the DOM.');
    }
});