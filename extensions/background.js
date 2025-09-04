let extractedData = null; // Store data in memory

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractTable') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        sendResponse({ success: false, error: 'No active tab found.' });
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractTableData,
      }, (injectionResults) => {
        if (injectionResults && injectionResults[0] && injectionResults[0].result) {
          extractedData = injectionResults[0].result;
          sendResponse({ success: true, message: 'Data extracted and stored.', data: extractedData });
        } else {
          sendResponse({ success: false, error: 'Failed to extract data or no data found.' });
        }
      });
    });
    return true; // Indicates an async response
  } else if (request.action === 'loadData') {
    if (!extractedData) {
      sendResponse({ success: false, error: 'No data to load. Please extract first.' });
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        sendResponse({ success: false, error: 'No active tab found.' });
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: populateFormData,
        args: [extractedData]
      }, (injectionResults) => {
        if (injectionResults && injectionResults[0]) {
          sendResponse({ success: true, message: 'Data loaded successfully.' });
        } else {
          sendResponse({ success: false, error: 'Failed to populate form data.' });
        }
      });
    });
    return true; // Indicates an async response
  }
});

function extractTableData() {
  const table = document.querySelector('div.overflow-auto table.table-container');
  if (!table) {
    return { error: "Could not find the table." };
  }

  const headerCells = Array.from(table.querySelectorAll('tr:first-child td b'));
  const headers = headerCells.map(cell => cell.textContent.trim());

  const dataRows = Array.from(table.querySelectorAll('tr:not(:first-child)'));
  const extractedData = dataRows.map(row => {
    const rowData = {};
    const cells = Array.from(row.querySelectorAll('td font font'));
    cells.forEach((cell, index) => {
      if (headers[index]) {
        rowData[headers[index]] = cell.textContent.trim();
      }
    });
    return rowData;
  });

  return extractedData;
}

function populateFormData(data) {
	console.log(data);

  const inputForm = document.getElementById('inputForm');
  if (!inputForm) {
    return { success: false, error: "Input form not found." };
  }

  data.forEach(planetData => {
    const planetName = planetData['Planets'];
    if (!planetName) return;

    const planetInputDiv = inputForm.querySelector(`.planet-input label`);
    //if (planetInputDiv && planetInputDiv.textContent.trim() === planetName) {
      const parentDiv = planetInputDiv.closest('.planet-input');
      if (!parentDiv) return;

      // Populate Sign
      const signSelect = inputForm.querySelector(`#${planetName}-sign`);
      if (signSelect) {
        const signText = planetData['Sign'];
        const signOption = Array.from(signSelect.options).find(option => option.textContent.includes(signText));
        if (signOption) {
          signSelect.value = signOption.value;
        }
      }

      // Populate House
      const houseSelect = inputForm.querySelector(`#${planetName}-house`);
      if (houseSelect) {
        const houseValue = planetData['House'];
        houseSelect.value = houseValue;
      }

      // Populate Degree
      const degInput = inputForm.querySelector(`#${planetName}-deg`);
      if (degInput) {
        degInput.value = parseFloat(planetData['Degree']);
      }

      // Populate Retrograde
      const retroCheckbox = inputForm.querySelector(`#${planetName}-retrograde`);
      if (retroCheckbox) {
        retroCheckbox.checked = (planetData['Retro/Direct'] === 'Retro');
      }
   // }
  });
  return { success: true };
}