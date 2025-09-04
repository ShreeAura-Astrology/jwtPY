document.addEventListener('DOMContentLoaded', () => {
    const extractButton = document.getElementById('extractButton');
    const loadButton = document.getElementById('loadButton');
    const resultDiv = document.getElementById('result');
    const jsonDataDiv = document.getElementById('jsonData');

    extractButton.addEventListener('click', () => {
        // Send a message to the background script to start extraction
        chrome.runtime.sendMessage({ action: 'extractTable' }, (response) => {
            if (response.success) {
                resultDiv.textContent = 'Data extracted and stored. Navigate to a new page and click "Load Data" to populate.';
                jsonDataDiv.textContent = JSON.stringify(response.data, null, 2);
            } else {
                resultDiv.textContent = 'Error: ' + response.error;
                jsonDataDiv.textContent = '';
            }
        });
    });

    loadButton.addEventListener('click', () => {
        // Send a message to the background script to load the data.
        // The data is now managed by the background script.
        chrome.runtime.sendMessage({ action: 'loadData' }, (response) => {
            if (response.success) {
                resultDiv.textContent = response.message;
            } else {
                resultDiv.textContent = 'Error: ' + response.error;
            }
        });
    });
});
