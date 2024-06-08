const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('customer.xlsx');
const sheet_name = workbook.SheetNames[0]; // Assuming customers is in the first sheet

// Parse Excel customers into array
const worksheet = workbook.Sheets[sheet_name];
const range = XLSX.utils.decode_range(worksheet['!ref']);

const customers = []; // Define the customers array

for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
    const rowObject = {};
    for (let colNum = range.s.c; colNum <= 4; colNum++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
        const cell = worksheet[cellAddress];
        if (cell || cell !== undefined) {
            let nameColumn = '';
            if(colNum - range.s.c + 1 == 1) nameColumn = 'Mã đơn hàng';
            if(colNum - range.s.c + 1 == 2) nameColumn = 'Người thực hiện';
            if(colNum - range.s.c + 1 == 3) nameColumn = 'Mã khách hàng';
            if(colNum - range.s.c + 1 == 4) nameColumn = 'Tên khách hàng';
            if(colNum - range.s.c + 1 == 5) nameColumn = 'Số điện thoại';
            rowObject[nameColumn] = cell ? cell.v : undefined;
        }
    }
    customers.push(rowObject);
}

console.log(customers);

const jsonContent = JSON.stringify(customers);

fs.writeFile("./customer.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
