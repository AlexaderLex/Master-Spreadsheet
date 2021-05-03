"use strict";

let startMark = "\r";
let endOfString = "\r\n";
const tables = document.querySelectorAll(".table");

tables.forEach(table => {
    // getString(table);
    let str = getString(table);
    const objName = table.id;
    // getFile(str, objName);
    let saveBtn = table.parentElement.querySelector(".save");
    saveBtn.addEventListener("click", function getFile() {
        // Convert the text to BLOB.
        const textToBLOB = new Blob([str], { type: 'text/plain' });
        const sFileName = `${objName}.csv`; // The file to save the data.

        let newLink = document.createElement("a");
        newLink.download = sFileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        } else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click();
    });

});

function getString(t) {
    let rows = t.querySelectorAll(".row");
    let totalString = "";
    for (let r = 0; r < rows.length; r++) {
        let cells = rows[r].querySelectorAll(".t-cell");

        for (let c = 0; c < cells.length; c++) {
            let cell = cells[c];
            if (cell.textContent === "") {
                totalString = totalString + ",";
            } else if (cell.textContent.includes(",")) {
                let newStr = cell.textContent;
                let reg = new RegExp("([,])", "g");

                let res = newStr.replace(reg, "\t");
                // let res = newStr.replace(/[^a-zA-Z0-9 \.']/g, "\t");
                // console.log(res);
                let newNewStr = res;
                totalString = totalString + newNewStr + ",";
                // console.log(totalString);

            } else {
                totalString = totalString + cell.textContent + ",";
            }
        }
        totalString = totalString + endOfString;
    }
    return totalString;
};

/*
function getFile(string, name) {

    // Convert the text to BLOB.
    const textToBLOB = new Blob([string], { type: 'text/plain' });
    const sFileName = `${name}.csv`; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}
*/

/*
let someStr = "Hello, again, my friend, you've been gone for a while";

let reg = new RegExp(",", "g");

let res = someStr.replace(reg, '","');
console.log(res);

*/
//*********** */

let str_111 = ",";

let st = str_111.charCodeAt(0);
// console.log(st);
let st1 = str_111.codePointAt(0);
// console.log(st1);

let letter = "\x27\x27";
// console.log(letter);