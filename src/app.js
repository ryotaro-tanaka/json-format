document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const jobListings = document.getElementById('job-listings');
    const apiUrlInput = document.getElementById('api-url');
    const fetchJobsButton = document.getElementById('fetch-button');

    if (jobListings && apiUrlInput && fetchJobsButton) {
        fetchJobsButton.addEventListener('click', async () => {
            const apiUrl = apiUrlInput.value.trim();
            if (!apiUrl) {
                jobListings.innerHTML = '<p>Please enter a valid API URL.</p>';
                return;
            }

            try {
                console.log(`Fetching job data from ${apiUrl}...`);
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jobs = await response.json();
                console.log('Job data fetched successfully:', jobs);

                // JSONデータを整形して<pre>タグ内に表示
                const formattedJson = JSON.stringify(jobs, null, 4);
                jobListings.innerHTML = `<pre>${formattedJson}</pre>`;
            } catch (error) {
                console.error('Error fetching or displaying job data:', error);
                jobListings.innerHTML = '<p>Failed to load job listings.</p>';
            }
        });
    } else {
        console.error('Required elements not found in the DOM.');
    }
});