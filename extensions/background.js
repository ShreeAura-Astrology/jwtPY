let extractedData = null; // Store data in memory
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractTable') {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            if (tabs.length === 0) {
                sendResponse({
                    success: false,
                    error: 'No active tab found.'
                });
                return;
            }
            chrome.scripting.executeScript({
                target: {
                    tabId: tabs[0].id
                },
                function : extractTableData,
        }, (injectionResults) => {
            if (injectionResults && injectionResults[0] && injectionResults[0].result) {
                extractedData = injectionResults[0].result;
                sendResponse({
                    success: true,
                    message: 'Data extracted and stored.',
                    data: extractedData
                });
            } else {
                sendResponse({
                    success: false,
                    error: 'Failed to extract data or no data found.'
                });
            }
        });
    });
    return true; // Indicates an async response
} else if (request.action === 'loadData') {
    if (!extractedData) {
        sendResponse({
            success: false,
            error: 'No data to load. Please extract first.'
        });
        return;
    }
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        if (tabs.length === 0) {
            sendResponse({
                success: false,
                error: 'No active tab found.'
            });
            return;
        }
        chrome.scripting.executeScript({
            target: {
                tabId: tabs[0].id
            },
            function : populateFormData,
            args: [extractedData]
    }, (injectionResults) => {
        if (injectionResults && injectionResults[0]) {
            sendResponse({
                success: true,
                message: 'Data loaded successfully.'
            });
        } else {
            sendResponse({
                success: false,
                error: 'Failed to populate form data.'
            });
        }
    });
});
return true; // Indicates an async response
}
});

