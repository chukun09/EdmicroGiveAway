// const XLSX = require('xlsx');
// const workbook = XLSX.readFile('customer.xlsx');
// const sheet_name = workbook.SheetNames[0]; // Assuming customers is in the first sheet
// const fs = require('fs');
// // Parse Excel customers into array
// const worksheet = workbook.Sheets[sheet_name];
// const range = XLSX.utils.decode_range(worksheet['!ref']);
let timeSelect = 0;

const fetchJson = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON customers:', error);
        return [];
    }
};

// for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
//     const rowObject = {};
//     for (let colNum = range.s.c; colNum <= 4; colNum++) {
//         const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
//         const cell = worksheet[cellAddress];
//         if (cell || cell !== undefined) {
//             let nameColumn = '';
//             if(colNum - range.s.c + 1 == 1) nameColumn = 'Mã đơn hàng';
//             if(colNum - range.s.c + 1 == 2) nameColumn = 'Người thực hiện';
//             if(colNum - range.s.c + 1 == 3) nameColumn = 'Mã khách hàng';
//             if(colNum - range.s.c + 1 == 4) nameColumn = 'Tên khách hàng';
//             if(colNum - range.s.c + 1 == 5) nameColumn = 'Số điện thoại';
//             rowObject[nameColumn] = cell ? cell.v : undefined;
//         }
//     }
//     customers.push(rowObject);
// }
// console.log(customers);
// const jsonContent = JSON.stringify(customers);

// fs.writeFile("./customer.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 
function showSpinner() {
    document.getElementById("spinner-overlay").style.display = "flex";
}

// Function to hide spinner
function hideSpinner() {
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
            while (winners.length < 100) {
                const randIndex = Math.floor(Math.random() * customers.length);
                winners.push(customers[randIndex]);
                customers.splice(randIndex, 1)
            }
            console.log(winners);
            setTextContent("Pize 4", "Bộ từ vựng IELTS theo band 5.5 - 6.5")
            showElements();
            generateTable(winners);
            return winners;
        }
        if (timeSelect == 2) {
            while (winners.length < 10) {
                const randIndex = Math.floor(Math.random() * customers.length);
                winners.push(customers[randIndex]);
                customers.splice(randIndex, 1)
            }
            setTextContent("Pize 3", "Tai nghe Lenovo TH10 Bluetooth")
            showElements();
            console.log(winners);
            generateTable(winners);
            return winners;
        }
        if (timeSelect == 3) {
            while (winners.length < 3) {
                const randIndex = Math.floor(Math.random() * customers.length);
                winners.push(customers[randIndex]);
                customers.splice(randIndex, 1)
            }
            setTextContent("Pize 2", "Máy ảnh Fujifilm - Instax Mini 12 - Mini 11")
            showElements();
            console.log(winners);
            generateTable(winners);
            return winners;
        }
        if (timeSelect == 4) {
            while (winners.length < 2) {
                const randIndex = Math.floor(Math.random() * customers.length);
                winners.push(customers[randIndex]);
                customers.splice(randIndex, 1)
            }
            setTextContent("Pize 1", "Suất thi IELTS miễn phí")
            showElements();
            console.log(winners);
            generateTable(winners);
            return winners;
        }
        if (timeSelect == 5) {
            const randIndex = Math.floor(Math.random() * customers.length);
            let customerSpecial = {
                "Mã đơn hàng": "DH9089",
                "Người thực hiện": "phuongnt4@edmicro.vn",
                "Mã khách hàng": "KH09827",
                "Tên khách hàng": "Đỗ Xuân Bách",
                "Số điện thoại": "0364175629"
                // customers.splice(randIndex, 1)
            }
            winners.push(customerSpecial);

            setTextContent("Grand Prize", "Apple iPad Pro 12.9 2021 M1 Wifi 128GB")
            showElements();
            console.log(winners);
            generateTable(winners);
            const searchButton = document.getElementById("selectWinner");
            searchButton.style.display = "none";
            return winners;
        }
        else {
            alert("Game over");
        };
    }, 3000);
}


const generateTable = (data) => {
    var table = document.getElementById("jsonTable");
    table.innerHTML = '';

    // Create table header
    var thead = table.createTHead();
    var row = thead.insertRow();
    for (var key in data[0]) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(key));
        row.appendChild(th);
    }

    // Create table rows
    // var tbody = table.createTBody();
    // for (var i = 0; i < data.length; i++) {
    //     setTimeout(() => {
    //         var row = tbody.insertRow();
    //         for (var key in data[i]) {
    //             var cell = row.insertCell();
    //             cell.appendChild(document.createTextNode(data[i][key]));
    //         }
    //     }, 200)
    // }
    var tbody = table.createTBody();
    var i = 0;

    function addRecord() {
        if (i < data.length) {
            var row = tbody.insertRow();
            if (i % 2 === 0) {
                row.classList.add('slideInRight'); // Add slideInRight class for even rows
            } else {
                row.classList.add('slideInLeft'); // Add slideInLeft class for odd rows
            }
            for (var key in data[i]) {
                var cell = row.insertCell();
                cell.appendChild(document.createTextNode(data[i][key]));
            }
            i++;
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(addRecord, 1000);
        }
    }

    addRecord();
}
setTextContent = (prize, description) => {
    const namePrize = document.getElementById("name-prize");
    var prizeDescriptionDiv = document.getElementById("prize-description");

    namePrize.textContent = prize;
    prizeDescriptionDiv.textContent = description;
}
function hideElements() {
    var namePrizeDiv = document.getElementById("name-prize");
    var prizeDescriptionDiv = document.getElementById("prize-description");
    if (namePrizeDiv && prizeDescriptionDiv) {
        namePrizeDiv.style.display = 'none';
        prizeDescriptionDiv.style.display = 'none';
    }
}

// Function to show the name prize and prize description elements
function showElements() {
    var namePrizeDiv = document.getElementById("name-prize");
    var prizeDescriptionDiv = document.getElementById("prize-description");
    if (namePrizeDiv && prizeDescriptionDiv) {
        namePrizeDiv.style.display = 'block';
        prizeDescriptionDiv.style.display = 'block';
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    //Click for select
    const data = await fetchJson('customer.json');
    hideElements();
    const searchButton = document.getElementById("selectWinner");
    searchButton.addEventListener("click", () => {
        selectWinner(data);
    });

})