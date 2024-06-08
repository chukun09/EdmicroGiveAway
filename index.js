let timeSelect = 0;
let allWinners = [];

const fetchJson = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON customers:', error);
        return [];
    }
};

const showSpinner = () => {
    document.getElementById("spinner-overlay").style.display = "flex";
}

const hideSpinner = () => {
    document.getElementById("spinner-overlay").style.display = "none";
}

const selectWinner = (customers) => {
    showSpinner();
    setTimeout(() => {
        hideSpinner();
        timeSelect++;
        console.log(timeSelect);
        let winners = [];
        hideElements();
        if (timeSelect == 1) {
            allWinners = [];
            while (winners.length < 20) {
                const randIndex = Math.floor(Math.random() * customers.length);
                winners.push(customers[randIndex]);
                customers.splice(randIndex, 1)
            }
            console.log(winners);
            setTextContent("Pize 4", "Bộ từ vựng IELTS theo band 5.5 - 6.5")
            showElements();
            generateTable(winners);
            allWinners.push(winners);
            return winners;
        }
        if (timeSelect == 2) {
            while (winners.length < 2) {
                const randIndex = Math.floor(Math.random() * customers.length);
                winners.push(customers[randIndex]);
                customers.splice(randIndex, 1)
            }
            setTextContent("Pize 3", "Vali Du Lịch Bamozo 8812 Thời Trang Size 20")
            showElements();
            console.log(winners);
            generateTable(winners);
            allWinners.push(winners);
            return winners;
        }
        if (timeSelect == 3) {
            while (winners.length < 1) {
                const randIndex = Math.floor(Math.random() * customers.length);
                winners.push(customers[randIndex]);
                customers.splice(randIndex, 1)
            }
            setTextContent("Pize 2", "Máy ảnh Fujifilm - Instax Mini 12")
            showElements();
            console.log(winners);
            generateTable(winners);
            allWinners.push(winners);
            return winners;
        }
        if (timeSelect == 4) {
            while (winners.length < 1) {
                const randIndex = Math.floor(Math.random() * customers.length);
                winners.push(customers[randIndex]);
                customers.splice(randIndex, 1)
            }
            setTextContent("Pize 1", "IPad Gen 9 2021 10.2 inch WiFi 64GB")
            showElements();
            console.log(winners);
            generateTable(winners);
            allWinners.push(winners);
            return winners;
        }
        else {
            // Usage
            exportToExcel(allWinners, 'Winners.xlsx')
                .then(() => {
                    console.log('Excel file generated and downloaded successfully.');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };
    }, 2000);
}

const generateTable = (data) => {
    var table = document.getElementById("jsonTable");
    table.innerHTML = '';
    var thead = table.createTHead();
    var row = thead.insertRow();
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("STT"));
    row.appendChild(th);
    for (var key in data[0]) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(key));
        row.appendChild(th);
    }
    var tbody = table.createTBody();
    var i = 0;
    const addRecord = () => {
        if (i < data.length) {
            const customerCode = data[i]["Mã khách hàng"]; // Get the value associated with the key "Mã khách hàng"
            // Extract numeric part using regular expression
            const numericPart = customerCode.match(/\d+/);

            // Check if numericPart is found and get the first match
            const extractedNumber = numericPart ? numericPart[0] : "";
            console.log(extractedNumber.toString());
            setTimeout(() => {
                startRandomAnimation(extractedNumber);
            }, 800);
            setTimeout(() => {
                var row = tbody.insertRow();
                if (i % 2 === 0) {
                    row.classList.add('slideInRight');
                } else {
                    row.classList.add('slideInLeft');
                }
                var cell = row.insertCell();
                cell.appendChild(document.createTextNode(i + 1));

                for (var key in data[i]) {
                    if (key === "Số điện thoại") {
                        var phoneNumber = '0' + String(data[i]["Số điện thoại"]).replace(/\d{3}(?=\d{3}$)/, '***');
                        var cell = row.insertCell();
                        cell.appendChild(document.createTextNode(phoneNumber));
                    }
                    else {
                        var cell = row.insertCell();
                        cell.appendChild(document.createTextNode(data[i][key]));
                    }
                }
                i++;
                // window.scrollTo(0, document.body.scrollHeight); 
                addRecord();

            }, 1500)

            // setTimeout(addRecord, 1000);
        }
    }

    addRecord();
}

const setTextContent = (prize, description) => {
    const namePrize = document.getElementById("name-prize");
    var prizeDescriptionDiv = document.getElementById("prize-description");

    namePrize.textContent = prize;
    prizeDescriptionDiv.textContent = description;
}

const hideElements = () => {
    var namePrizeDiv = document.getElementById("name-prize");
    var prizeDescriptionDiv = document.getElementById("prize-description");
    if (namePrizeDiv && prizeDescriptionDiv) {
        namePrizeDiv.style.display = 'none';
        prizeDescriptionDiv.style.display = 'none';
    }
}

const showElements = () => {
    var namePrizeDiv = document.getElementById("name-prize");
    var prizeDescriptionDiv = document.getElementById("prize-description");
    if (namePrizeDiv && prizeDescriptionDiv) {
        namePrizeDiv.style.display = 'block';
        prizeDescriptionDiv.style.display = 'block';
    }
}
const numberValueElements = document.querySelectorAll('.number-value');

function stopAnimation() {
    numberValueElements.forEach(element => {
        element.style.animation = 'none';
    });
}

function setFinalValue(element, value) {
    element.style.setProperty('--num', value);
}

function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function startRandomAnimation(value) {
    const interval = setInterval(() => {
        numberValueElements.forEach(element => {
            let value = randomValue(1, 9);
            setFinalValue(element, value);
        });
    }, 200); // Adjust the interval speed here

    setTimeout(() => {
        clearInterval(interval);
        stopAnimation();
        numberValueElements.forEach((element, index) => {
            setFinalValue(element, parseInt(value[index], 10));
        });
    }, 1000); // 2 seconds, adjust as needed
}

//Export excel

// Function to export data to Excel
function exportToExcel(data, fileName) {
    return new Promise((resolve, reject) => {
        // Convert data to worksheet
        // const ws = XLSX.utils.json_to_sheet(data);

        // // Create a workbook
        // const wb = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(wb, ws, "Winners");
        const wb = XLSX.utils.book_new();

        // Loop through each row of data
        data.forEach((rowData, index) => {
            // Convert row data to worksheet
            const ws = XLSX.utils.json_to_sheet(rowData);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, `Prize ${4 - index}`);
        });
        // Generate Excel file as a Blob
        const wbBlob = new Blob([s2ab(XLSX.write(wb, { type: 'binary' }))], { type: 'application/octet-stream' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(wbBlob);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Cleanup
        document.body.removeChild(link);

        resolve();
    });
}

// Convert string to ArrayBuffer
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}
// Example usage:
document.addEventListener("DOMContentLoaded", async () => {
    stopAnimation();
    // startRandomAnimation('');
    const data = await fetchJson('customer.json');
    hideElements();
    const searchButton = document.getElementById("selectWinner");
    searchButton.addEventListener("click", () => {
        selectWinner(data);
        stopAnimation();
    });


})