function extractTableData() {
    const table = document.querySelector('div.overflow-auto table.table-container');
    if (!table) {
        return {
            error: "Could not find the table."
        };
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
    let nakshatras = [{
            "Nakshatra": "Ashwini",
            "NakshatraLord": "Ketu",
            "sequence": 1,
            "NakshatraAlias": "Ashwini"
        }, {
            "Nakshatra": "Bharani",
            "NakshatraLord": "Venus",
            "sequence": 2,
            "NakshatraAlias": "Bharni"
        }, {
            "Nakshatra": "Krittika",
            "NakshatraLord": "Sun",
            "sequence": 3,
            "NakshatraAlias": "Krittika"
        }, {
            "Nakshatra": "Rohini",
            "NakshatraLord": "Moon",
            "sequence": 4,
            "NakshatraAlias": "Rohini"
        }, {
            "Nakshatra": "Mrigashira",
            "NakshatraLord": "Mars",
            "sequence": 5,
            "NakshatraAlias": "Mrigashira"
        }, {
            "Nakshatra": "Ardra",
            "NakshatraLord": "Rahu",
            "sequence": 6,
            "NakshatraAlias": "Ardra"
        }, {
            "Nakshatra": "Punarvasu",
            "NakshatraLord": "Jupiter",
            "sequence": 7,
            "NakshatraAlias": "Punarvasu"
        }, {
            "Nakshatra": "Pushya",
            "NakshatraLord": "Saturn",
            "sequence": 8,
            "NakshatraAlias": "Pushya"
        }, {
            "Nakshatra": "Ashlesha",
            "NakshatraLord": "Mercury",
            "sequence": 9,
            "NakshatraAlias": "Ashlesha"
        }, {
            "Nakshatra": "Magha",
            "NakshatraLord": "Ketu",
            "sequence": 10,
            "NakshatraAlias": "Magha"
        }, {
            "Nakshatra": "Purva Phalguni",
            "NakshatraLord": "Venus",
            "sequence": 11,
            "NakshatraAlias": "Purva Phalguni"
        }, {
            "Nakshatra": "Uttara Phalguni",
            "NakshatraLord": "Sun",
            "sequence": 12,
            "NakshatraAlias": "Uttara Phalguni"
        }, {
            "Nakshatra": "Hasta",
            "NakshatraLord": "Moon",
            "sequence": 13,
            "NakshatraAlias": "Hasta"
        }, {
            "Nakshatra": "Chitra",
            "NakshatraLord": "Mars",
            "sequence": 14,
            "NakshatraAlias": "Chitra"
        }, {
            "Nakshatra": "Swati",
            "NakshatraLord": "Rahu",
            "sequence": 15,
            "NakshatraAlias": "Swati"
        }, {
            "Nakshatra": "Vishakha",
            "NakshatraLord": "Jupiter",
            "sequence": 16,
            "NakshatraAlias": "Vishakha"
        }, {
            "Nakshatra": "Anuradha",
            "NakshatraLord": "Saturn",
            "sequence": 17,
            "NakshatraAlias": "Anuradha"
        }, {
            "Nakshatra": "Jyeshtha",
            "NakshatraLord": "Mercury",
            "sequence": 18,
            "NakshatraAlias": "Jyeshtha"
        }, {
            "Nakshatra": "Mula",
            "NakshatraLord": "Ketu",
            "sequence": 19,
            "NakshatraAlias": "Mole"
        }, {
            "Nakshatra": "Purva Ashadha",
            "NakshatraLord": "Venus",
            "sequence": 20,
            "NakshatraAlias": "Purva Ashadha"
        }, {
            "Nakshatra": "Uttara Ashadha",
            "NakshatraLord": "Sun",
            "sequence": 21,
            "NakshatraAlias": "Uttara Ashadha"
        }, {
            "Nakshatra": "Shravana",
            "NakshatraLord": "Moon",
            "sequence": 22,
            "NakshatraAlias": "Shravana"
        }, {
            "Nakshatra": "Dhanishta",
            "NakshatraLord": "Mars",
            "sequence": 23,
            "NakshatraAlias": "Dhanishta"
        }, {
            "Nakshatra": "Shatabhisha",
            "NakshatraLord": "Rahu",
            "sequence": 24,
            "NakshatraAlias": "Shatabhisha"
        }, {
            "Nakshatra": "Purva Bhadrapada",
            "NakshatraLord": "Jupiter",
            "sequence": 25,
            "NakshatraAlias": "Purva Bhadrapada"
        }, {
            "Nakshatra": "Uttara Bhadrapada",
            "NakshatraLord": "Saturn",
            "sequence": 26,
            "NakshatraAlias": "Uttara Bhadrapada"
        }, {
            "Nakshatra": "Revati",
            "NakshatraLord": "Mercury",
            "sequence": 27,
            "NakshatraAlias": "Revati"
        }
    ];
    const inputForm = document.getElementById('inputForm');
    if (!inputForm) {
        return {
            success: false,
            error: "Input form not found."
        };
    }

    data.forEach(planetData => {
        const planetName = planetData['Planets'];
        if (!planetName)
            return;

        const planetInputDiv = inputForm.querySelector(`.planet-input label`);
        //if (planetInputDiv && planetInputDiv.textContent.trim() === planetName) {
        const parentDiv = planetInputDiv.closest('.planet-input');
        if (!parentDiv)
            return;

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
        // Populate Nakshatra (if present in the extracted data)
        const nakSelect = inputForm.querySelector(`#${planetName}-nakshatra`);
        if (nakSelect) {
            const nakText = planetData['Nakshatra'] || planetData['Nakshatra Name'] || planetData['Nakshatra/Star'];
            if (nakText) {
                // Try to find an option that matches the nakshatra text
                const normalizedNakText = nakText.toString().trim().toLowerCase();
                let nakOption = Array.from(nakSelect.options).find(opt => opt.textContent.trim().toLowerCase().includes(normalizedNakText) || opt.value === nakText);
                console.log(nakOption);
                // Fallback: if no option found, try to lookup a NakshatraAlias from the page's nakshatras array
                if (nakOption === undefined) {
                    const foundAliasEntry = nakshatras.find(n => {
                        const alias = (n.NakshatraAlias || n.Nakshatra || '').toString().trim().toLowerCase();
                        return alias === normalizedNakText;
                    });
                    console.log(foundAliasEntry);
                    if (foundAliasEntry) {
                        // try to find option by the canonical Nakshatra name
                        const canonical = (foundAliasEntry.Nakshatra || foundAliasEntry.NakshatraAlias).toString().trim();
                        nakOption = Array.from(nakSelect.options).find(opt => opt.value === canonical || opt.textContent.trim().toLowerCase() === canonical.toLowerCase());
                    }
                }

                if (nakOption) {
                    nakSelect.value = nakOption.value;
                    // If there is a corresponding lord input, try to populate it from data
                    const lordInput = inputForm.querySelector(`#${planetName}-nakshatra-lord`);
                    if (lordInput) {
                        // Prefer explicit NakshatraLord field if available
                        if (planetData['NakshatraLord'] || planetData['Nakshatra Lord']) {
                            lordInput.value = planetData['NakshatraLord'] || planetData['Nakshatra Lord'];
                        } else {
                            // Try to infer lord from the selected option's dataset or text (if page exposes a mapping)
                            // Fallback: leave it to page's onChange handler (if any) to fill in the lord.
                            // Trigger change event so page JS can update related fields
                            try {
                                const evt = new Event('change', {
                                    bubbles: true
                                });
                                nakSelect.dispatchEvent(evt);
                            } catch (e) {
                                // ignore
                            }
                        }
                    }
                    // Also populate Nakshatra Pad if present and select exists
                    const padSelect = inputForm.querySelector(`#${planetName}-nakshatra-pad`);
                    if (padSelect) {
                        const padVal = planetData['Nakshatra Pad'] || planetData['NakshatraPad'] || planetData['Pad'] || planetData['Pad No'] || planetData['Pad#'];
                        if (padVal != null && padVal !== undefined && padVal !== '') {
                            // normalize to number 1-4 or string matching option
                            const padStr = String(padVal).trim();
                            const opt = Array.from(padSelect.options).find(o => o.value === padStr || o.textContent.trim() === padStr || o.textContent.trim() === padStr + '');
                            if (opt)
                                padSelect.value = opt.value;
                        }
                    }
                }
            }
        }
        // }
    });
    return {
        success: true
    };
}
